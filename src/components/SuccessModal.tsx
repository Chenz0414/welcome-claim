import { Check, Sparkles, Copy, Search } from "lucide-react";
import { useState } from "react";
import huaweiIcon from "@/assets/browser-huawei.webp";
import safariIcon from "@/assets/browser-safari.png";
import chromeIcon from "@/assets/browser-chrome.png";
import ucIcon from "@/assets/browser-uc.png";
import moreIcon from "@/assets/browser-more.png";

interface SuccessModalProps {
  visible: boolean;
  redirectUrl: string;
  autoRedirectSeconds?: number;
}

const SuccessModal = ({ visible, redirectUrl }: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!visible) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(redirectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in-up overflow-y-auto py-6"
      style={{ background: "linear-gradient(165deg, hsl(204 96% 94%) 0%, hsl(204 100% 97%) 40%, hsl(0 0% 100%) 100%)" }}
    >
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-24 h-24 rounded-full opacity-30 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent)" }} />
        <div className="absolute bottom-[20%] right-[8%] w-36 h-36 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.4), transparent)", animationDelay: "1s" }} />
      </div>

      <div className="relative flex flex-col items-center px-6 max-w-sm w-full">
        {/* ===== Top success section (scaled to ~70%) ===== */}
        <div className="flex flex-col items-center mb-6">
          {/* Success icon - smaller */}
          <div className="relative mb-5">
            <div className="absolute inset-0 w-[68px] h-[68px] rounded-full animate-ping opacity-20"
              style={{ background: "hsl(217 91% 60%)" }} />
            <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(224 76% 48%))",
                boxShadow: "0 6px 24px hsl(217 91% 60% / 0.4), 0 0 0 6px hsl(217 91% 60% / 0.08), 0 0 0 12px hsl(217 91% 60% / 0.04)"
              }}
            >
              <Check className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={3} />
            </div>
          </div>

          {/* Badge - smaller */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full mb-3"
            style={{
              background: "linear-gradient(135deg, hsl(45 97% 56% / 0.15), hsl(38 92% 50% / 0.1))",
              border: "1px solid hsl(45 97% 56% / 0.3)"
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: "hsl(38 92% 50%)" }} />
            <span className="text-[11px] font-bold" style={{ color: "hsl(38 80% 40%)" }}>高级版特权已激活</span>
          </div>

          {/* Title - smaller */}
          <h2 className="text-[24px] font-black text-foreground mb-1.5 tracking-tight text-center">
            领取成功
          </h2>

          {/* Description - smaller */}
          <p className="text-muted-foreground text-[13px] text-center leading-relaxed max-w-[280px]">
            30 天高级版体验特权已即时生效，复制链接到浏览器使用 Rita
          </p>
        </div>

        {/* ===== Steps with integrated UI ===== */}
        <div className="w-full flex flex-col gap-4">

          {/* Step 1: Copy link */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(217 91% 60%)" }}>1</span>
              <span className="text-[14px] font-semibold text-foreground">点击下方复制链接按钮</span>
            </div>
            <div className="w-full flex items-center gap-2 rounded-2xl px-4 py-2.5"
              style={{
                background: "hsl(0 0% 96%)",
                border: "1px solid hsl(0 0% 90%)",
              }}
            >
              <span className="flex-1 text-[15px] truncate" style={{ color: "hsl(0 0% 45%)" }}>
                {redirectUrl.replace(/^https?:\/\//, '')}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 px-5 py-2 rounded-xl text-[15px] font-bold text-white transition-all active:scale-95"
                style={{
                  background: copied ? "hsl(142 71% 45%)" : "hsl(217 91% 60%)",
                  boxShadow: copied ? "none" : "0 0 0 0 hsl(217 91% 60% / 0.6)",
                  animation: copied ? "none" : "breath 2s infinite ease-in-out",
                }}
              >
                {copied ? "已复制 ✓" : "复制链接"}
              </button>
            </div>
          </div>

          {/* Step 2: Open browser */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(217 91% 60%)" }}>2</span>
              <span className="text-[14px] font-semibold text-foreground">打开手机桌面的浏览器</span>
            </div>
            <div className="w-full flex items-center justify-center gap-4 py-3 rounded-2xl"
              style={{
                background: "hsl(210 40% 96%)",
                border: "1px solid hsl(214 32% 91%)",
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <img src={huaweiIcon} alt="华为浏览器" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <span className="text-[11px] text-muted-foreground">华为</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={safariIcon} alt="Safari" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <span className="text-[11px] text-muted-foreground">Safari</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={chromeIcon} alt="Chrome" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <span className="text-[11px] text-muted-foreground">Chrome</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={ucIcon} alt="UC" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <span className="text-[11px] text-muted-foreground">UC</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={moreIcon} alt="更多浏览器" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                <span className="text-[11px] text-muted-foreground">更多</span>
              </div>
              </div>
            </div>
          </div>

          {/* Step 3: Paste in address bar */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(217 91% 60%)" }}>3</span>
              <span className="text-[14px] font-semibold text-foreground">在浏览器顶部地址栏，粘贴并访问</span>
            </div>
            {/* Mock browser address bar */}
            <div className="w-full rounded-2xl overflow-hidden"
              style={{
                background: "hsl(0 0% 98%)",
                border: "1px solid hsl(0 0% 88%)",
              }}
            >
              {/* Browser top bar */}
              <div className="flex items-center gap-2 px-3 py-2"
                style={{ background: "hsl(0 0% 95%)", borderBottom: "1px solid hsl(0 0% 88%)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 80% 65%)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(45 90% 55%)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(140 60% 50%)" }} />
                </div>
              </div>
              {/* Address bar */}
              <div className="flex items-center gap-2 mx-3 my-2.5 px-3 py-2 rounded-lg"
                style={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(0 0% 85%)" }}
              >
                <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(0 0% 60%)" }} />
                <span className="text-[13px]" style={{ color: "hsl(0 0% 70%)" }}>
                  粘贴链接并访问
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share entry */}
        <button
          onClick={() => {
            navigator.clipboard.writeText("https://ai.zhekouniu.net").catch(() => {
              const ta = document.createElement("textarea");
              ta.value = "https://ai.zhekouniu.net";
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
            });
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
          }}
          className="mt-5 w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs transition-all active:scale-[0.98]"
          style={{ color: "hsl(217 91% 60%)" }}
        >
          <span className="opacity-70 text-[13px]">想分享给员工/同事共同开启效率革命？</span>
          <span className="font-bold underline underline-offset-2 text-[13px]">点击分享</span>
        </button>

        {/* Share toast */}
        {shareCopied && (
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full text-sm font-medium shadow-lg"
            style={{ background: "hsl(0 0% 20%)", color: "white" }}
          >
            ✅ 已复制分享链接
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
