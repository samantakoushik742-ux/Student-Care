import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const DesktopSidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'journal', label: 'Journal', icon: 'edit_note' },
    { id: 'insights', label: 'Insights', icon: 'analytics' },
    { id: 'toolbox', label: 'Toolbox', icon: 'handyman' },
  ];

  return (
    <aside className="hidden md:flex fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-[#f8f9ff] dark:bg-[#0d1622] flex-col gap-2 p-6 border-r border-[#c8c4d4]/20 z-40 shadow-xs">
      <div className="text-xs font-bold uppercase tracking-wider text-[#474552] dark:text-[#a0aec0] px-4 mb-2">
        Navigation
      </div>
      {navs.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-display font-semibold transition-all ${
              isActive
                ? 'bg-[#caecbf] dark:bg-[#324e2d] text-[#4f6c48] dark:text-[#caecbf] shadow-xs'
                : 'text-[#474552] dark:text-[#a0aec0] hover:bg-[#e5eeff] dark:hover:bg-[#1f2e42] hover:text-[#0b1c30] dark:hover:text-[#ffffff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}

      <div className="mt-auto p-4 rounded-2xl bg-[#eff4ff] dark:bg-[#192738] border border-[#d3e4fe]/40 dark:border-[#2e445e]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#5950b6] dark:text-[#9d94ff] mb-1">
          <span className="material-symbols-outlined text-sm">offline_pin</span>
          <span>Offline DB Active</span>
        </div>
        <p className="text-xs text-[#474552] dark:text-[#a0aec0]">
          Your thoughts & mood logs are saved safely on your device.
        </p>
      </div>
    </aside>
  );
};
