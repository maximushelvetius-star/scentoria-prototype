import React, { useState } from "react";
import { Search, Heart, Plus, MoreVertical, X, Info, Check } from "lucide-react";
import { Fragrance, getAllFragrances } from "../utils/recommendation";
import { PerfumeBottle } from "../components/PerfumeBottle";
import { motion, AnimatePresence } from "motion/react";

interface CollectionProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const Collection: React.FC<CollectionProps> = ({
  favorites,
  onToggleFavorite,
  onSelectFragrance,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Alle" | "Favoriten" | "Frisch" | "Holzig" | "Blumig" | "Würzig">("Alle");
  const [showAddInfo, setShowAddInfo] = useState(false);

  const allFragrances = getAllFragrances();

  // Filter chips list
  const filterChips: ("Alle" | "Favoriten" | "Frisch" | "Holzig" | "Blumig" | "Würzig")[] = [
    "Alle",
    "Favoriten",
    "Frisch",
    "Holzig",
    "Blumig",
    "Würzig",
  ];

  // Filter logic
  const filteredFragrances = allFragrances.filter((frag) => {
    const matchesSearch =
      frag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frag.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frag.style.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "Alle") return true;
    if (activeTab === "Favoriten") return favorites.includes(frag.id);
    return frag.category === activeTab;
  });

  return (
    <div className="flex flex-col h-full bg-[#faf9f5] pb-24 overflow-y-auto relative text-left scrollbar-none">
      
      {/* 1. HEADER SECTION MATCHING COLUMN 5 */}
      <div className="flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-stone-200/50">
        <h3 className="font-serif text-lg font-bold text-[#0f2b5c]">
          Meine Kollektion
        </h3>
        <button className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 border border-stone-200/40">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        
        {/* 2. DUSTS SEARCH BAR PILL */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4.5 flex items-center pointer-events-none text-stone-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Düfte suchen..."
            className="w-full bg-white border border-stone-200/75 rounded-full py-2.5 pl-10 pr-10 text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-[#0f2b5c] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-4.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 3. HORIZONTAL CHIPS CHEX */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1.5 scrollbar-none snap-x">
          {filterChips.map((chip) => {
            const isActive = activeTab === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveTab(chip)}
                className={`snap-start px-3.5 py-1.5 rounded-full text-[9px] font-extrabold tracking-wider border transition-all whitespace-nowrap cursor-pointer uppercase ${
                  isActive
                    ? "bg-[#0f2b5c] text-white border-[#0f2b5c] shadow-xs"
                    : "bg-white text-stone-500 border-stone-200/60 hover:bg-stone-50"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* 4. EXACT 3x2 GRID RASTER FOR SIX DUSTS */}
        {filteredFragrances.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredFragrances.map((f) => {
              const isFav = favorites.includes(f.id);
              return (
                <motion.div
                  layout
                  key={f.id}
                  className="bg-white rounded-2xl p-2.5 border border-stone-200/50 shadow-xs relative flex flex-col justify-between hover:shadow-sm transition-all group"
                >
                  {/* Floating heart icon on top layout */}
                  <button
                    onClick={() => onToggleFavorite(f.id)}
                    className="absolute top-2 right-2 z-10 text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart
                      size={13}
                      className={`transition-all ${isFav ? "text-red-500 fill-red-500 scale-105" : "scale-100 hover:scale-105"}`}
                    />
                  </button>

                  {/* Bottle Visual click area */}
                  <div
                    onClick={() => onSelectFragrance(f)}
                    className="cursor-pointer flex flex-col items-center flex-1 justify-between space-y-2 pt-1 pb-0.5 select-none"
                  >
                    <div className="h-20 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                      <PerfumeBottle color={f.color} name={f.name} size="sm" animated={false} imageUrl={f.imageUrl} />
                    </div>

                    <div className="text-center w-full min-h-[30px] flex flex-col justify-end">
                      <h4 className="text-[10px] font-extrabold text-stone-850 leading-tight truncate">
                        {f.name}
                      </h4>
                      <span className="text-[7.5px] text-[#b87333] font-bold tracking-tight block uppercase mt-0.5 whitespace-nowrap truncate">
                        {f.brand}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-stone-150 text-center text-stone-400 italic text-[11px]">
            Keine entsprechenden Düfte für diese Ansicht gelistet.
          </div>
        )}

        {/* 5. ADD COMPOSITION BUTT */}
        <div className="pt-2 pb-6">
          <button
            onClick={() => setShowAddInfo(true)}
            className="w-full bg-[#0f2b5c] hover:bg-[#123166] text-white text-[11px] tracking-widest font-extrabold py-3.5 px-6 rounded-full shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer border border-[#0f2b5c] uppercase text-[#fafbfc]"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>Duft hinzufügen</span>
          </button>
        </div>
      </div>

      {/* DEMO INFO SLIDE-UP MODAL PANEL */}
      <AnimatePresence>
        {showAddInfo && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
            <motion.div
              initial={{ y: "15%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "15%", opacity: 0 }}
              className="bg-white rounded-t-[2.5rem] p-6 w-full max-w-md border-t border-stone-200 shadow-2xl relative text-left pb-10"
            >
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" />

              <button
                onClick={() => setShowAddInfo(false)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2b5c] border border-blue-105">
                  <Info size={18} />
                </div>
                <div>
                  <span className="text-[8px] font-extrabold text-[#b87333] tracking-widest uppercase">Info</span>
                  <h3 className="font-serif text-base font-bold text-[#0f2b5c]">Duft hinzufügen</h3>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-500 leading-relaxed mb-6 font-sans">
                <p>
                  Im aktuellen Vorschau-Modus von <strong>Scentoria</strong> sind bereits alle siebenunddreißig exklusiven Premiumdüfte gelistet.
                </p>
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-150 flex items-start space-x-2 text-[10.5px] text-stone-600">
                  <Check className="text-emerald-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Die siebenunddreißig Düfte bieten dir das volle Spektrum von frischen, holzigen, blumigen und würzigen Noten für deine Tests.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowAddInfo(false)}
                className="w-full bg-[#0f2b5c] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer text-center text-[#fcfdfd]"
              >
                Verstanden
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
