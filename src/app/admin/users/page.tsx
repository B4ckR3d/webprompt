"use client";

import { useState } from "react";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", plan: "Pro", status: "active", joined: "2026-01-15", downloads: 145 },
  { id: "2", name: "Sarah Chen", email: "sarah@company.io", plan: "Lifetime", status: "active", joined: "2026-02-20", downloads: 312 },
  { id: "3", name: "Mike Johnson", email: "mike@startup.co", plan: "Free", status: "active", joined: "2026-03-10", downloads: 28 },
  { id: "4", name: "Lisa Park", email: "lisa@design.co", plan: "Lifetime", status: "active", joined: "2026-04-05", downloads: 267 },
  { id: "5", name: "Alex Rivera", email: "alex@dev.io", plan: "Pro", status: "inactive", joined: "2026-04-18", downloads: 89 },
  { id: "6", name: "Emma Wilson", email: "emma@creative.co", plan: "Free", status: "active", joined: "2026-05-02", downloads: 15 },
  { id: "7", name: "David Kim", email: "david@tech.io", plan: "Pro", status: "active", joined: "2026-05-15", downloads: 198 },
  { id: "8", name: "Rachel Green", email: "rachel@agency.com", plan: "Lifetime", status: "active", joined: "2026-05-28", downloads: 421 },
  { id: "9", name: "Tom Baker", email: "tom@freelance.co", plan: "Free", status: "active", joined: "2026-06-01", downloads: 42 },
  { id: "10", name: "Nina Patel", email: "nina@studio.io", plan: "Pro", status: "active", joined: "2026-06-10", downloads: 156 },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "all" || u.plan.toLowerCase() === filterPlan;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Users</h2>
        <p className="text-sm text-[#57534E] mt-1">Manage user accounts and subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-[#1C1917]">{mockUsers.length}</div>
          <div className="text-xs text-[#A8A29E]">Total Users</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-emerald-600">{mockUsers.filter(u => u.plan === "Lifetime").length}</div>
          <div className="text-xs text-[#A8A29E]">Lifetime</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-blue-600">{mockUsers.filter(u => u.plan === "Pro").length}</div>
          <div className="text-xs text-[#A8A29E]">Pro</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-[#57534E]">{mockUsers.filter(u => u.plan === "Free").length}</div>
          <div className="text-xs text-[#A8A29E]">Free</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <select 
            value={filterPlan} 
            onChange={(e) => setFilterPlan(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Downloads</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E7E5E4] flex items-center justify-center text-sm font-medium text-[#57534E]">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1C1917]">{user.name}</div>
                      <div className="text-xs text-[#A8A29E]">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${
                    user.plan === "Lifetime" ? "badge-warning" :
                    user.plan === "Pro" ? "badge-success" :
                    "badge"
                  }`} style={user.plan === "Free" ? {background: "#F5F5F4", color: "#57534E"} : {}}>
                    {user.plan}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.status === "active" ? "badge-success" : "badge-danger"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="font-medium">{user.downloads}</td>
                <td className="text-sm text-[#A8A29E]">{user.joined}</td>
                <td>
                  <button className="p-1.5 rounded-md hover:bg-[#F5F5F4] transition-colors text-[#57534E]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#A8A29E]">
          Showing {filtered.length} of {mockUsers.length} users
        </p>
        <div className="flex items-center gap-2">
          <button className="btn-secondary py-1.5 px-3 text-sm">Previous</button>
          <button className="btn-primary py-1.5 px-3 text-sm">1</button>
          <button className="btn-secondary py-1.5 px-3 text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
