import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Wind,
  Flower,
  Trees,
  Sun,
  Briefcase,
  Sparkles,
  RotateCcw,
  Bell,
  X,
  RefreshCw
} from "lucide-react";
import { Fragrance } from "../utils/recommendation";
import { PerfumeBottle } from "../components/PerfumeBottle";

interface RecommendationProps {
  primary: Fragrance;
  alternatives: Fragrance[];
  onBack: () => void;
  onRestartFinder: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
  onReroll?: () => void;
  selectedData?: { mood: number; weather: string; occasion: string };
}

export const Recommendation: React.FC<RecommendationProps> = ({
  primary,
  alternatives,
  onBack,
  onRestartFinder,
  favorites,
  onToggleFavorite,
  onSelectFragrance,
  onReroll,
  selectedData,
}) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const isFavorite = favorites.includes(primary.id);

  // Selector for tag icons matching Column 4 style
  const getTagIcon = (tag: string) => {
    const l = tag.toLowerCase();
    if (l.includes("sonnig") || l.includes("sommer") || l.includes("heiß") || l.includes("heiss")) {
      return <Sun className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (l.includes("arbeit") || l.includes("büro") || l.includes("fokus") || l.includes("frequent")) {
      return <Briefcase className="w-3.5 h-3.5 text-blue-500" />;
    }
    return <Sparkles className="w-3.5 h-3.5 text-teal-500" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#faf9f5] pb-24 overflow-y-auto relative text-left scrollbar-none">
      
      {/* 1. COMPACT APP BAR */}
      <div className="flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-stone-200/50">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-[#0f2b5c] hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200/40"
        >
          <ArrowLeft size={16} className="stroke-[2.2]" />
        </button>
        <h3 className="font-serif text-[15px] font-bold text-[#0f2b5c]">
          Dein Duft des Tages
        </h3>
        <button className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-[#0f2b5c] hover:bg-stone-100 transition-colors border border-stone-200/40">
          <Bell size={15} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-5">
        
        {/* 2. MAIN BOTTLE BANNER - COLUMN 4 HERO SPECIFICATION */}
        <div className="relative rounded-[2rem] bg-gradient-to-b from-[#f3f5f9] to-[#fafafd] border border-stone-200/50 p-5 shadow-xs overflow-hidden flex flex-col items-center">
          
          {/* Transparent sheet flower visual background accents */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -left-6 bottom-4 text-stone-300 font-serif text-sm">❀</div>
            <div className="absolute right-4 top-10 text-stone-300 font-serif text-sm">❀ 🌸</div>
          </div>

          {/* Floated beautiful large perfume bottle representing active match */}
          <div className="my-3 relative select-none">
            <div className="absolute w-32 h-32 rounded-full bg-blue-400/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <PerfumeBottle color={primary.color} name={primary.name} size="lg" animated={true} imageUrl={primary.imageUrl} />
          </div>

          {/* Scent Information Center Info */}
          <div className="text-center space-y-1 relative z-10 w-full mt-2">
            <span className="text-[8px] uppercase tracking-widest text-[#b87333] font-bold block">
              {primary.brand}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#0f2b5c] leading-tight">
              {primary.name}
            </h2>
            {/* Split Style tags by dot */}
            <p className="text-[10px] text-stone-500 font-medium font-sans uppercase tracking-wider">
              {primary.style}
            </p>
          </div>

          {/* Floating favorite button */}
          <button
            onClick={() => onToggleFavorite(primary.id)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center text-stone-350 z-20 shadow-xs cursor-pointer border border-stone-200/45"
          >
            <Heart
              size={15}
              className={`transition-transform duration-200 hover:scale-110 ${isFavorite ? "text-red-500 fill-red-500" : ""}`}
            />
          </button>
        </div>

        {/* 3. DUFTNOTEN TRIAD COLUMN */}
        <div className="p-4 rounded-3xl bg-white border border-stone-200/50 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
            <h4 className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest">
              Duftnoten
            </h4>
            <span className="text-[9px] text-[#b87333] font-bold uppercase tracking-wider">Premium Noten-Formel</span>
          </div>

          <div className="space-y-3">
            {/* Kopfnote */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Wind size={15} className="stroke-[2.2]" />
              </div>
              <div className="text-left flex-grow">
                <span className="text-[8.5px] font-extrabold text-stone-400 block uppercase tracking-wide leading-none mb-1">Kopf (Top):</span>
                <span className="font-extrabold text-stone-800 text-[11px]">{primary.notes.head}</span>
              </div>
            </div>

            {/* Herznote */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 flex-shrink-0">
                <Flower size={15} className="stroke-[2.2]" />
              </div>
              <div className="text-left flex-grow">
                <span className="text-[8.5px] font-extrabold text-stone-400 block uppercase tracking-wide leading-none mb-1">Herz (Heart):</span>
                <span className="font-extrabold text-stone-800 text-[11px]">{primary.notes.heart}</span>
              </div>
            </div>

            {/* Basisnote */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <Trees size={15} className="stroke-[2.2]" />
              </div>
              <div className="text-left flex-grow">
                <span className="text-[8.5px] font-extrabold text-stone-400 block uppercase tracking-wide leading-none mb-1">Basis (Base):</span>
                <span className="font-extrabold text-stone-800 text-[11px]">{primary.notes.base}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PASST ZU (TAG CHIPS) */}
        <div className="space-y-2">
          <span className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest block">
            Passt zu
          </span>
          <div className="flex flex-wrap gap-1.5">
            {primary.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white border border-stone-200/50 text-[10px] font-bold text-stone-600 shadow-xs"
              >
                {getTagIcon(tag)}
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 5. FULL WIDTH BUTTON "DETAILS ANSEHEN" */}
        <div className="pt-1">
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="w-full bg-[#0f2b5c] hover:bg-[#123166] text-white font-extrabold text-[10px] uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer text-[#fafbfc]"
          >
            <span>{showFullDetails ? "Details verbergen" : "Details ansehen"}</span>
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showFullDetails ? "rotate-90" : ""}`} />
          </button>
          
          <AnimatePresence>
            {showFullDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 p-4 rounded-2xl bg-white border border-stone-200/40 text-[10.5px] text-stone-500 leading-relaxed text-left font-sans shadow-xs"
              >
                <p>{primary.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. PASSENDE ALTERNATIVEN (TWO CARDS SIDE-BY-SIDE: Aqua Pure & Citrus Breeze) */}
        <div className="space-y-2.5">
          <span className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest block">
            Passende Alternativen
          </span>
          
          <div className="grid grid-cols-2 gap-3">
            {alternatives.map((alt) => {
              const isAltFavorite = favorites.includes(alt.id);
              return (
                <div
                  key={alt.id}
                  onClick={() => onSelectFragrance(alt)}
                  className="bg-white rounded-2xl p-3.5 border border-stone-200/50 shadow-xs relative flex flex-col justify-between hover:shadow-sm transition-all text-center group cursor-pointer"
                >
                  {/* Favourite heart floating */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(alt.id);
                    }}
                    className="absolute top-2.5 right-2.5 text-stone-300 hover:text-red-500 cursor-pointer z-10"
                  >
                    <Heart
                      size={13}
                      className={isAltFavorite ? "text-red-500 fill-red-500" : ""}
                    />
                  </button>

                  <div className="space-y-2.5 pb-0.5 h-full flex flex-col items-center justify-between">
                    <div className="h-20 flex items-center justify-center transform group-hover:scale-105 transition-transform select-none">
                      <PerfumeBottle color={alt.color} name={alt.name} size="sm" animated={false} imageUrl={alt.imageUrl} />
                    </div>
                    <div>
                      <h5 className="text-[10.5px] font-extrabold text-stone-850 leading-tight group-hover:text-[#0f2b5c] transition-colors">
                        {alt.name}
                      </h5>
                      <span className="text-[8.5px] text-[#b87333] font-bold uppercase tracking-wider mt-0.5 block">
                        {alt.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reroll/Rotation action */}
        {onReroll && selectedData && (
          <div className="pt-2">
            <button
              onClick={onReroll}
              className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-extrabold py-3.5 px-6 rounded-full flex items-center justify-center space-x-2 transition-all text-xs tracking-widest cursor-pointer uppercase border border-transparent shadow-xs"
            >
              <RefreshCw size={14} className="stroke-[2.2]" />
              <span>Anderen Vorschlag laden</span>
            </button>
            <p className="text-[9.5px] text-stone-400 font-semibold text-center mt-1.5 px-2 leading-relaxed">
              Es gibt mehrere Düfte, die perfekt passen! Klicke hier, um Alternativen zu rotieren.
            </p>
          </div>
        )}

        {/* 7. NEUE SITUATION WÄHLEN RETURN BUTTON AT BOTTOM */}
        <div className="pt-2 pb-10">
          <button
            onClick={onRestartFinder}
            className="w-full bg-[#eeeae1] hover:bg-stone-200 text-stone-700 font-extrabold py-3.5 px-6 rounded-full flex items-center justify-center space-x-2 transition-all text-xs tracking-widest cursor-pointer uppercase border border-stone-250/30"
          >
            <RotateCcw size={14} className="stroke-[2.2]" />
            <span>Neue Situation wählen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
