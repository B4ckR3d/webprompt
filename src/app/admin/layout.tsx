"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#E7E5E4] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[#1C1917]">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-[#F5F5F4] transition-colors relative">
                <svg className="w-5 h-5 text-[#57534E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
                <div className="text-sm">
                  <div className="font-medium text-[#1C1917]">Admin</div>
                  <div className="text-xs text-[#A8A29E]">admin@promptvault.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
