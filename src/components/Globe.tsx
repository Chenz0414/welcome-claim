const Globe = () => {
  return (
    <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] flex items-center justify-center -mr-4 shrink-0">
      {/* Orbit */}
      <div
        className="absolute w-[130%] h-[40%] border border-rita-blue/30 rounded-[50%]"
        style={{ animation: "rotateOrbit 8s linear infinite", transform: "rotateX(75deg) rotateY(10deg)" }}
      >
        <div className="absolute w-1.5 h-1.5 bg-rita-blue/60 rounded-full -top-[3px] left-1/2 shadow-[0_0_10px_white]" />
      </div>

      {/* Globe sphere */}
      <div
        className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] relative rounded-full overflow-hidden shadow-globe"
        style={{
          background: "radial-gradient(circle, hsl(var(--rita-blue)) 0%, hsl(var(--rita-blue-deep)) 40%, hsl(var(--rita-blue-darker)) 100%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(hsla(0,0%,100%,0.1) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.1) 1px, transparent 1px)",
            backgroundSize: "15px 15px",
            maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 100%)",
          }}
        />
        {/* World map */}
        <div
          className="absolute w-[200%] h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cpath fill='rgba(255,255,255,0.25)' d='M150,100 Q180,80 210,110 T250,100 T300,120 T350,90 T400,110 T450,130 T500,100 T550,120 T600,90 T650,110 T700,80 L700,300 Q650,320 600,290 T550,310 T500,280 T450,300 T400,270 T350,290 T300,310 T250,280 T200,300 T150,270 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "50% 100%",
            animation: "moveMap 15s linear infinite",
          }}
        />
      </div>
    </div>
  );
};

export default Globe;
