import React, { useState } from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { AIProvider } from './context/AIContext';
import { Navbar } from './components/common/Navbar';
import { LeftSidebar } from './components/common/LeftSidebar';
import { RightAISidebar } from './components/ai/RightAISidebar';
import { WarmHeroWorkspace } from './components/hero/WarmHeroWorkspace';
import { ExploreCategoriesSection } from './components/category/ExploreCategoriesSection';
import { MarketPulseSection } from './components/home/MarketPulseSection';
import { ListingCard } from './components/listing/ListingCard';
import { ListingDetailModal } from './components/listing/ListingDetailModal';
import { AIListingGeneratorModal } from './components/listing/AIListingGeneratorModal';
import { VoiceSearchModal } from './components/ai/VoiceSearchModal';
import { ImageSearchModal } from './components/ai/ImageSearchModal';
import { AIComparisonModal } from './components/ai/AIComparisonModal';
import { AINegotiatorModal } from './components/ai/AINegotiatorModal';
import { AIContractGeneratorModal } from './components/ai/AIContractGeneratorModal';
import { AIResumeInterviewModal } from './components/ai/AIResumeInterviewModal';
import { AIWorkspacePanel } from './components/ai/AIWorkspacePanel';
import { RaycastCommandPaletteModal } from './components/ai/RaycastCommandPaletteModal';
import { BusinessDashboard } from './components/dashboard/BusinessDashboard';
import { AdminPanel } from './components/dashboard/AdminPanel';
import { BuyerOrdersView } from './components/dashboard/BuyerOrdersView';
import { NotificationToast } from './components/common/NotificationToast';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Dedicated Page Views
import { CategoriesPageView } from './components/pages/CategoriesPageView';
import { HotDealsPageView } from './components/pages/HotDealsPageView';
import { HowItWorksPageView } from './components/pages/HowItWorksPageView';
import { AuthPageView } from './components/pages/AuthPageView';

import { ArrowRight } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { listings, userRole, isWorkspaceOpen, setIsWorkspaceOpen } = useMarketplace();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activePage, setActivePage] = useState<'marketplace' | 'categories' | 'deals' | 'how-it-works' | 'auth'>('marketplace');

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4F0] text-[#1F1F1F] font-sans antialiased selection:bg-[#B8860B] selection:text-white pb-16 lg:pb-0">
      
      {/* WARM LUXURY NAVBAR */}
      <Navbar 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} 
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* NOTIFICATION TOAST */}
      <NotificationToast />

      {/* RENDER STANDALONE LOGIN PAGE OR 3-COLUMN MAIN LAYOUT */}
      {activePage === 'auth' ? (
        <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
          <AuthPageView onSuccess={() => setActivePage('marketplace')} />
        </div>
      ) : (
        <div className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex gap-6">
          
          {/* LEFT NAVIGATION SIDEBAR */}
          <LeftSidebar onNavigateToAuth={() => setActivePage('auth')} />

          {/* CENTER MAIN CONTENT COLUMN — MULTI-PAGE ROUTER */}
          <main className="flex-1 min-w-0 py-6 space-y-8">
            
            {/* DASHBOARDS FOR SELLER / BUSINESS / ADMIN */}
            {userRole === 'business' && <BusinessDashboard />}
            {userRole === 'admin' && <AdminPanel />}
            {userRole === 'seller' && <BusinessDashboard />}

            {/* BUYER / DYNAMIC PAGE VIEWS */}
            {userRole === 'buyer' && (
              <>
                {activePage === 'marketplace' && (
                  <>
                    <WarmHeroWorkspace />
                    <ExploreCategoriesSection />
                    <MarketPulseSection />

                    {/* HOT DEALS NEAR YOU GRID */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display font-extrabold text-base text-[#1F1F1F]">
                          Hot Deals Near You
                        </h2>
                        <button onClick={() => setActivePage('deals')} className="text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 cursor-pointer">
                          <span>View all deals</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {listings.map(item => (
                          <ListingCard key={item.id} listing={item} />
                        ))}
                      </div>
                    </div>

                    <BuyerOrdersView />
                  </>
                )}

                {activePage === 'categories' && <CategoriesPageView />}
                {activePage === 'deals' && <HotDealsPageView />}
                {activePage === 'how-it-works' && <HowItWorksPageView />}
              </>
            )}

          </main>

          {/* RIGHT AI ASSISTANT SIDEBAR */}
          <RightAISidebar />

        </div>
      )}

      {/* FOOTER */}
      <Footer />

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* RIGHT SIDE COLLAPSIBLE AI WORKSPACE PANEL */}
      <AIWorkspacePanel 
        isOpen={isWorkspaceOpen} 
        onClose={() => setIsWorkspaceOpen(false)} 
      />

      {/* RAYCAST ⌘K COMMAND PALETTE MODAL */}
      <RaycastCommandPaletteModal 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* MODALS */}
      <ListingDetailModal />
      <AIListingGeneratorModal />
      <VoiceSearchModal />
      <ImageSearchModal />
      <AIComparisonModal />
      <AINegotiatorModal />
      <AIContractGeneratorModal />
      <AIResumeInterviewModal />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MarketplaceProvider>
      <AIProvider>
        <MainAppContent />
      </AIProvider>
    </MarketplaceProvider>
  );
};
