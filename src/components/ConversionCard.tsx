import { useState, useCallback, useRef, useEffect } from "react";
import { Users } from "lucide-react";
import Toast from "./Toast";
import SuccessModal from "./SuccessModal";
import { sendSmsCode, claimMembership, config } from "@/lib/api";
import { initCaptcha } from "@/hooks/use-captcha";

const PHONE_REGEX = /^1[3-9]\d{9}$/;

const ConversionCard = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" as "error" | "info" });
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phoneRef = useRef(phone);
  phoneRef.current = phone;

  const showToast = useCallback((message: string, type: "error" | "info" = "error") => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // 初始化阿里云验证码2.0（弹出式），绑定到"获取验证码"按钮
  useEffect(() => {
    const init = async () => {
      try {
        await initCaptcha(
          "captcha-element",
          "send-code-btn",
          async (captchaVerifyParam: string) => {
            // 验证码弹窗验证通过后，自动触发此回调
            const currentPhone = phoneRef.current;
            if (!PHONE_REGEX.test(currentPhone)) {
              showToast("请输入正确的手机号");
              return { captchaResult: false, bizResult: false };
            }

            // 发送短信
            const result = await sendSmsCode(currentPhone, captchaVerifyParam);

            if (result.success) {
              // 启动倒计时
              setCountdown(60);
              countdownRef.current = setInterval(() => {
                setCountdown((prev) => {
                  if (prev <= 1) {
                    if (countdownRef.current) clearInterval(countdownRef.current);
                    return 0;
                  }
                  return prev - 1;
                });
              }, 1000);
              return { captchaResult: true, bizResult: true };
            } else {
              showToast(result.message);
              return { captchaResult: true, bizResult: false };
            }
          },
          (_bizResult: boolean) => {
            // 业务结果回调（已在 captchaVerifyCallback 中处理）
          }
        );
      } catch (err) {
        console.error("验证码初始化失败:", err);
      }
    };

    // 延迟初始化，确保 DOM 就绪
    const timer = setTimeout(init, 500);
    return () => clearTimeout(timer);
  }, [showToast]);

  // 领取会员
  const handleClaim = useCallback(async () => {
    if (!PHONE_REGEX.test(phone)) {
      showToast("请输入正确的手机号");
      return;
    }
    if (!code || code.length < 4) {
      showToast("请输入验证码");
      return;
    }
    if (loading) return;

    setLoading(true);
    const result = await claimMembership(phone, code);
    setLoading(false);

    if (result.success) {
      setShowSuccess(true);
    } else {
      showToast(result.message);
    }
  }, [phone, code, loading, showToast]);

  return (
    <>
      <section className="bg-card mx-5 sm:mx-6 mt-1 mb-4 p-5 sm:p-6 rounded-3xl shadow-card relative z-20 border border-card/70">
        {/* Phone input */}
        <div className="bg-rita-input-bg h-[52px] rounded-xl flex items-center px-4 mb-2.5 border border-border transition-all focus-within:border-primary focus-within:bg-card focus-within:shadow-[0_0_0_4px_hsla(217,91%,60%,0.08)]">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="请输入手机号"
            maxLength={11}
            className="flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Code input */}
        <div className="bg-rita-input-bg h-[52px] rounded-xl flex items-center px-4 mb-2.5 border border-border transition-all focus-within:border-primary focus-within:bg-card focus-within:shadow-[0_0_0_4px_hsla(217,91%,60%,0.08)]">
          <input
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="输入验证码"
            maxLength={6}
            disabled={!PHONE_REGEX.test(phone)}
            className="flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            id="send-code-btn"
            disabled={countdown > 0 || !PHONE_REGEX.test(phone)}
            className="text-sm font-bold text-primary pl-3 sm:pl-4 border-l-[1.5px] border-border whitespace-nowrap disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {countdown > 0 ? `${countdown}s` : "获取"}
          </button>
        </div>

        {/* 验证码渲染容器（弹出式不可见） */}
        <div id="captcha-element" />

        {/* CTA Button */}
        <button
          onClick={handleClaim}
          disabled={loading}
          className="w-full h-16 rounded-2xl font-extrabold border-none cursor-pointer shadow-btn mt-1 flex flex-col items-center justify-center transition-all active:scale-[0.98] disabled:opacity-80 disabled:pointer-events-none text-primary-foreground relative overflow-hidden animate-[breath_2.5s_ease-in-out_infinite]"
          style={{ background: "var(--gradient-orange)" }}
        >
          <span className="text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            {loading ? "正在激活特权..." : "立即领取零售大会专属权益"}
          </span>
          <span className="text-xs opacity-95 font-bold mt-0.5">
            {loading ? "礼包发放中" : "价值 500 元礼包"}
          </span>
        </button>

        {/* Share hint */}
        <p className="mt-3 text-center text-xs text-rita-slate-faint leading-relaxed">
          支持分享给合作伙伴或同事，让更多人同步体验企业级 AI 能力
        </p>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 mt-3.5 text-xs text-rita-slate-faint">
          <Users className="w-4 h-4" />
          <span>
            已有 <strong className="text-rita-slate-body font-bold">12,500+</strong> 位零售与跨境老板领取权益
          </span>
        </div>
      </section>

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} type={toast.type} />
      <SuccessModal visible={showSuccess} redirectUrl={config.redirectUrl} autoRedirectSeconds={5} />
    </>
  );
};

export default ConversionCard;
