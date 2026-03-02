import { Sparkles, BarChart3, Layers } from "lucide-react";

interface SceneItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const scenes: SceneItem[] = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "营销与内容生产",
    desc: "活动策划、爆款卖点提炼、竞品分析文案、门店宣传物料生成。支持多模型调用与一键对比，直接输出可商用内容。",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "数据与决策分析",
    desc: "销售报表、库存结构、财务趋势自动解析，生成结构化洞察与增长分析，辅助门店与品类决策。",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "多模型对比与深度研究",
    desc: "围绕行业趋势、市场竞争格局与产品定位生成完整研究报告，一键切换顶级模型，从选题到成稿自动完成。",
  },
];

const SceneCard = () => {
  return (
    <div className="flex flex-col gap-2.5 px-5 sm:px-6">
      {scenes.map((scene, i) => (
        <div
          key={i}
          className="bg-card/85 backdrop-blur-[10px] border border-card/80 rounded-[18px] p-4 flex gap-3"
          style={{ animation: `fade-in-up 0.5s ease-out ${0.1 * (i + 1)}s both` }}
        >
          <div className="w-9 h-9 bg-rita-sky-start rounded-[10px] flex items-center justify-center shrink-0 text-primary">
            {scene.icon}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-foreground mb-0.5">{scene.title}</h4>
            <p className="text-xs text-rita-slate-body leading-relaxed">{scene.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SceneCard;
