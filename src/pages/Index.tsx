import Globe from "@/components/Globe";
import ConversionCard from "@/components/ConversionCard";
import SceneCard from "@/components/SceneCard";

const Index = () => {
  return (
    <div className="min-h-screen flex justify-center" style={{ background: "hsl(213 27% 96%)" }}>
      <div
        className="w-full max-w-[450px] relative flex flex-col overflow-x-hidden pb-5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]"
        style={{ background: "var(--gradient-sky)" }}
      >
        {/* Header */}
        <header className="pt-10 px-6 pb-2.5 flex items-center justify-between relative z-10">
          <div className="w-[60%]">
            <div className="text-2xl font-black tracking-tight text-primary mb-1.5">Rita</div>
            <h1 className="text-2xl font-black leading-[1.3] tracking-tight text-foreground mb-2.5">
              聚合全球顶级模型
              <br />
              提升企业 AI 生产力
            </h1>
            <p className="text-[13px] text-rita-slate-body opacity-80 leading-relaxed">
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

        {/* Footer */}
        <footer className="pt-6 pb-2.5 text-center text-[11px] font-semibold text-rita-slate-faint">
          Rita让创意和效率人人可得
        </footer>
      </div>
    </div>
  );
};

export default Index;
