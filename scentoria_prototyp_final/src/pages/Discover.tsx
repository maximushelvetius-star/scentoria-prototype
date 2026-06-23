import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, Sparkles, Smile, ArrowRight, X, Star, CloudSun, Calendar } from "lucide-react";
import { Fragrance, getAllFragrances } from "../utils/recommendation";
import { PerfumeBottle } from "../components/PerfumeBottle";

interface DiscoverProps {
  onStartFinder: (preselectStep?: number) => void;
  onOpenDuftDesTages: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const Discover: React.FC<DiscoverProps> = ({
  onStartFinder,
  onOpenDuftDesTages,
  onSelectFragrance,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrend, setActiveTrend] = useState<string | null>(null);

  const allFragrances = getAllFragrances();

  // Filter fragrances according to search
  const filteredFragrances = searchQuery
    ? allFragrances.filter((f) => {
        const query = searchQuery.toLowerCase();
        return (
          f.name.toLowerCase().includes(query) ||
          f.brand.toLowerCase().includes(query) ||
          f.style.toLowerCase().includes(query) ||
          f.category.toLowerCase().includes(query) ||
          Object.values(f.notes).some((note) => note.toLowerCase().includes(query)) ||
          f.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      })
    : [];

  // Trends mapping
  const trendCollections: Record<string, { title: string; desc: string; ids: string[]; displayStyle: string; icon: string }> = {
    aquatic: {
      title: "Aquatische Düfte",
      desc: "Die belebende Frische des Meeres, gekrönt mit maritimen Noten.",
      ids: ["acqua-di-gio-profumo", "bleu-de-chanel-eau-de-parfum"],
      displayStyle: "bg-gradient-to-br from-blue-500/10 via-blue-100/30 to-cyan-100/20 border border-blue-200/50",
      icon: "🌊",
    },
    summer: {
      title: "Sommerdüfte",
      desc: "Leichte, sonnige Kompositionen voller Zitrusfrische und Leichtigkeit.",
      ids: ["acqua-di-gio-profumo", "xj-1861-naxos", "y-eau-de-parfum"],
      displayStyle: "bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-rose-100/20 border border-amber-200/50",
      icon: "☀️",
    },
    wood: {
      title: "Holznoten",
      desc: "Charakterstarke, erdige Düfte mit trockenem Sandel- und Zedernholz.",
      ids: ["bleu-de-chanel-eau-de-parfum", "baccarat-rouge-540-extrait"],
      displayStyle: "bg-gradient-to-br from-[#ece5d8]/10 via-[#ece5d8]/40 to-amber-100/10 border border-stone-200",
      icon: "🌲",
    },
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfbf9] overflow-y-auto pb-24 scrollbar-none text-left">
      
      {/* HEADER SECTION */}
      <div className="px-5 pt-8 pb-1.5">
        <h2 className="font-serif text-3xl font-bold text-[#0f2b5c] tracking-wide">
          Entdecken
        </h2>
        <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mt-0.5">
          Erlesene Nischen-Kreationen
        </p>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="px-5 py-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-4.5 flex items-center pointer-events-none text-stone-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Düfte, Noten, Marken suchen ..."
            className="w-full bg-white border border-stone-200/75 rounded-full py-3 pl-11 pr-11 text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-[#0f2b5c] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-4.5 flex items-center text-stone-450 hover:text-stone-700 cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* DYNAMIC SEARCH RESULTS LISTBOX */}
      {searchQuery && (
        <div className="mx-5 bg-white rounded-[2rem] p-5 border border-amber-200/40 shadow-lg mt-1 mb-3">
          <h3 className="text-[10px] font-bold text-[#0f2b5c] uppercase tracking-wider mb-3">
            Suchergebnisse ({filteredFragrances.length})
          </h3>
          {filteredFragrances.length > 0 ? (
            <div className="space-y-3.5 divide-y divide-stone-105">
              {filteredFragrances.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    onSelectFragrance(f);
                    setSearchQuery("");
                  }}
                  className="flex items-center space-x-3 pt-3.5 first:pt-0 cursor-pointer hover:opacity-90 transition-all"
                >
                  <div className="w-10 h-14 bg-stone-50 rounded-xl overflow-hidden flex items-center justify-center border border-stone-150 flex-shrink-0">
                    <PerfumeBottle color={f.color} name={f.name} size="sm" animated={false} imageUrl={f.imageUrl} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[8px] text-[#b87333] font-bold tracking-wider uppercase">
                      {f.brand}
                    </span>
                    <h4 className="text-xs font-bold text-stone-850 leading-tight">
                      {f.name}
                    </h4>
                    <p className="text-[9.5px] text-stone-400 line-clamp-1 mt-0.5">
                      {f.style} • {f.category}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-stone-300" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-450 italic py-2">
              Keine entsprechenden Düfte gefunden. Suche z.B. nach „Citrus“, „Fokus“ oder „Santal“.
            </p>
          )}
        </div>
      )}

      {/* SCHNELLEINSTIEG (Exactly 4 cards horizontally) */}
      <div className="px-5 mt-4">
        <h3 className="font-serif text-[15px] font-bold text-[#0f2b5c] tracking-wide mb-3">
          Schnelleinstieg
        </h3>
        {/* Horizontal row layout with 4 compact, high-quality circular-to-square cards */}
        <div className="grid grid-cols-4 gap-2">
          {/* Card 1: Duftfinder starten */}
          <button
            onClick={() => onStartFinder()}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-stone-200/50 shadow-xs hover:shadow-sm transition-all text-center aspect-square cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2b5c] group-hover:scale-105 transition-transform mb-1.5">
              <Compass size={16} className="stroke-[1.8] text-blue-600" />
            </div>
            <span className="text-[8px] font-extrabold text-stone-700 uppercase tracking-tighter leading-snug">Finder</span>
          </button>

          {/* Card 2: Dein Duft des Tages */}
          <button
            onClick={onOpenDuftDesTages}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-stone-200/50 shadow-xs hover:shadow-sm transition-all text-center aspect-square cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform mb-1.5">
              <Star size={16} className="stroke-[1.8] text-amber-600 fill-amber-300/30" />
            </div>
            <span className="text-[8px] font-extrabold text-stone-700 uppercase tracking-tighter leading-snug">Tagestipp</span>
          </button>

          {/* Card 3: Nach Stimmung */}
          <button
            onClick={() => onStartFinder(0)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-stone-200/50 shadow-xs hover:shadow-sm transition-all text-center aspect-square cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform mb-1.5">
              <Smile size={16} className="stroke-[1.8] text-teal-600" />
            </div>
            <span className="text-[8px] font-extrabold text-stone-700 uppercase tracking-tighter leading-snug">Stimmung</span>
          </button>

          {/* Card 4: Nach Wetter */}
          <button
            onClick={() => onStartFinder(1)}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-stone-200/50 shadow-xs hover:shadow-sm transition-all text-center aspect-square cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform mb-1.5">
              <CloudSun size={16} className="stroke-[1.8] text-orange-600" />
            </div>
            <span className="text-[8px] font-extrabold text-stone-700 uppercase tracking-tighter leading-snug">Wetter</span>
          </button>
        </div>
      </div>

      {/* LUXURY BANNER WITH BLUE PERFUME BOTTLE ON THE RIGHT */}
      <div className="px-5 mt-5">
        <div className="relative rounded-[2rem] overflow-hidden border border-stone-200/70 bg-[#eeeae1] text-stone-850 p-5 pr-4 flex items-center justify-between text-left shadow-[0_5px_15px_rgba(0,0,0,0.01)] min-h-[140px]">
          
          <div className="space-y-1.5 max-w-[62%] z-10">
            <span className="text-[8px] font-extrabold text-amber-800 uppercase tracking-[0.2em] block">
              Boutique-Service
            </span>
            <h3 className="font-serif text-base font-extrabold leading-tight text-[#0f2b5c]">
              Finde deinen perfekten Duft
            </h3>
            <p className="text-[10px] text-stone-500 font-medium leading-relaxed font-sans mt-0.5">
              Für jede Situation. Für dich.
            </p>
            <div className="pt-1.5">
              <button
                onClick={() => onStartFinder()}
                className="bg-[#0f2b5c] hover:bg-[#123166] text-white font-extrabold text-[9px] uppercase tracking-widest px-4 py-2 rounded-full transition-all shadow-xs cursor-pointer text-[#fafbfc]"
              >
                Jetzt entdecken
              </button>
            </div>
          </div>
          
          {/* Blue glass perfume bottle on the right side of the card */}
          <div className="w-1/3 flex justify-end z-10 transform scale-108 translate-x-1.5 select-none">
            <PerfumeBottle
              color={{
                bottle: "linear-gradient(135deg, #122f60 0%, #07152f 100%)",
                liquid: "rgba(180, 210, 255, 0.22)",
                accent: "#60a5fa",
                cap: "#111827",
              }}
              name="Scentoria"
              size="md"
              animated={true}
            />
          </div>
        </div>
      </div>

      {/* AKTUELLE TRENDS CAROUSEL */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-[15px] font-bold text-[#0f2b5c] tracking-wide">
            Aktuelle Trends
          </h3>
          <button 
            onClick={() => onStartFinder(1)} 
            className="text-[9px] text-[#0f2b5c] font-extrabold hover:underline uppercase tracking-wider"
          >
            Mehr anzeigen
          </button>
        </div>

        {/* Carousel containing exactly: Aquatische Düfte, Sommerdüfte, Holznoten */}
        <div className="flex gap-3.5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {Object.entries(trendCollections).map(([key, value]) => (
            <div
              key={key}
              onClick={() => setActiveTrend(key)}
              className="flex-shrink-0 w-36 snap-start p-3 rounded-2xl bg-white border border-stone-200/50 shadow-xs hover:border-amber-200 transition-all cursor-pointer text-left group"
            >
              <div
                className={`w-full h-20 rounded-xl ${value.displayStyle} flex flex-col items-center justify-center relative overflow-hidden mb-2`}
              >
                {/* Visual vectors represent style */}
                <span className="text-2xl select-none block transform group-hover:scale-108 transition-transform">
                  {value.icon}
                </span>
              </div>
              <h4 className="text-[10px] font-extrabold text-stone-850 uppercase tracking-wide leading-tight truncate">{value.title}</h4>
              <p className="text-[9px] text-stone-400 mt-0.5 line-clamp-2 leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Detail Modal Dialog */}
      <AnimatePresence>
        {activeTrend && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm border border-stone-200 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setActiveTrend(null)}
                className="absolute top-4.5 right-4.5 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X size={18} />
              </button>

              <span className="text-[8px] font-extrabold text-amber-700 tracking-widest uppercase">
                Botanische Kollektion
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0f2b5c] mt-0.5 mb-1">
                {trendCollections[activeTrend].title}
              </h3>
              <p className="text-[11px] text-stone-500 mb-4 leading-relaxed">
                {trendCollections[activeTrend].desc}
              </p>

              <div className="space-y-2.5">
                {allFragrances
                  .filter((frag) => trendCollections[activeTrend].ids.includes(frag.id))
                  .map((f) => (
                    <div
                      key={f.id}
                      onClick={() => {
                        onSelectFragrance(f);
                        setActiveTrend(null);
                      }}
                      className="flex items-center space-x-3 p-2.5 rounded-2xl bg-[#fafafa] hover:bg-stone-50 transition-colors border border-stone-100 cursor-pointer"
                    >
                      <div className="w-8 h-12 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-150">
                        <PerfumeBottle color={f.color} name={f.name} size="sm" animated={false} imageUrl={f.imageUrl} />
                      </div>
                      <div className="flex-grow text-left">
                        <span className="text-[8px] text-[#b87333] uppercase font-bold tracking-wider">
                          {f.brand}
                        </span>
                        <h4 className="text-xs font-bold text-stone-850 leading-tight">
                          {f.name}
                        </h4>
                        <p className="text-[9px] text-stone-400 mt-0.5 mt-0.5">
                          {f.category} • {f.style}
                        </p>
                      </div>
                      <ArrowRight size={13} className="text-stone-300" />
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
