import { useState, useCallback, useRef } from "react";
import { Users } from "lucide-react";
import Toast from "./Toast";
import SuccessModal from "./SuccessModal";
import { sendSmsCode, claimMembership, config } from "@/lib/api";

const PHONE_REGEX = /^1[3-9]\d{9}$/;

const ConversionCard = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" as "error" | "info" });
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showToast = useCallback((message: string, type: "error" | "info" = "error") => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // 发送验证码
  const handleSendCode = useCallback(async () => {
    if (!PHONE_REGEX.test(phone)) {
      showToast("请输入正确的手机号");
      return;
    }
    if (countdown > 0) return;

    // 乐观启动倒计时（防重复点击）
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

    const result = await sendSmsCode(phone);
    if (!result.success) {
      // 发送失败，重置倒计时
      if (countdownRef.current) clearInterval(countdownRef.current);
      setCountdown(0);
      showToast(result.message);
    }
  }, [phone, countdown, showToast]);

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
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-foreground placeholder:text-muted-foreground"
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
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSendCode}
            disabled={countdown > 0}
            className="text-xs sm:text-sm font-bold text-primary pl-3 sm:pl-4 border-l-[1.5px] border-border whitespace-nowrap disabled:text-muted-foreground transition-colors shrink-0"
          >
            {countdown > 0 ? `${countdown}s` : "获取验证码"}
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClaim}
          disabled={loading}
          className="w-full h-16 rounded-2xl font-extrabold border-none cursor-pointer shadow-btn mt-1 flex flex-col items-center justify-center transition-all active:scale-[0.98] disabled:opacity-80 disabled:pointer-events-none text-primary-foreground relative overflow-hidden"
          style={{ background: "var(--gradient-orange)" }}
        >
          <span className="text-[17px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            {loading ? "正在激活特权..." : "立即领取 30 天高级版权益"}
          </span>
          <span className="text-[10px] opacity-95 font-normal mt-0.5">
            {loading ? "礼包发放中" : "价值 300 元礼包"}
          </span>
        </button>

        {/* Share hint */}
        <p className="mt-3 text-center text-[11px] text-rita-slate-faint leading-relaxed">
          支持分享给合作伙伴或同事，让更多人同步体验企业级 AI 能力
        </p>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 mt-3.5 text-[11px] text-rita-slate-faint">
          <Users className="w-3.5 h-3.5" />
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
