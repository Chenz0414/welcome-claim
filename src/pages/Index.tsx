import Globe from "@/components/Globe";
import ConversionCard from "@/components/ConversionCard";
import SceneCard from "@/components/SceneCard";
import EnterpriseCases from "@/components/EnterpriseCases";
import ritaLogo from "@/assets/rita-logo.webp";
import ritaText from "@/assets/rita-text.webp";

const Index = () => {
  return (
    <div className="min-h-screen min-h-[100dvh] flex justify-center bg-muted">
      <div
        className="w-full max-w-[450px] relative flex flex-col overflow-x-hidden pb-5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]"
        style={{ background: "var(--gradient-sky)", paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Header */}
        <header className="pt-8 sm:pt-10 px-5 sm:px-6 pb-2.5 flex items-center justify-between relative z-10">
          <div className="w-[60%]">
            <div className="flex items-center gap-2 mb-1.5">
              <img src={ritaLogo} alt="Rita Logo" className="w-7 h-7" />
              <img src={ritaText} alt="Rita" className="h-5" />
            </div>
            <h1 className="text-2xl sm:text-[28px] font-black leading-[1.3] tracking-tight text-foreground mb-2.5">
              聚合当下头部模型
              <br />
              提升企业 AI 生产力
            </h1>
            <p className="text-sm text-rita-slate-body opacity-80 leading-relaxed">
              当业务规模扩大，效率成为关键变量
              <br />
              Rita助您将生产力提升10倍以上。
            </p>
          </div>
          <Globe />
        </header>

        {/* Conversion Card */}
        <ConversionCard />

        {/* Scene Cards */}
        <SceneCard />

        {/* Enterprise Cases */}
        <EnterpriseCases />

        {/* Footer */}
        <footer className="pt-6 pb-2.5 text-center text-xs font-semibold text-rita-slate-faint">
          Rita让创意和效率人人可得
        </footer>
      </div>
    </div>
  );
};

export default Index;
