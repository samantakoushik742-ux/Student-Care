import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'journal', label: 'Journal', icon: 'edit_note' },
    { id: 'insights', label: 'Insights', icon: 'analytics' },
    { id: 'toolbox', label: 'Toolbox', icon: 'handyman' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-5 bg-[#f8f9ff]/85 dark:bg-[#0d1622]/90 shadow-[0_-4px_20px_0_rgba(89,80,182,0.15)] rounded-t-2xl backdrop-blur-xl md:hidden border-t border-[#c8c4d4]/20">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-4 py-1 rounded-full ${
              isActive
                ? 'bg-[#caecbf] dark:bg-[#324e2d] text-[#4f6c48] dark:text-[#caecbf] font-bold shadow-xs'
                : 'text-[#474552] dark:text-[#a0aec0] hover:bg-[#caecbf]/20'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px] mb-0.5"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="text-[12px] leading-tight font-semibold tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
