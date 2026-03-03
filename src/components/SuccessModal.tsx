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
        <p className="text-muted-foreground text-sm text-center leading-relaxed mb-10 max-w-[280px]">
          30 天高级版体验特权已即时生效，点击复制进入浏览器使用 Rita
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
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground leading-relaxed">打开手机桌面的「浏览器」</span>
                <div className="flex items-center gap-2">
                  {/* Safari */}
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px]" style={{ background: "linear-gradient(180deg, #56C1F5 0%, #0A84FF 100%)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/><path d="M12 2L14 10L12 12L10 10L12 2Z" fill="white" opacity="0.9"/><path d="M12 22L10 14L12 12L14 14L12 22Z" fill="#FF3B30" opacity="0.9"/><path d="M2 12L10 10L12 12L10 14L2 12Z" fill="white" opacity="0.9"/><path d="M22 12L14 14L12 12L14 10L22 12Z" fill="#FF3B30" opacity="0.9"/></svg>
                  </div>
                  {/* Chrome */}
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#f1f1f1" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="#4285F4"/><path d="M12 8C14.2 8 16 9.8 16 12H22C22 6.48 17.52 2 12 2C9.8 2 7.8 2.8 6.2 4.1L9.1 9.1C9.8 8.4 10.8 8 12 8Z" fill="#EA4335"/><path d="M6.2 4.1L9.1 9.1C8.4 9.8 8 10.8 8 12C8 13.2 8.4 14.2 9.1 14.9L6.2 19.9C3.8 17.8 2 14.6 2 12C2 8.8 3.6 6 6.2 4.1Z" fill="#FBBC05"/><path d="M12 16C10.8 16 9.8 15.6 9.1 14.9L6.2 19.9C7.8 21.2 9.8 22 12 22C17.52 22 22 17.52 22 12H16C16 14.2 14.2 16 12 16Z" fill="#34A853"/></svg>
                  </div>
                  {/* 华为浏览器 */}
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#CE0E2D" }}>
                    <span className="text-white text-[9px] font-black">HW</span>
                  </div>
                  {/* UC */}
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#FF6600" }}>
                    <span className="text-white text-[9px] font-black">UC</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-primary-foreground"
                style={{ background: "hsl(217 91% 60%)" }}>3</span>
              <span className="text-xs text-muted-foreground leading-relaxed">在浏览器顶部地址栏，粘贴链接并访问即可</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
