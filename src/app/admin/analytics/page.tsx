"use client";

export default function AnalyticsPage() {
  const topPrompts = [
    { title: "Dashboard Pro", downloads: 4210, revenue: "$2,105" },
    { title: "Cinematic Hero", downloads: 3450, revenue: "$1,725" },
    { title: "Aurora Landing", downloads: 3120, revenue: "$1,560" },
    { title: "E-Commerce Product", downloads: 2890, revenue: "$1,445" },
    { title: "Minimal Portfolio", downloads: 2780, revenue: "$1,390" },
  ];

  const traffic = [
    { source: "Direct", visits: 12400, percentage: 42 },
    { source: "Google", visits: 8200, percentage: 28 },
    { source: "Twitter/X", visits: 4100, percentage: 14 },
    { source: "Product Hunt", visits: 2800, percentage: 10 },
    { source: "Other", visits: 1800, percentage: 6 },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Analytics</h2>
        <p className="text-sm text-[#57534E] mt-1">Track your website performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-xs text-[#A8A29E] mb-1">Page Views</div>
          <div className="text-2xl font-bold text-[#1C1917]">124,567</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 12.5% vs last month</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-[#A8A29E] mb-1">Unique Visitors</div>
          <div className="text-2xl font-bold text-[#1C1917]">45,230</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 8.2% vs last month</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-[#A8A29E] mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold text-[#1C1917]">3.2%</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 0.4% vs last month</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-[#A8A29E] mb-1">Avg. Session</div>
          <div className="text-2xl font-bold text-[#1C1917]">4m 32s</div>
          <div className="text-xs text-red-600 mt-1">↓ 0.8% vs last month</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Prompts */}
        <div className="card">
          <div className="p-6 border-b border-[#E7E5E4]">
            <h3 className="font-semibold text-[#1C1917]">Top Prompts</h3>
            <p className="text-sm text-[#A8A29E]">Most downloaded prompts</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPrompts.map((prompt, i) => (
                <div key={prompt.title} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F4] flex items-center justify-center text-sm font-medium text-[#57534E]">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#1C1917]">{prompt.title}</div>
                    <div className="text-xs text-[#A8A29E]">{prompt.downloads.toLocaleString()} downloads</div>
                  </div>
                  <div className="text-sm font-medium text-[#1C1917]">{prompt.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="card">
          <div className="p-6 border-b border-[#E7E5E4]">
            <h3 className="font-semibold text-[#1C1917]">Traffic Sources</h3>
            <p className="text-sm text-[#A8A29E]">Where your visitors come from</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {traffic.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#1C1917]">{source.source}</span>
                    <span className="text-sm text-[#57534E]">{source.visits.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-[#F5F5F4] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
