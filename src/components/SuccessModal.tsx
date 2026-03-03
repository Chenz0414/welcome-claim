import { Check, Sparkles, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

interface SuccessModalProps {
  visible: boolean;
  redirectUrl: string;
  autoRedirectSeconds?: number;
}

const SuccessModal = ({ visible, redirectUrl }: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!visible) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(redirectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = redirectUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in-up"
      style={{ background: "linear-gradient(165deg, hsl(204 96% 94%) 0%, hsl(204 100% 97%) 40%, hsl(0 0% 100%) 100%)" }}
    >
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full opacity-30 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent)" }} />
        <div className="absolute bottom-[20%] right-[8%] w-48 h-48 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.4), transparent)", animationDelay: "1s" }} />
        <div className="absolute top-[40%] right-[20%] w-20 h-20 rounded-full opacity-25 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.3), transparent)", animationDelay: "0.5s" }} />
      </div>

      <div className="relative flex flex-col items-center px-8 max-w-sm w-full">
        {/* Success icon with glow ring */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full animate-ping opacity-20"
            style={{ background: "hsl(217 91% 60%)" }} />
          {/* Middle ring */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(224 76% 48%))",
              boxShadow: "0 8px 32px hsl(217 91% 60% / 0.4), 0 0 0 8px hsl(217 91% 60% / 0.08), 0 0 0 16px hsl(217 91% 60% / 0.04)"
            }}
          >
            <Check className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={3} />
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-5"
          style={{
            background: "linear-gradient(135deg, hsl(45 97% 56% / 0.15), hsl(38 92% 50% / 0.1))",
            border: "1px solid hsl(45 97% 56% / 0.3)"
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(38 92% 50%)" }} />
          <span className="text-xs font-bold" style={{ color: "hsl(38 80% 40%)" }}>高级版特权已激活</span>
        </div>

        {/* Title */}
        <h2 className="text-[28px] font-black text-foreground mb-2 tracking-tight text-center">
          领取成功
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm text-center leading-relaxed mb-10 max-w-[260px]">
          30 天高级版体验特权已即时生效
          <br />
          请使用该手机号登录 Rita 开启工作
        </p>

        {/* Copy URL bar */}
        <div className="w-full flex items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{
            background: "hsl(0 0% 96%)",
            border: "1px solid hsl(0 0% 90%)",
          }}
        >
          <span className="flex-1 text-sm truncate" style={{ color: "hsl(0 0% 45%)" }}>
            {redirectUrl.replace(/^https?:\/\//, '')}
          </span>
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: "hsl(38 92% 50%)" }} />
          <button
            onClick={handleCopy}
            className="shrink-0 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{
              background: copied ? "hsl(142 71% 45%)" : "hsl(217 91% 60%)",
              boxShadow: copied ? "none" : "0 0 0 0 hsl(217 91% 60% / 0.6)",
              animation: copied ? "none" : "breath 2s infinite ease-in-out",
            }}
          >
            {copied ? "已复制 ✓" : "复制链接"}
          </button>
        </div>

        {/* Mini tutorial */}
        <div className="mt-6 w-full rounded-2xl px-5 py-4"
          style={{
            background: "hsl(210 40% 96%)",
            border: "1px solid hsl(214 32% 91%)",
          }}
        >
          <p className="text-xs font-bold text-foreground mb-3">📋 如何打开链接？</p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-primary-foreground"
                style={{ background: "hsl(217 91% 60%)" }}>1</span>
              <span className="text-xs text-muted-foreground leading-relaxed">点击上方「复制链接」按钮</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-primary-foreground"
                style={{ background: "hsl(217 91% 60%)" }}>2</span>
              <span className="text-xs text-muted-foreground leading-relaxed">打开手机自带浏览器（Safari / Chrome）</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-primary-foreground"
                style={{ background: "hsl(217 91% 60%)" }}>3</span>
              <span className="text-xs text-muted-foreground leading-relaxed">在地址栏粘贴链接并访问即可</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
