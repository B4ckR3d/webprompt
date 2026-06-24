"use client";

interface PreviewProps {
  category: string;
  colors: string;
  title: string;
}

export default function PromptPreview({ category, colors, title }: PreviewProps) {
  // Generate a unique but consistent pattern based on title
  const hash = title.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const absHash = Math.abs(hash);

  const getPreview = () => {
    switch (category) {
      case "Hero Section":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            {/* Background dots */}
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
            {/* Nav bar */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/15 flex items-center px-2 gap-2">
              <div className="w-2 h-1.5 rounded-sm bg-white/50"></div>
              <div className="flex-1"></div>
              <div className="w-2 h-1 rounded-sm bg-white/30"></div>
              <div className="w-2 h-1 rounded-sm bg-white/30"></div>
              <div className="w-3 h-1.5 rounded-sm bg-white/50"></div>
            </div>
            {/* Hero content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-3 pt-6">
              <div className="w-10 h-1.5 rounded-full bg-white/60 mb-1.5 animate-pulse"></div>
              <div className="w-14 h-2 rounded bg-white/80 mb-1"></div>
              <div className="w-10 h-1 rounded bg-white/40 mb-3"></div>
              <div className="flex gap-1.5">
                <div className="w-7 h-2.5 rounded-md bg-white/90"></div>
                <div className="w-7 h-2.5 rounded-md border border-white/50 bg-white/20"></div>
              </div>
            </div>
            {/* Decorative shapes */}
            <div className="absolute top-5 right-2 w-6 h-6 rounded-full border-2 border-white/20 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-4 left-2 w-4 h-4 rounded bg-white/10 animate-bounce" style={{animationDuration: '3s'}}></div>
          </div>
        );

      case "Landing Page":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 flex flex-col">
              {/* Nav */}
              <div className="h-3 bg-black/10 flex items-center px-2 gap-1">
                <div className="w-2 h-1 rounded-sm bg-white/50"></div>
                <div className="flex-1"></div>
                <div className="w-1.5 h-1 rounded-sm bg-white/30"></div>
                <div className="w-1.5 h-1 rounded-sm bg-white/30"></div>
                <div className="w-2.5 h-1.5 rounded-sm bg-white/50"></div>
              </div>
              {/* Hero */}
              <div className="flex-1 flex items-center justify-center p-2">
                <div className="w-full h-5 rounded bg-white/20 flex items-center justify-center">
                  <div className="w-8 h-1 rounded bg-white/50"></div>
                </div>
              </div>
              {/* Features */}
              <div className="flex gap-1 px-2 pb-2">
                <div className="flex-1 h-4 rounded-sm bg-white/15 border border-white/10"></div>
                <div className="flex-1 h-4 rounded-sm bg-white/15 border border-white/10"></div>
                <div className="flex-1 h-4 rounded-sm bg-white/15 border border-white/10"></div>
              </div>
            </div>
          </div>
        );

      case "SaaS":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
            <div className="absolute inset-0 p-2 flex flex-col">
              {/* Nav */}
              <div className="h-3 bg-black/10 rounded-sm mb-1.5 flex items-center px-1.5 gap-1">
                <div className="w-2 h-1 rounded-sm bg-white/40"></div>
                <div className="flex-1"></div>
                <div className="w-2 h-1 rounded-sm bg-white/30"></div>
                <div className="w-2 h-1 rounded-sm bg-white/30"></div>
              </div>
              {/* Stats row */}
              <div className="flex gap-1 mb-1.5">
                <div className="flex-1 h-3 rounded-sm bg-white/20 animate-pulse"></div>
                <div className="flex-1 h-3 rounded-sm bg-white/20 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="flex-1 h-3 rounded-sm bg-white/20 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              {/* Chart area */}
              <div className="flex-1 rounded-sm bg-white/10 flex items-end gap-0.5 p-1">
                {[40, 65, 50, 80, 55, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/40 rounded-t-sm animate-pulse" style={{height: `${h}%`, animationDelay: `${i * 0.1}s`}}></div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Dashboard":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 flex">
              {/* Sidebar */}
              <div className="w-4 bg-black/20 p-1 flex flex-col gap-1">
                <div className="w-2 h-1 rounded-sm bg-white/40"></div>
                <div className="w-2 h-1 rounded-sm bg-white/25"></div>
                <div className="w-2 h-1 rounded-sm bg-white/25"></div>
                <div className="w-2 h-1 rounded-sm bg-white/25"></div>
                <div className="flex-1"></div>
                <div className="w-2 h-1 rounded-sm bg-white/20"></div>
              </div>
              {/* Main */}
              <div className="flex-1 p-1.5 flex flex-col gap-1">
                {/* Stats */}
                <div className="flex gap-1">
                  <div className="flex-1 h-3 rounded-sm bg-white/20"></div>
                  <div className="flex-1 h-3 rounded-sm bg-white/20"></div>
                  <div className="flex-1 h-3 rounded-sm bg-white/20"></div>
                  <div className="flex-1 h-3 rounded-sm bg-white/20"></div>
                </div>
                {/* Charts */}
                <div className="flex-1 flex gap-1">
                  <div className="flex-1 rounded-sm bg-white/10 flex items-end gap-px p-0.5">
                    {[30, 50, 40, 70, 45, 60].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/30 rounded-t-sm" style={{height: `${h}%`}}></div>
                    ))}
                  </div>
                  <div className="flex-1 rounded-sm bg-white/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white/60 animate-spin" style={{animationDuration: '4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Portfolio":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
              {/* Nav */}
              <div className="h-2 flex items-center justify-between">
                <div className="w-3 h-1 rounded-sm bg-white/50"></div>
                <div className="flex gap-1">
                  <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
                  <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
                  <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
                </div>
              </div>
              {/* Gallery grid */}
              <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-1">
                <div className="rounded-sm bg-white/20 col-span-2 row-span-2 animate-pulse"></div>
                <div className="rounded-sm bg-white/15 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="rounded-sm bg-white/15 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        );

      case "E-Commerce":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col">
              {/* Nav with cart */}
              <div className="h-3 bg-black/10 rounded-sm mb-1.5 flex items-center px-1.5 gap-1">
                <div className="w-2 h-1 rounded-sm bg-white/40"></div>
                <div className="flex-1"></div>
                <div className="w-1.5 h-1.5 rounded-sm bg-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-white/40 flex items-center justify-center">
                  <span className="text-[4px] text-white font-bold">2</span>
                </div>
              </div>
              {/* Product grid */}
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <div className="rounded-sm bg-white/15 flex flex-col p-1 gap-0.5">
                  <div className="flex-1 rounded-sm bg-white/20"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/40"></div>
                  <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
                  <div className="w-2.5 h-1.5 rounded-sm bg-white/50"></div>
                </div>
                <div className="rounded-sm bg-white/15 flex flex-col p-1 gap-0.5">
                  <div className="flex-1 rounded-sm bg-white/20"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/40"></div>
                  <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
                  <div className="w-2.5 h-1.5 rounded-sm bg-white/50"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Blog":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col gap-1">
              {/* Nav */}
              <div className="h-2 flex items-center justify-between">
                <div className="w-3 h-1 rounded-sm bg-white/50"></div>
                <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
              </div>
              {/* Featured image */}
              <div className="h-5 rounded-sm bg-white/20"></div>
              {/* Article */}
              <div className="flex-1 flex gap-1.5">
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="w-6 h-1 rounded-sm bg-white/50"></div>
                  <div className="w-full h-0.5 rounded-sm bg-white/20"></div>
                  <div className="w-full h-0.5 rounded-sm bg-white/20"></div>
                  <div className="w-3/4 h-0.5 rounded-sm bg-white/20"></div>
                </div>
                {/* Sidebar */}
                <div className="w-4 flex flex-col gap-0.5">
                  <div className="w-full h-2 rounded-sm bg-white/15"></div>
                  <div className="w-full h-2 rounded-sm bg-white/15"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Pricing":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col items-center">
              <div className="w-6 h-1 rounded-sm bg-white/50 mb-1"></div>
              <div className="w-8 h-0.5 rounded-sm bg-white/30 mb-2"></div>
              <div className="flex gap-1 w-full">
                {['40', '100', '60'].map((opacity, i) => (
                  <div key={i} className={`flex-1 rounded-sm bg-white/${opacity} flex flex-col items-center p-1 gap-0.5 ${i === 1 ? 'ring-1 ring-white/40' : ''}`}>
                    <div className="w-3 h-0.5 rounded-sm bg-white/50"></div>
                    <div className="w-4 h-1 rounded-sm bg-white/60"></div>
                    <div className="w-full h-px bg-white/20 my-0.5"></div>
                    <div className="w-2.5 h-0.5 rounded-sm bg-white/30"></div>
                    <div className="w-2.5 h-0.5 rounded-sm bg-white/30"></div>
                    <div className="w-3.5 h-1.5 rounded-sm bg-white/50 mt-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Testimonial":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
              <div className="text-3xl text-white/20 font-serif">&ldquo;</div>
              <div className="w-12 h-1 rounded-sm bg-white/40 mb-1"></div>
              <div className="w-10 h-0.5 rounded-sm bg-white/25 mb-2"></div>
              {/* Avatar + name */}
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-white/30"></div>
                <div>
                  <div className="w-5 h-0.5 rounded-sm bg-white/50"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/25 mt-0.5"></div>
                </div>
              </div>
              {/* Dots */}
              <div className="flex gap-1 mt-2">
                <div className="w-1 h-1 rounded-full bg-white/60"></div>
                <div className="w-1 h-1 rounded-full bg-white/25"></div>
                <div className="w-1 h-1 rounded-full bg-white/25"></div>
              </div>
            </div>
          </div>
        );

      case "FAQ":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col gap-1">
              <div className="w-4 h-1 rounded-sm bg-white/50 mb-0.5"></div>
              {/* Search */}
              <div className="h-2.5 rounded-sm bg-white/15 border border-white/10 flex items-center px-1">
                <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
              </div>
              {/* Accordion items */}
              {[
                { bg: 'bg-white/25', border: 'border-white/20' },
                { bg: 'bg-white/15', border: 'border-white/10' },
                { bg: 'bg-white/15', border: 'border-white/10' },
                { bg: 'bg-white/15', border: 'border-white/10' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-1 rounded-sm ${item.bg} border ${item.border}`}>
                  <div className="w-6 h-0.5 rounded-sm bg-white/40"></div>
                  <div className={`w-1.5 h-1.5 rounded-sm bg-white/30 ${i === 0 ? 'rotate-45' : ''}`}></div>
                </div>
              ))}
              {/* Expanded content */}
              <div className="p-1 rounded-sm bg-white/10">
                <div className="w-full h-0.5 rounded-sm bg-white/20 mb-0.5"></div>
                <div className="w-3/4 h-0.5 rounded-sm bg-white/20"></div>
              </div>
            </div>
          </div>
        );

      case "Footer":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 flex flex-col justify-end p-2 gap-1.5">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="w-4 h-1 rounded-sm bg-white/50 mb-1"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/25 mb-0.5"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/25"></div>
                </div>
                <div className="flex-1">
                  <div className="w-3 h-1 rounded-sm bg-white/50 mb-1"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/25 mb-0.5"></div>
                  <div className="w-2 h-0.5 rounded-sm bg-white/25"></div>
                </div>
                <div className="flex-1">
                  <div className="w-4 h-1 rounded-sm bg-white/50 mb-1"></div>
                  <div className="w-3 h-0.5 rounded-sm bg-white/25 mb-0.5"></div>
                  <div className="w-2.5 h-0.5 rounded-sm bg-white/25"></div>
                </div>
              </div>
              {/* Newsletter */}
              <div className="flex gap-1">
                <div className="flex-1 h-2.5 rounded-sm bg-white/15 border border-white/10"></div>
                <div className="w-4 h-2.5 rounded-sm bg-white/40"></div>
              </div>
              {/* Bottom bar */}
              <div className="h-px bg-white/20"></div>
              <div className="flex items-center justify-between">
                <div className="w-4 h-0.5 rounded-sm bg-white/30"></div>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Navigation":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            {/* Sticky nav */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/15 backdrop-blur-sm flex items-center px-2 gap-2 z-10">
              <div className="w-2.5 h-1.5 rounded-sm bg-white/50"></div>
              <div className="flex-1"></div>
              <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
              <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
              <div className="w-2 h-0.5 rounded-sm bg-white/30"></div>
              <div className="w-3 h-2 rounded-sm bg-white/50"></div>
            </div>
            {/* Mobile menu */}
            <div className="absolute top-5 right-1 w-6 bg-white/20 rounded-sm p-1 flex flex-col gap-0.5">
              <div className="w-full h-0.5 rounded-sm bg-white/40"></div>
              <div className="w-full h-0.5 rounded-sm bg-white/40"></div>
              <div className="w-full h-0.5 rounded-sm bg-white/40"></div>
            </div>
            {/* Content behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-1 rounded-sm bg-white/20"></div>
            </div>
          </div>
        );

      case "Animation":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            {/* Particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/30 animate-ping"
                  style={{
                    width: `${2 + (i % 3)}px`,
                    height: `${2 + (i % 3)}px`,
                    top: `${10 + (i * 12) % 80}%`,
                    left: `${5 + (i * 15) % 90}%`,
                    animationDuration: `${2 + (i % 3)}s`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                ></div>
              ))}
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="20%" y1="30%" x2="50%" y2="60%" stroke="white" strokeWidth="0.5" opacity="0.15" />
                <line x1="50%" y1="60%" x2="80%" y2="40%" stroke="white" strokeWidth="0.5" opacity="0.15" />
                <line x1="30%" y1="70%" x2="70%" y2="20%" stroke="white" strokeWidth="0.5" opacity="0.1" />
              </svg>
              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white/70 animate-spin" style={{animationDuration: '3s'}}></div>
              </div>
            </div>
          </div>
        );

      case "Component":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
              {/* Tabs */}
              <div className="flex gap-0.5">
                <div className="px-1.5 py-0.5 rounded-t-sm bg-white/30 text-[4px] text-white/60">Tab 1</div>
                <div className="px-1.5 py-0.5 rounded-t-sm bg-white/10 text-[4px] text-white/40">Tab 2</div>
              </div>
              {/* Card */}
              <div className="flex-1 rounded-sm bg-white/15 border border-white/10 p-1 flex flex-col gap-1">
                <div className="w-4 h-1 rounded-sm bg-white/40"></div>
                <div className="w-full h-0.5 rounded-sm bg-white/20"></div>
                <div className="w-3/4 h-0.5 rounded-sm bg-white/20"></div>
                <div className="flex gap-1 mt-auto">
                  <div className="w-4 h-2 rounded-sm bg-white/40"></div>
                  <div className="w-4 h-2 rounded-sm bg-white/20 border border-white/20"></div>
                </div>
              </div>
              {/* Toggle */}
              <div className="flex items-center gap-1">
                <div className="w-3 h-1.5 rounded-full bg-white/40 relative">
                  <div className="absolute right-0 top-0 w-1.5 h-1.5 rounded-full bg-white/70"></div>
                </div>
                <div className="w-4 h-0.5 rounded-sm bg-white/30"></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors} relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-white/20 animate-pulse"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative">
      {getPreview()}
    </div>
  );
}
