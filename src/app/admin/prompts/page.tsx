"use client";

import { useState } from "react";

const mockPrompts = [
  { id: "1", title: "Cinematic Hero", category: "Hero Section", type: "premium", downloads: 3450, rating: 4.9, status: "published", created: "2026-06-20" },
  { id: "2", title: "Neon SaaS Landing", category: "SaaS", type: "premium", downloads: 1890, rating: 4.7, status: "published", created: "2026-06-18" },
  { id: "3", title: "Dashboard Pro V2", category: "Dashboard", type: "premium", downloads: 4210, rating: 4.9, status: "draft", created: "2026-06-15" },
  { id: "4", title: "Cubekit Hero", category: "Hero Section", type: "free", downloads: 2340, rating: 4.8, status: "published", created: "2026-06-12" },
  { id: "5", title: "Aurora Landing", category: "Landing Page", type: "free", downloads: 3120, rating: 4.9, status: "published", created: "2026-06-10" },
  { id: "6", title: "E-Commerce Checkout", category: "E-Commerce", type: "premium", downloads: 2890, rating: 4.7, status: "published", created: "2026-06-08" },
  { id: "7", title: "Blog Modern", category: "Blog", type: "free", downloads: 1340, rating: 4.4, status: "published", created: "2026-06-05" },
  { id: "8", title: "Particle Background", category: "Animation", type: "premium", downloads: 3450, rating: 4.8, status: "published", created: "2026-06-03" },
  { id: "9", title: "Minimal Portfolio", category: "Portfolio", type: "free", downloads: 2780, rating: 4.6, status: "published", created: "2026-06-01" },
  { id: "10", title: "Pricing Table", category: "Pricing", type: "free", downloads: 2100, rating: 4.6, status: "published", created: "2026-05-28" },
  { id: "11", title: "Contact Form", category: "Component", type: "free", downloads: 1120, rating: 4.3, status: "published", created: "2026-05-25" },
  { id: "12", title: "3D Hero Section", category: "Hero Section", type: "premium", downloads: 2890, rating: 4.8, status: "published", created: "2026-05-22" },
];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof mockPrompts[0] | null>(null);

  const filtered = mockPrompts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                        p.category.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || p.type === filterType;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1917]">Prompts</h2>
          <p className="text-sm text-[#57534E] mt-1">Manage all your AI prompts</p>
        </div>
        <button 
          onClick={() => { setSelectedPrompt(null); setShowModal(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Prompt
        </button>
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
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Types</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Prompt</th>
              <th>Category</th>
              <th>Type</th>
              <th>Downloads</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prompt) => (
              <tr key={prompt.id}>
                <td>
                  <div className="font-medium text-[#1C1917]">{prompt.title}</div>
                </td>
                <td>
                  <span className="text-sm text-[#57534E]">{prompt.category}</span>
                </td>
                <td>
                  <span className={`badge ${prompt.type === "free" ? "badge-success" : "badge-warning"}`}>
                    {prompt.type}
                  </span>
                </td>
                <td className="font-medium">{prompt.downloads.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-sm">{prompt.rating}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${prompt.status === "published" ? "badge-success" : "badge-warning"}`}>
                    {prompt.status}
                  </span>
                </td>
                <td className="text-sm text-[#A8A29E]">{prompt.created}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setSelectedPrompt(prompt); setShowModal(true); }}
                      className="p-1.5 rounded-md hover:bg-[#F5F5F4] transition-colors text-[#57534E]"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-[#A8A29E] hover:text-red-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#A8A29E]">
          Showing {filtered.length} of {mockPrompts.length} prompts
        </p>
        <div className="flex items-center gap-2">
          <button className="btn-secondary py-1.5 px-3 text-sm">Previous</button>
          <button className="btn-primary py-1.5 px-3 text-sm">1</button>
          <button className="btn-secondary py-1.5 px-3 text-sm">2</button>
          <button className="btn-secondary py-1.5 px-3 text-sm">3</button>
          <button className="btn-secondary py-1.5 px-3 text-sm">Next</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#E7E5E4]">
              <h3 className="text-lg font-semibold text-[#1C1917]">
                {selectedPrompt ? "Edit Prompt" : "Add New Prompt"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-[#F5F5F4]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#57534E] mb-1.5">Title</label>
                <input type="text" defaultValue={selectedPrompt?.title || ""} className="input" placeholder="Enter prompt title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#57534E] mb-1.5">Category</label>
                  <select defaultValue={selectedPrompt?.category || ""} className="input">
                    <option value="">Select category</option>
                    <option>Hero Section</option>
                    <option>Landing Page</option>
                    <option>SaaS</option>
                    <option>Dashboard</option>
                    <option>Portfolio</option>
                    <option>E-Commerce</option>
                    <option>Blog</option>
                    <option>Component</option>
                    <option>Animation</option>
                    <option>Pricing</option>
                    <option>Testimonial</option>
                    <option>FAQ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#57534E] mb-1.5">Type</label>
                  <select defaultValue={selectedPrompt?.type || "free"} className="input">
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534E] mb-1.5">Description</label>
                <textarea defaultValue="" className="input h-20 resize-none" placeholder="Enter prompt description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534E] mb-1.5">Prompt Content</label>
                <textarea defaultValue="" className="input h-40 resize-none font-mono text-sm" placeholder="Enter the full prompt text..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534E] mb-1.5">Tags</label>
                <input type="text" defaultValue="" className="input" placeholder="Enter tags separated by commas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534E] mb-1.5">Status</label>
                <select defaultValue={selectedPrompt?.status || "draft"} className="input">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E7E5E4]">
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={() => setShowModal(false)} className="btn-primary">
                {selectedPrompt ? "Save Changes" : "Create Prompt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
