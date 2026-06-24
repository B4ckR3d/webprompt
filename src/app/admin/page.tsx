"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data
const stats = [
  { label: "Total Prompts", value: "84", change: "+12", changeType: "positive", icon: "✨" },
  { label: "Total Users", value: "2,847", change: "+180", changeType: "positive", icon: "👥" },
  { label: "Revenue", value: "$12,426", change: "+$2,100", changeType: "positive", icon: "💰" },
  { label: "Downloads", value: "45.2K", change: "+5.2K", changeType: "positive", icon: "📥" },
];

const recentPayments = [
  { id: "PAY-001", user: "john@example.com", amount: "$9.99", plan: "Pro Monthly", status: "completed", date: "2 hours ago" },
  { id: "PAY-002", user: "sarah@company.io", amount: "$49.99", plan: "Lifetime", status: "completed", date: "5 hours ago" },
  { id: "PAY-003", user: "mike@startup.co", amount: "$9.99", plan: "Pro Monthly", status: "pending", date: "1 day ago" },
  { id: "PAY-004", user: "lisa@design.co", amount: "$49.99", plan: "Lifetime", status: "completed", date: "1 day ago" },
  { id: "PAY-005", user: "alex@dev.io", amount: "$9.99", plan: "Pro Monthly", status: "failed", date: "2 days ago" },
];

const recentPrompts = [
  { id: "1", title: "Cinematic Hero", category: "Hero Section", downloads: 3450, status: "published" },
  { id: "2", title: "Neon SaaS Landing", category: "SaaS", downloads: 1890, status: "published" },
  { id: "3", title: "Dashboard Pro V2", category: "Dashboard", downloads: 4210, status: "draft" },
  { id: "4", title: "E-Commerce Checkout", category: "E-Commerce", downloads: 2890, status: "published" },
  { id: "5", title: "Blog Modern", category: "Blog", downloads: 1340, status: "published" },
];

const chartData = [
  { month: "Jan", revenue: 4200, users: 180 },
  { month: "Feb", revenue: 5100, users: 220 },
  { month: "Mar", revenue: 4800, users: 195 },
  { month: "Apr", revenue: 6200, users: 280 },
  { month: "May", revenue: 7800, users: 340 },
  { month: "Jun", revenue: 8400, users: 380 },
  { month: "Jul", revenue: 9200, users: 420 },
  { month: "Aug", revenue: 10100, users: 460 },
  { month: "Sep", revenue: 11500, users: 510 },
  { month: "Oct", revenue: 10800, users: 490 },
  { month: "Nov", revenue: 12200, users: 540 },
  { month: "Dec", revenue: 12426, users: 580 },
];

export default function AdminDashboard() {
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="space-y-8 animate-in">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Overview</h2>
        <p className="text-sm text-[#57534E] mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === "positive" ? "badge-success" : "badge-danger"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-[#1C1917]">{stat.value}</div>
            <div className="text-sm text-[#A8A29E] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#1C1917]">Revenue</h3>
              <p className="text-sm text-[#A8A29E]">Monthly revenue for 2026</p>
            </div>
            <select className="input w-auto text-sm py-1.5">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2">
            {chartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500/80 rounded-t-md transition-all hover:bg-blue-600 cursor-pointer relative group"
                  style={{ height: `${(d.revenue / maxRevenue) * 200}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C1917] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${d.revenue.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-[#A8A29E]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#1C1917]">User Growth</h3>
              <p className="text-sm text-[#A8A29E]">New users per month</p>
            </div>
            <select className="input w-auto text-sm py-1.5">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2">
            {chartData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-emerald-500/80 rounded-t-md transition-all hover:bg-emerald-600 cursor-pointer relative group"
                  style={{ height: `${(d.users / 580) * 200}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C1917] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.users} users
                  </div>
                </div>
                <span className="text-xs text-[#A8A29E]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-[#E7E5E4]">
            <div>
              <h3 className="font-semibold text-[#1C1917]">Recent Payments</h3>
              <p className="text-sm text-[#A8A29E]">Latest transactions</p>
            </div>
            <Link href="/admin/payments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <div className="text-sm font-medium text-[#1C1917]">{payment.user}</div>
                      <div className="text-xs text-[#A8A29E]">{payment.plan}</div>
                    </td>
                    <td className="font-medium">{payment.amount}</td>
                    <td>
                      <span className={`badge ${
                        payment.status === "completed" ? "badge-success" :
                        payment.status === "pending" ? "badge-warning" :
                        "badge-danger"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="text-[#A8A29E] text-sm">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Prompts */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-[#E7E5E4]">
            <div>
              <h3 className="font-semibold text-[#1C1917]">Popular Prompts</h3>
              <p className="text-sm text-[#A8A29E]">Most downloaded this month</p>
            </div>
            <Link href="/admin/prompts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Prompt</th>
                  <th>Downloads</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPrompts.map((prompt) => (
                  <tr key={prompt.id}>
                    <td>
                      <div className="text-sm font-medium text-[#1C1917]">{prompt.title}</div>
                      <div className="text-xs text-[#A8A29E]">{prompt.category}</div>
                    </td>
                    <td className="font-medium">{prompt.downloads.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        prompt.status === "published" ? "badge-success" : "badge-warning"
                      }`}>
                        {prompt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-semibold text-[#1C1917] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/prompts?new=true" className="flex items-center gap-3 p-4 rounded-lg border border-[#E7E5E4] hover:border-blue-300 hover:bg-blue-50/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#1C1917]">Add Prompt</div>
              <div className="text-xs text-[#A8A29E]">Create new prompt</div>
            </div>
          </Link>

          <Link href="/admin/payments" className="flex items-center gap-3 p-4 rounded-lg border border-[#E7E5E4] hover:border-emerald-300 hover:bg-emerald-50/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#1C1917]">View Payments</div>
              <div className="text-xs text-[#A8A29E]">Manage transactions</div>
            </div>
          </Link>

          <Link href="/admin/users" className="flex items-center gap-3 p-4 rounded-lg border border-[#E7E5E4] hover:border-violet-300 hover:bg-violet-50/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#1C1917]">Manage Users</div>
              <div className="text-xs text-[#A8A29E]">User accounts</div>
            </div>
          </Link>

          <Link href="/admin/settings" className="flex items-center gap-3 p-4 rounded-lg border border-[#E7E5E4] hover:border-amber-300 hover:bg-amber-50/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#1C1917]">Settings</div>
              <div className="text-xs text-[#A8A29E]">Site configuration</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
