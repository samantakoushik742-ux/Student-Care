import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode, userProfile } = useApp();

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'journal', label: 'Journal' },
    { id: 'insights', label: 'Insights' },
    { id: 'toolbox', label: 'Toolbox' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#f8f9ff]/80 dark:bg-[#0d1622]/80 shadow-xs border-b border-[#c8c4d4]/20 transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-6 py-3 w-full max-w-[1040px] mx-auto h-[64px]">
        {/* User Profile / Logo Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e5eeff] dark:bg-[#1f2e42] flex-shrink-0 cursor-pointer active:scale-95 transition-transform flex items-center justify-center border border-[#d3e4fe]/50 shadow-xs">
            {userProfile.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}
            <span className="font-bold text-[#5950b6] dark:text-[#9d94ff] text-base">
              {userProfile.name.charAt(0)}
            </span>
          </div>
          <span className="font-display font-bold text-xl md:text-2xl text-[#5950b6] dark:text-[#9d94ff] tracking-tight">
            StudentCare
          </span>
        </div>

        {/* Desktop Web Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors font-semibold text-sm font-body ${
                  isActive
                    ? 'text-[#5950b6] dark:text-[#9d94ff] bg-[#e5eeff] dark:bg-[#213145] font-bold'
                    : 'text-[#474552] dark:text-[#a0aec0] hover:bg-[#d3e4fe]/40 dark:hover:bg-[#1a293b]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="w-10 h-10 flex items-center justify-center rounded-full text-[#5950b6] dark:text-[#9d94ff] hover:bg-[#d3e4fe]/50 dark:hover:bg-[#1f2e42] transition-colors active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined text-[24px]">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </header>
  );
};
