import React, { useState } from "react";
import { User, Settings, Bell, HelpCircle, Wind, Trees, Droplets, ChevronRight, Sparkles, X } from "lucide-react";
import { Fragrance, getAllFragrances } from "../utils/recommendation";
import { PerfumeBottle } from "../components/PerfumeBottle";
import { motion, AnimatePresence } from "motion/react";

interface ProfileProps {
  favorites: string[];
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  favorites,
  onSelectFragrance,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const allFragrances = getAllFragrances();

  // Filter favorite perfumes or default to some beautiful ones to keep row populated
  const favoritePerfumes = allFragrances.filter((f) => favorites.includes(f.id) || f.id === "bleu-de-chanel-eau-de-parfum" || f.id === "xj-1861-naxos" || f.id === "acqua-di-gio-profumo");

  // Menu items list
  const menuItems = [
    { id: "einstellungen", label: "Einstellungen", icon: <Settings size={15} /> },
    { id: "benachrichtigungen", label: "Benachrichtigungen", icon: <Bell size={15} /> },
    { id: "hilfe", label: "Hilfe & Support", icon: <HelpCircle size={15} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#fbf9f5] pb-24 overflow-y-auto relative text-left scrollbar-none">
      
      {/* HEADER BAR */}
      <div className="flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-stone-200/50">
        <h3 className="font-serif text-lg font-bold text-[#0f2b5c]">
          Profil
        </h3>
        <button
          onClick={() => setActiveMenu("einstellungen")}
          className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 border border-stone-200/40 cursor-pointer hover:bg-stone-100 transition-colors"
        >
          <Settings size={16} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-5">
        
        {/* 1. PROFILE HEADER CARD (Anna Müller, Duftliebhaberin, Level 7) */}
        <div className="flex items-center space-x-4 p-4.5 rounded-3xl bg-white border border-stone-200/55 shadow-xs relative">
          
          {/* Avatar representation matching illustration */}
          <div className="relative w-15 h-15 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-50 to-[#0f2b5c]/10 flex items-center justify-center shadow-xs overflow-hidden flex-shrink-0">
            {/* Elegant Vector placeholder or User Icon */}
            <User className="text-[#0f2b5c] w-6.5 h-6.5 stroke-[1.8]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
          </div>

          <div className="space-y-0.5">
            <h3 className="font-serif text-base font-bold text-[#0f2b5c] leading-tight">
              Anna Müller
            </h3>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold font-sans">
              Duftliebhaberin
            </p>

            {/* Level 7 Gold Badge */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-950 text-[8.5px] font-extrabold uppercase tracking-wide mt-1">
              <Sparkles size={8.5} className="fill-amber-600 text-amber-600" />
              <span>Level 7</span>
            </div>
          </div>
        </div>

        {/* 2. DEINE VORLIEBEN (Three columns row segment) */}
        <div className="space-y-2">
          <span className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest block">
            Deine Vorlieben
          </span>
          
          <div className="grid grid-cols-3 gap-2.5">
            {/* Frisch option */}
            <div className="bg-white rounded-2xl p-3 border border-stone-200/50 shadow-xs text-center flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100/30">
                <Wind size={15} className="stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wide">Frisch</span>
            </div>

            {/* Holzig option */}
            <div className="bg-white rounded-2xl p-3 border border-stone-200/50 shadow-xs text-center flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-100/30">
                <Trees size={15} className="stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wide">Holzig</span>
            </div>

            {/* Aquatisch option */}
            <div className="bg-white rounded-2xl p-3 border border-stone-200/50 shadow-xs text-center flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/30">
                <Droplets size={15} className="stroke-[2.2]" />
              </div>
              <span className="text-[10px] font-extrabold text-stone-700 uppercase tracking-wide">Aquatisch</span>
            </div>
          </div>
        </div>

        {/* 3. SAMMLUNGSÜBERSICHT CARD */}
        <div className="space-y-2">
          <span className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest block">
            Sammlungsübersicht
          </span>
          
          <div className="p-4 rounded-[2rem] bg-white border border-stone-200/50 shadow-xs grid grid-cols-3 divide-x divide-stone-100 text-center select-none">
            <div className="space-y-0.5">
              <span className="block text-xl font-serif font-bold text-[#0f2b5c] leading-none">
                {allFragrances.length}
              </span>
              <span className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wide">Düfte</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xl font-serif font-bold text-[#0f2b5c] leading-none">
                {favorites.length}
              </span>
              <span className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wide">Favoriten</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-xl font-serif font-bold text-[#0f2b5c] leading-none">
                {new Set(allFragrances.map((f) => f.brand)).size}
              </span>
              <span className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wide">Marken</span>
            </div>
          </div>
        </div>

        {/* 4. LIEBLINGSDÜFTE (Horizontal carousell containing mini perfume bottles) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-extrabold text-[#0f2b5c] uppercase tracking-widest block">
              Lieblingsdüfte
            </span>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Mehr anzeigen</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none snap-x select-none">
            {favoritePerfumes.map((f) => (
              <div
                key={f.id}
                onClick={() => onSelectFragrance(f)}
                className="snap-start flex-shrink-0 w-20 p-2 bg-white rounded-2xl border border-stone-200/50 shadow-xs hover:border-amber-200 transition-all flex flex-col items-center justify-between aspect-[3/4] cursor-pointer group"
              >
                <div className="h-14 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <PerfumeBottle color={f.color} name={f.name} size="xs" animated={false} imageUrl={f.imageUrl} />
                </div>
                <span className="text-[8.5px] font-extrabold text-stone-700 truncate w-full text-center mt-1 uppercase tracking-tight">
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. MENU ROW DIRECTORY ACTIONS */}
        <div className="bg-white rounded-[2rem] border border-stone-200/50 divide-y divide-stone-100 overflow-hidden shadow-xs text-left">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50/50 transition-colors text-stone-700 cursor-pointer text-left"
            >
              <div className="flex items-center space-x-3 text-[11px] font-extrabold text-stone-650 uppercase tracking-widest">
                <div className="text-[#0f2b5c] flex-shrink-0">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
              <ChevronRight size={15} className="text-stone-300 mr-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* DETAIL DIALOG MODALS */}
      <AnimatePresence>
        {activeMenu && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative text-left"
            >
              <button
                onClick={() => setActiveMenu(null)}
                className="absolute top-4.5 right-4.5 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="font-serif text-base font-bold text-[#0f2b5c] flex items-center gap-1.5 mb-1.5">
                <Sparkles size={16} className="text-amber-500" />
                {menuItems.find((m) => m.id === activeMenu)?.label}
              </h3>

              <div className="text-xs text-stone-500 leading-relaxed py-2 font-sans space-y-2">
                {activeMenu === "einstellungen" && (
                  <p>In den Einstellungen kannst du deine Profildaten bearbeiten, dein bevorzugtes Aroma-Profil anpassen und den Applet-Speicher zurücksetzen.</p>
                )}
                {activeMenu === "benachrichtigungen" && (
                  <p>Du wirst umgehend informiert, sobald neue erlesene Nischendüfte verfügbar sind oder sich saisonale Duftempfehlungen ändern.</p>
                )}
                {activeMenu === "hilfe" && (
                  <p>Bei Fragen zu den siebenunddreißig charakteristischen Edelsorten oder der Punkteberechnung helfen wir dir im integrierten Service gerne weiter!</p>
                )}
              </div>

              <button
                onClick={() => setActiveMenu(null)}
                className="mt-4 w-full bg-[#0f2b5c] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer text-center text-[#fafbfc]"
              >
                Schließen
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
