import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface SuccessModalProps {
  visible: boolean;
  redirectUrl: string;
  autoRedirectSeconds?: number;
}

const SuccessModal = ({ visible, redirectUrl, autoRedirectSeconds = 5 }: SuccessModalProps) => {
  const [countdown, setCountdown] = useState(autoRedirectSeconds);

  useEffect(() => {
    if (!visible) return;
    setCountdown(autoRedirectSeconds);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = redirectUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [visible, redirectUrl, autoRedirectSeconds]);

  if (!visible) return null;

  const progress = ((autoRedirectSeconds - countdown) / autoRedirectSeconds) * 100;

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
        <h2 className="text-[28px] font-black text-foreground mb-2 tracking-tight">
          领取成功 🎉
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm text-center leading-relaxed mb-10 max-w-[260px]">
          30 天高级版体验特权已即时生效
          <br />
          请使用该手机号登录 Rita 开启工作
        </p>

        {/* CTA Button with progress bar */}
        <div className="w-full relative">
          <button
            onClick={() => (window.location.href = redirectUrl)}
            className="w-full h-14 rounded-2xl font-bold text-base text-primary-foreground transition-all active:scale-[0.98] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(224 76% 48%))",
              boxShadow: "0 8px 24px hsl(217 91% 60% / 0.35), 0 2px 8px hsl(224 76% 48% / 0.2)"
            }}
          >
            <span className="relative z-10">进入工作台 ({countdown}s)</span>
            {/* Progress fill */}
            <div
              className="absolute inset-0 opacity-20 transition-all duration-1000 ease-linear"
              style={{
                background: "hsl(0 0% 100%)",
                width: `${progress}%`,
              }}
            />
          </button>
        </div>

        {/* Subtle footer */}
        <p className="mt-6 text-[11px] text-muted-foreground/60 text-center">
          页面将在 {countdown} 秒后自动跳转
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
