"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1C1917]">Settings</h2>
        <p className="text-sm text-[#57534E] mt-1">Manage your website configuration</p>
      </div>

      {/* General Settings */}
      <div className="card">
        <div className="p-6 border-b border-[#E7E5E4]">
          <h3 className="font-semibold text-[#1C1917]">General</h3>
          <p className="text-sm text-[#A8A29E]">Basic website settings</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Site Name</label>
            <input type="text" defaultValue="PromptVault" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Tagline</label>
            <input type="text" defaultValue="Premium AI Prompts for Web Design" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Description</label>
            <textarea defaultValue="Discover 80+ production-ready AI prompts for stunning landing pages, hero sections, and UI components." className="input h-20 resize-none" />
          </div>
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="card">
        <div className="p-6 border-b border-[#E7E5E4]">
          <h3 className="font-semibold text-[#1C1917]">Pricing (IDR)</h3>
          <p className="text-sm text-[#A8A29E]">Configure subscription plans in Rupiah</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#E7E5E4] rounded-lg p-4">
              <h4 className="font-medium text-[#1C1917] mb-3">Pro Monthly</h4>
              <div>
                <label className="block text-xs text-[#A8A29E] mb-1">Price (IDR)</label>
                <input type="text" defaultValue="149000" className="input text-sm" />
              </div>
            </div>
            <div className="border border-[#E7E5E4] rounded-lg p-4">
              <h4 className="font-medium text-[#1C1917] mb-3">Pro Yearly</h4>
              <div>
                <label className="block text-xs text-[#A8A29E] mb-1">Price (IDR)</label>
                <input type="text" defaultValue="1499000" className="input text-sm" />
              </div>
            </div>
            <div className="border border-[#E7E5E4] rounded-lg p-4">
              <h4 className="font-medium text-[#1C1917] mb-3">Lifetime</h4>
              <div>
                <label className="block text-xs text-[#A8A29E] mb-1">Price (IDR)</label>
                <input type="text" defaultValue="749000" className="input text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Midtrans Settings */}
      <div className="card">
        <div className="p-6 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-[#1C1917]">Midtrans Payment Gateway</h3>
            <span className="badge badge-success">Active</span>
          </div>
          <p className="text-sm text-[#A8A29E]">Configure Midtrans Snap integration</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Get your keys from <a href="https://dashboard.midtrans.com" target="_blank" rel="noopener" className="font-medium underline">dashboard.midtrans.com</a>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Server Key</label>
            <input type="password" defaultValue="SB-Mid-server-..." className="input font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Client Key</label>
            <input type="text" defaultValue="SB-Mid-client-..." className="input font-mono text-sm" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="production" className="w-4 h-4 rounded border-[#E7E5E4]" />
            <label htmlFor="production" className="text-sm text-[#57534E]">
              Enable production mode (uncheck for sandbox/testing)
            </label>
          </div>

          <div className="border-t border-[#E7E5E4] pt-4 mt-4">
            <h4 className="text-sm font-medium text-[#1C1917] mb-3">Accepted Payment Methods</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Credit Card", icon: "💳", enabled: true },
                { name: "Bank Transfer", icon: "🏦", enabled: true },
                { name: "GoPay", icon: "📱", enabled: true },
                { name: "OVO", icon: "📱", enabled: true },
                { name: "DANA", icon: "📱", enabled: true },
                { name: "ShopeePay", icon: "📱", enabled: true },
                { name: "Alfamart", icon: "🏪", enabled: true },
                { name: "Indomaret", icon: "🏪", enabled: true },
              ].map((method) => (
                <div key={method.name} className="flex items-center gap-2 p-2 rounded border border-[#E7E5E4]">
                  <input type="checkbox" defaultChecked={method.enabled} className="w-3.5 h-3.5 rounded" />
                  <span className="text-sm">{method.icon}</span>
                  <span className="text-xs text-[#57534E]">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="card">
        <div className="p-6 border-b border-[#E7E5E4]">
          <h3 className="font-semibold text-[#1C1917]">Email</h3>
          <p className="text-sm text-[#A8A29E]">Configure email notifications</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">From Email</label>
            <input type="email" defaultValue="noreply@promptvault.com" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Support Email</label>
            <input type="email" defaultValue="support@promptvault.com" className="input" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#1C1917]">Welcome Email</div>
                <div className="text-xs text-[#A8A29E]">Send email on new user registration</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#1C1917]">Payment Confirmation</div>
                <div className="text-xs text-[#A8A29E]">Send email after successful payment</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        <button className="btn-secondary">Cancel</button>
        <button onClick={handleSave} className="btn-primary">
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
