"use client";

import { useState } from "react";

const mockPayments = [
  { id: "PAY-001", user: "john@example.com", amount: 9.99, plan: "Pro Monthly", method: "Credit Card", status: "completed", date: "2026-06-24 14:30" },
  { id: "PAY-002", user: "sarah@company.io", amount: 49.99, plan: "Lifetime", method: "PayPal", status: "completed", date: "2026-06-24 11:15" },
  { id: "PAY-003", user: "mike@startup.co", amount: 9.99, plan: "Pro Monthly", method: "Credit Card", status: "pending", date: "2026-06-23 18:45" },
  { id: "PAY-004", user: "lisa@design.co", amount: 49.99, plan: "Lifetime", method: "Credit Card", status: "completed", date: "2026-06-23 09:20" },
  { id: "PAY-005", user: "alex@dev.io", amount: 9.99, plan: "Pro Monthly", method: "Credit Card", status: "failed", date: "2026-06-22 16:30" },
  { id: "PAY-006", user: "emma@creative.co", amount: 49.99, plan: "Lifetime", method: "PayPal", status: "completed", date: "2026-06-22 12:00" },
  { id: "PAY-007", user: "david@tech.io", amount: 9.99, plan: "Pro Monthly", method: "Credit Card", status: "completed", date: "2026-06-21 20:15" },
  { id: "PAY-008", user: "rachel@agency.com", amount: 49.99, plan: "Lifetime", method: "Credit Card", status: "refunded", date: "2026-06-21 08:45" },
  { id: "PAY-009", user: "tom@freelance.co", amount: 9.99, plan: "Pro Monthly", method: "PayPal", status: "completed", date: "2026-06-20 15:30" },
  { id: "PAY-010", user: "nina@studio.io", amount: 49.99, plan: "Lifetime", method: "Credit Card", status: "completed", date: "2026-06-20 10:00" },
];

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = mockPayments.filter((p) => {
    const matchSearch = p.user.toLowerCase().includes(search.toLowerCase()) || 
                        p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: "💰" },
    { label: "Completed", value: mockPayments.filter(p => p.status === "completed").length.toString(), icon: "✅" },
    { label: "Pending", value: mockPayments.filter(p => p.status === "pending").length.toString(), icon: "⏳" },
    { label: "Failed", value: mockPayments.filter(p => p.status === "failed").length.toString(), icon: "❌" },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Payments</h2>
        <p className="text-sm text-[#57534E] mt-1">Track and manage all transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <div className="text-lg font-bold text-[#1C1917]">{stat.value}</div>
                <div className="text-xs text-[#A8A29E]">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
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
                placeholder="Search by email or payment ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Plan</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => (
              <tr key={payment.id}>
                <td className="font-mono text-sm font-medium">{payment.id}</td>
                <td>
                  <div className="text-sm font-medium text-[#1C1917]">{payment.user}</div>
                </td>
                <td className="font-medium">${payment.amount.toFixed(2)}</td>
                <td>
                  <span className={`badge ${payment.plan === "Lifetime" ? "badge-warning" : "badge-success"}`}>
                    {payment.plan}
                  </span>
                </td>
                <td className="text-sm text-[#57534E]">{payment.method}</td>
                <td>
                  <span className={`badge ${
                    payment.status === "completed" ? "badge-success" :
                    payment.status === "pending" ? "badge-warning" :
                    payment.status === "refunded" ? "badge-warning" :
                    "badge-danger"
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="text-sm text-[#A8A29E]">{payment.date}</td>
                <td>
                  <button className="p-1.5 rounded-md hover:bg-[#F5F5F4] transition-colors text-[#57534E]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
          Showing {filtered.length} of {mockPayments.length} payments
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
