import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DesktopSidebar } from './components/DesktopSidebar';
import { CrisisSupportBar } from './components/CrisisSupportBar';
import { CrisisModal } from './components/CrisisModal';
import { Toast } from './components/Toast';
import { BoxBreathingModal } from './components/BoxBreathingModal';
import { ExamResetModal } from './components/ExamResetModal';
import { PhysicalResetModal } from './components/PhysicalResetModal';
import { SomaticTapModal } from './components/SomaticTapModal';

import { HomeView } from './views/HomeView';
import { JournalView } from './views/JournalView';
import { InsightsView } from './views/InsightsView';
import { ToolboxView } from './views/ToolboxView';

const MainLayout: React.FC = () => {
  const { activeTab, isLoading, errorMessage, clearError } = useApp();

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0d1622] text-[#0b1c30] dark:text-[#f8f9ff] font-body flex flex-col transition-colors duration-300">
      <Header />
      <DesktopSidebar />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1040px] mx-auto px-4 md:px-8 md:pl-72 pt-[72px] pb-24 md:pb-12">
        {/* Error Alert Banner if any */}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-[#ffdad6] text-[#93000a] flex justify-between items-center text-sm font-semibold shadow-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={clearError}
              className="px-3 py-1 rounded-full bg-[#ba1a1a] text-white text-xs hover:bg-[#93000a]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
            <div className="w-12 h-12 border-4 border-[#5950b6] border-t-transparent rounded-full animate-spin" />
            <p className="font-display font-semibold text-sm text-[#5950b6] dark:text-[#9d94ff]">
              Initializing StudentCare Offline DB...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'journal' && <JournalView />}
            {activeTab === 'insights' && <InsightsView />}
            {activeTab === 'toolbox' && <ToolboxView />}
          </>
        )}
      </main>

      {/* Floating Crisis Support Widget */}
      <CrisisSupportBar />

      {/* Mobile Navigation */}
      <BottomNav />

      {/* Modals & Banners */}
      <CrisisModal />
      <BoxBreathingModal />
      <ExamResetModal />
      <PhysicalResetModal />
      <SomaticTapModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
