const cases = [
  {
    tag: "Efficiency 01",
    tagBg: "bg-blue-50",
    tagText: "text-blue-600",
    tagBorder: "border-blue-100",
    label: "Predict",
    title: "经营更可预期",
    quote: "\u201c从拍脑袋，到有依据地做生意\u201d",
    quoteColor: "text-blue-600",
    painLabel: "核心痛点",
    painText: "销售波动大、库存压力大，年度目标很难拆解到每季每月。",
    solLabel: "AI 解决方案",
    solLabelColor: "text-blue-600",
    solText: "基于历史数据自动生成年度/季度经营节奏建议和活动排期参考。",
  },
  {
    tag: "Execution 02",
    tagBg: "bg-purple-50",
    tagText: "text-purple-600",
    tagBorder: "border-purple-100",
    label: "Team Up",
    title: "团队能力整体抬升",
    quote: "\u201c老板不用亲自盯，员工也不会无从下手\u201d",
    quoteColor: "text-purple-600",
    painLabel: "核心痛点",
    painText: "SOP 理解不一，培训成本高、落地效率低。",
    solLabel: "AI 解决方案",
    solLabelColor: "text-purple-600",
    solText: "SOP 自动拆解为店长、店员、培训三版指引和话术。",
  },
  {
    tag: "Strategy 03",
    tagBg: "bg-emerald-50",
    tagText: "text-emerald-600",
    tagBorder: "border-emerald-100",
    label: "Decision",
    title: "决策更快更有依据",
    quote: "\u201c重要决定不再只靠经验拍板\u201d",
    quoteColor: "text-emerald-600",
    painLabel: "痛点分析",
    painText: "想看行业趋势、竞品情况、品类机会却没人系统整理。",
    solLabel: "AI 解决方案",
    solLabelColor: "text-emerald-600",
    solText: "多 Agent 深度研究，自动生成行业简报、竞品对比和分析报告。",
  },
  {
    tag: "Operations 04",
    tagBg: "bg-orange-50",
    tagText: "text-orange-600",
    tagBorder: "border-orange-100",
    label: "ROI",
    title: "活动 ROI 更稳",
    quote: "\u201c不是多做活动，而是每次都尽量不浪费\u201d",
    quoteColor: "text-orange-600",
    painLabel: "痛点分析",
    painText: "复盘质量差，ROI 波动大，成功经验难以沉淀到下次执行。",
    solLabel: "AI 解决方案",
    solLabelColor: "text-orange-600",
    solText: "自动执行数据复盘，总结可复用打法，为下次活动提供模板。",
  },
];

const EnterpriseCases = () => {
  return (
    <section className="w-full px-5 sm:px-6 py-8 mx-auto">
      <div className="flex flex-col items-center text-center mb-8 px-2">
        <h2 className="text-2xl sm:text-[28px] font-black text-foreground mb-3 tracking-tight">
          RITA 如何赋能企业
        </h2>
        <p className="max-w-sm text-rita-slate-body text-sm leading-relaxed font-medium">
          解放老板，弥补团队能力差异，提升落地效率，并为战略决策提供支持。
        </p>
        <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mt-5 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cases.map((c) => (
          <div
            key={c.tag}
            className="bg-card/60 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex flex-col ring-1 ring-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`px-3 py-1 ${c.tagBg} ${c.tagText} text-[9px] rounded-full font-black border ${c.tagBorder} uppercase tracking-widest`}
              >
                {c.tag}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono tracking-tighter uppercase">
                {c.label}
              </span>
            </div>
            <h3 className="text-lg font-black text-foreground mb-1.5 tracking-tight">
              {c.title}
            </h3>
            <p className={`${c.quoteColor} text-[13px] font-bold mb-4`}>{c.quote}</p>
            <div className="space-y-3 text-[13px] text-rita-slate-body leading-relaxed">
              <p>
                <strong className="text-foreground block mb-0.5 font-bold">{c.painLabel}</strong>
                {c.painText}
              </p>
              <p>
                <strong className={`${c.solLabelColor} block mb-0.5 mt-2 font-bold`}>
                  {c.solLabel}
                </strong>
                {c.solText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnterpriseCases;
