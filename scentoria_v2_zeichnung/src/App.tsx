import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  Compass,
  FolderHeart,
  User as UserIcon,
  Sparkles,
  HelpCircle,
  X,
  Mail,
  Phone,
  BookmarkCheck,
  CheckCircle,
  Heart
} from "lucide-react";

// Page modules
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { Finder } from "./pages/Finder";
import { Recommendation } from "./pages/Recommendation";
import { Collection } from "./pages/Collection";
import { Profile } from "./pages/Profile";

// Utils and data
import { Fragrance, getAllFragrances, getRecommendation } from "./utils/recommendation";

type TabState = "home" | "discover" | "collection" | "profile";
type ViewMode = "main" | "finder" | "recommendation" | "detail";

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<TabState>("home");
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [finderStepIndex, setFinderStepIndex] = useState<number>(0);

  // Favorites state: Seeded with exactly 4 fragrances by default to match Profile Stats ("4 Favoriten")
  const [favorites, setFavorites] = useState<string[]>([
    "bleu-horizon",
    "velvet-noir",
    "lumiere",
    "citrus-breeze",
  ]);

  // Selected Recommendation Objects
  const [recommendationResult, setRecommendationResult] = useState<{
    primary: Fragrance;
    alternatives: Fragrance[];
  } | null>(null);

  // Selected browse scent details objects
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  // General App modular overlays
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  const allFragrances = getAllFragrances();

  // Handle favorite toggles with success toast feedback
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const scent = allFragrances.find((f) => f.id === id);
      if (exists) {
        triggerToast(`Aus Favoriten entfernt: ${scent?.name || ""}`);
        return prev.filter((item) => item !== id);
      } else {
        triggerToast(`Zu Favoriten hinzugefügt: ${scent?.name || ""}`);
        return [...prev, id];
      }
    });
  };

  const triggerToast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => {
      setShowSuccessToast(null);
    }, 2500);
  };

  // Fast shortcut to trigger "Duft des Tages" directly (pre-sets a beautiful classic combination: Selbstbewusst, Sonnig, Date match)
  const handleOpenDuftDesTages = () => {
    const { primary, alternatives } = getRecommendation(80, "Sonnig", "Date"); // Matches Lumière perfectly!
    setRecommendationResult({ primary, alternatives });
    setViewMode("recommendation");
  };

  // Launch finder Flow focused on a specific step index
  const handleStartFinder = (preselectStep?: number) => {
    setFinderStepIndex(preselectStep !== undefined ? preselectStep : 0);
    setViewMode("finder");
  };

  // Receive computed results from situation selector 
  const handleFinishFinder = (
    primary: Fragrance,
    alternatives: Fragrance[],
    selectedData: { mood: number; weather: string; occasion: string }
  ) => {
    setRecommendationResult({ primary, alternatives });
    setViewMode("recommendation");
    triggerToast(`Dankeschön! Empfehlung errechnet.`);
  };

  // Detail browser selection from Collection or Discover
  const handleSelectFragrance = (frag: Fragrance) => {
    setSelectedFragrance(frag);
    setViewMode("detail");
  };

  // Render direct View based on active state configuration
  const renderViewContent = () => {
    if (viewMode === "finder") {
      return (
        <Finder
          initialStepIndex={finderStepIndex}
          onBack={() => setViewMode("main")}
          onFinishFinder={handleFinishFinder}
        />
      );
    }

    if (viewMode === "recommendation" && recommendationResult) {
      return (
        <Recommendation
          primary={recommendationResult.primary}
          alternatives={recommendationResult.alternatives}
          favorites={favorites}
          onBack={() => setViewMode("main")}
          onRestartFinder={() => setViewMode("finder")}
          onToggleFavorite={handleToggleFavorite}
          onSelectFragrance={handleSelectFragrance}
        />
      );
    }

    if (viewMode === "detail" && selectedFragrance) {
      // In Scent detail view, the layout mimics recommendation display without alternatives list or with direct back arrow
      return (
        <Recommendation
          primary={selectedFragrance}
          alternatives={allFragrances
            .filter((x) => x.id !== selectedFragrance.id)
            .slice(0, 2)}
          favorites={favorites}
          onBack={() => setViewMode("main")}
          onRestartFinder={() => setViewMode("finder")}
          onToggleFavorite={handleToggleFavorite}
          onSelectFragrance={handleSelectFragrance}
        />
      );
    }

    // Default Tab states
    switch (activeTab) {
      case "discover":
        return (
          <Discover
            onStartFinder={handleStartFinder}
            onOpenDuftDesTages={handleOpenDuftDesTages}
            onSelectFragrance={handleSelectFragrance}
          />
        );
      case "collection":
        return (
          <Collection
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectFragrance={handleSelectFragrance}
          />
        );
      case "profile":
        return (
          <Profile
            favorites={favorites}
            onSelectFragrance={handleSelectFragrance}
          />
        );
      case "home":
      default:
        return (
          <Home
            onStartFinder={() => handleStartFinder()}
            gotoTab={(tab) => {
              setActiveTab(tab);
              setViewMode("main");
            }}
            onOpenDuftDesTages={handleOpenDuftDesTages}
            favoritesCount={favorites.length}
            onOpenSupport={() => setShowSupportModal(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] bg-radial from-[#fdfcf9] to-[#ebdcc9] py-0 md:py-8 flex flex-col justify-center items-center font-sans select-none overflow-x-hidden relative">
      {/* Decorative desktop elements shown around the device framework */}
      <div className="hidden lg:block absolute top-10 left-10 pointer-events-none text-stone-300">
        <span className="font-serif italic text-7xl opacity-15 select-none block">Scentoria</span>
        <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-royal-blue/30 uppercase block mt-1">L'atelier de l'art olfactif</span>
      </div>
      <div className="hidden lg:block absolute bottom-10 right-10 pointer-events-none text-right text-stone-300">
        <span className="text-[10px] tracking-[0.15em] font-sans font-semibold text-amber-800/40 uppercase block mb-1">Couture Perfume Advisor</span>
        <span className="font-serif italic text-sm text-royal-blue/30 select-none block">Paris · Zurich · Monaco</span>
      </div>

      {/* PHONE WRAPPER / DEVICE FRAME ON DESKTOP - FLUID ON MOBILE */}
      <div className="w-full max-w-sm md:max-w-[420px] h-screen md:h-[860px] md:rounded-[3.2rem] bg-gold-cream relative shadow-[0_25px_65px_-10px_rgba(15,43,92,0.3)] md:border-[12px] md:border-royal-blue ring-4 ring-amber-100/40 md:ring-[#d4af37]/45 flex flex-col overflow-hidden">
        
        {/* Smartphone top camera notch decor - only shown on desktop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-royal-blue rounded-b-2xl z-50 hidden md:flex items-center justify-center">
          <div className="w-12 h-1 rounded-full bg-white/20 mr-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
 
        {/* Dynamic header notification status row info */}
        <div className="px-6 pt-5 pb-2 text-[10px] font-bold text-stone-500 flex justify-between items-center bg-[#fbfaf7]/85 sticky top-0 z-30 border-b border-stone-100/50 backdrop-blur-md select-none">
          <span className="flex items-center space-x-1">
            <span className="tracking-tight text-stone-800">09:41</span>
            <span className="text-[7px] text-amber-600 animate-pulse font-serif">★</span>
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[8px] transform scale-90 tracking-widest text-stone-400 font-sans uppercase">5G</span>
            {/* Cellular strength bars */}
            <div className="flex items-end space-x-0.5 h-2.5">
              <div className="w-[1.5px] h-1 bg-stone-500 rounded-xxs" />
              <div className="w-[1.5px] h-1.5 bg-stone-500 rounded-xxs" />
              <div className="w-[1.5px] h-2 bg-stone-500 rounded-xxs" />
              <div className="w-[1.5px] h-2.5 bg-stone-500 rounded-xxs" />
            </div>
            {/* Battery Icon with percentage */}
            <div className="flex items-center space-x-1 ml-0.5">
              <span className="text-[7.5px] text-stone-400 font-light font-mono">100%</span>
              <div className="w-5 h-2.5 rounded-xs border border-stone-400 p-[1px] flex items-center">
                <div className="w-full h-full bg-emerald-500 rounded-2xs" />
              </div>
              <div className="w-0.5 h-1 bg-stone-400 rounded-r-xxs" />
            </div>
          </div>
        </div>

        {/* MAIN VISUAL WINDOW SPACE */}
        <div className="flex-1 overflow-hidden relative bg-gold-cream">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode === "main" ? activeTab : viewMode + (selectedFragrance?.id || recommendationResult?.primary.id || "")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
              className="h-full w-full"
            >
              {renderViewContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM NAVIGATION - FIXED & CONSTANTLY RENDERED */}
        <div className="h-[76px] bg-white/95 backdrop-blur-md border-t border-stone-100 flex justify-around items-center px-4 pb-4 pt-1 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] relative">
          {/* Item 1: Home */}
          <button
            onClick={() => {
              setActiveTab("home");
              setViewMode("main");
            }}
            className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all cursor-pointer relative ${
              activeTab === "home" && viewMode === "main"
                ? "text-royal-blue scale-102"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <HomeIcon size={19} className={activeTab === "home" && viewMode === "main" ? "stroke-[2.5]" : "stroke-[1.5]"} />
            <span className="text-[9px] font-bold mt-1 tracking-tight">Home</span>
            {activeTab === "home" && viewMode === "main" && (
              <motion.div
                layoutId="active-tab-dot"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          {/* Item 2: Discover */}
          <button
            onClick={() => {
              setActiveTab("discover");
              setViewMode("main");
            }}
            className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all cursor-pointer relative ${
              activeTab === "discover" && viewMode === "main"
                ? "text-royal-blue scale-102"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <Compass size={19} className={activeTab === "discover" && viewMode === "main" ? "stroke-[2.5]" : "stroke-[1.5]"} />
            <span className="text-[9px] font-bold mt-1 tracking-tight">Entdecken</span>
            {activeTab === "discover" && viewMode === "main" && (
              <motion.div
                layoutId="active-tab-dot"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          {/* Item 3: Collection */}
          <button
            onClick={() => {
              setActiveTab("collection");
              setViewMode("main");
            }}
            className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all cursor-pointer relative ${
              activeTab === "collection" && viewMode === "main"
                ? "text-royal-blue scale-102"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <FolderHeart size={19} className={activeTab === "collection" && viewMode === "main" ? "stroke-[2.5]" : "stroke-[1.5]"} />
            <span className="text-[9px] font-bold mt-1 tracking-tight">Kollektion</span>
            {activeTab === "collection" && viewMode === "main" && (
              <motion.div
                layoutId="active-tab-dot"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          {/* Item 4: Profile */}
          <button
            onClick={() => {
              setActiveTab("profile");
              setViewMode("main");
            }}
            className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all cursor-pointer relative ${
              activeTab === "profile" && viewMode === "main"
                ? "text-royal-blue scale-102"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <UserIcon size={19} className={activeTab === "profile" && viewMode === "main" ? "stroke-[2.5]" : "stroke-[1.5]"} />
            <span className="text-[9px] font-bold mt-1 tracking-tight">Profil</span>
            {activeTab === "profile" && viewMode === "main" && (
              <motion.div
                layoutId="active-tab-dot"
                className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          {/* Stylish iOS home indicator line decors - only shown on desktop/full scale */}
          <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-28 h-1 bg-stone-300 rounded-full opacity-60 hidden md:block" />
        </div>

        {/* SCREEN SUCCESS TOAST RENDERER */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute bottom-20 left-4 right-4 z-50 bg-royal-blue text-amber-200 py-3 px-4 rounded-xl text-xs font-bold shadow-xl border border-amber-300/20 text-center flex items-center justify-center space-x-2"
            >
              <BookmarkCheck size={14} className="text-amber-400" />
              <span>{showSuccessToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUPPORT & HELP OVERLAY DIALOG */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gold-cream border border-amber-100 rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative text-left"
            >
              <button
                onClick={() => setShowSupportModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X size={20} />
              </button>

              <span className="text-[9px] font-bold text-amber-700 tracking-wider uppercase">Support</span>
              <h3 className="font-serif text-lg font-bold text-royal-blue flex items-center gap-2 mt-1 mb-3">
                <HelpCircle className="text-amber-600" />
                Scentoria Hilfe
              </h3>

              <div className="space-y-4 text-xs text-stone-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-stone-800">1. Was ist Scentoria?</h4>
                  <p className="mt-0.5">Scentoria ist dein luxuriöser Beziehungs-Berater für exklusive Düfte. Erlesene Parfüme werden genau passend zu Gefühl, Wetterlage und Moment berechnet.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800">2. Brauche ich eine Internetverbindung?</h4>
                  <p className="mt-0.5">Nein, das gesamte Regelwerk und alle Produktdaten sind zu 100% lokal integriert – höchste Diskretion und ladefreie Matches zu jeder Zeit.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-150 flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-700" />
                  <div className="text-[10px]">
                    <span className="font-bold block text-stone-800">Kontakt-Anfragen:</span>
                    <span className="text-royal-blue">support@scentoria.com</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSupportModal(false)}
                className="w-full bg-royal-blue text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                Dienst schließen
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
