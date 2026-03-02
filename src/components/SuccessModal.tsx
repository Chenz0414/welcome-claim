import { Check } from "lucide-react";
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

  return (
    <div className="absolute inset-0 bg-card flex flex-col items-center justify-center px-10 z-50 animate-fade-in-up">
      <div className="w-20 h-20 bg-rita-sky-start text-primary rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-foreground mb-2">领取成功</h2>
      <p className="text-muted-foreground text-sm text-center leading-relaxed mb-10">
        高级版体验特权已即时生效
        <br />
        请使用该手机号登录 Rita 开启工作
      </p>
      <button
        onClick={() => (window.location.href = redirectUrl)}
        className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-transform active:scale-[0.98]"
      >
        进入工作台 ({countdown}s)
      </button>
    </div>
  );
};

export default SuccessModal;
