import React from "react";
import { motion } from "motion/react";
import { PerfumeBottle } from "../components/PerfumeBottle";
import { Droplet, Sparkles, Search, HelpCircle, ChevronRight, Compass } from "lucide-react";

interface HomeProps {
  onStartFinder: () => void;
  gotoTab: (tab: "home" | "discover" | "collection" | "profile") => void;
  onOpenDuftDesTages: () => void;
  onOpenSupport: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onStartFinder,
  gotoTab,
  onOpenDuftDesTages,
  onOpenSupport,
}) => {
  // Beautiful signature transparent/golden glass bottle with slight blue reflecting lights
  const elegantHomeBottleColor = {
    bottle: "linear-gradient(135deg, #fbf7f0 0%, #ece5d8 50%, #d4af37 100%)",
    liquid: "rgba(218, 165, 32, 0.15)",
    accent: "#d4af37",
    cap: "#0f2b5c",
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#f9f7f2] via-white to-[#f4f1ea] overflow-y-auto pb-24 scrollbar-none">
      
      {/* 1. HERO SHOWCASE AREA */}
      <div className="relative w-full px-5 pt-8 pb-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Soft floral/fabric ripples in background - decorative CSS vector styling */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
          {/* Subtle curved circles simulating soft silk sheets */}
          <div className="absolute -left-12 top-0 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-150/15 through-white to-transparent blur-xl" />
          <div className="absolute -right-20 top-12 w-72 h-72 rounded-full bg-gradient-to-br from-blue-100/10 through-white to-transparent blur-xl" />
        </div>

        {/* Ambient glow underneath the perfume flakon */}
        <div className="absolute w-44 h-44 rounded-full bg-amber-150/20 blur-3xl top-16" />

        {/* Luxuriously floating glass perfume bottle */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 my-2 select-none"
        >
          <PerfumeBottle color={elegantHomeBottleColor} name="Scentoria" size="lg" animated={true} />
        </motion.div>

        {/* Title Group */}
        <div className="z-10 mt-3 max-w-xs space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl font-extrabold tracking-[0.08em] text-[#0f2b5c]"
          >
            Scentoria
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[10px] tracking-[0.25em] uppercase text-amber-800 font-bold font-sans"
          >
            Dein Duft. Dein Moment.
          </motion.p>
        </div>

        {/* Big capsule button for "✦ Duft finden" */}
        <div className="w-full max-w-[310px] mt-6 z-10">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onStartFinder}
            id="btn-home-start-finder"
            className="w-full bg-[#0f2b5c] hover:bg-[#123166] text-white font-bold py-4 px-6 rounded-full shadow-[0_10px_28px_-6px_rgba(15,43,92,0.35)] flex items-center justify-center space-x-2 transition-all border border-amber-300/10 group cursor-pointer text-xs uppercase tracking-widest text-[#fbfbf9]"
          >
            <span className="text-amber-300 text-sm animate-pulse">✦</span>
            <span>Duft finden</span>
          </motion.button>
        </div>
      </div>

      {/* 2. THREE MINI CARDS SIDE-BY-SIDE (Row Layout matching Wireframe exactly) */}
      <div className="px-5 mt-2">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: Meine Sammlung */}
          <button
            onClick={() => gotoTab("collection")}
            className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/55 shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md transition-all text-center aspect-square group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50/70 flex items-center justify-center text-[#0f2b5c] group-hover:scale-105 transition-transform mb-1">
              <Droplet className="w-4.5 h-4.5 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-extrabold text-stone-850 leading-tight">Sammlung</h4>
              <p className="text-[9px] font-medium text-stone-400">6 Düfte</p>
            </div>
          </button>

          {/* Card 2: Duft des Tages */}
          <button
            onClick={onOpenDuftDesTages}
            className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/55 shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md transition-all text-center aspect-square group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50/80 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform mb-1">
              <Sparkles className="w-4.5 h-4.5 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-extrabold text-stone-850 leading-tight">Tagestipp</h4>
              <p className="text-[9px] font-medium text-amber-800">Für dich</p>
            </div>
          </button>

          {/* Card 3: Duftfinder nach Note */}
          <button
            onClick={() => gotoTab("discover")}
            className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/55 shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md transition-all text-center aspect-square group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 group-hover:scale-105 transition-transform mb-1">
              <Search className="w-4.5 h-4.5 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-extrabold text-stone-850 leading-tight">Duftsuche</h4>
              <p className="text-[9px] font-medium text-stone-400">nach Note</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. WIDE BAR CARD: HILFE & SUPPORT */}
      <div className="px-5 mt-5">
        <div
          onClick={onOpenSupport}
          className="w-full bg-white rounded-2xl p-4 border border-stone-200/55 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex items-center justify-between hover:bg-stone-50/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 border border-stone-100/50 flex-shrink-0">
              {/* Headset/support look via custom mini layout or HelpCircle */}
              <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-[#0f2b5c] uppercase tracking-wider">Hilfe & Support</h4>
              <p className="text-[10px] text-stone-400 mt-0.5 font-medium leading-none">
                Erfahre mehr über unsere Boutique-Noten
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-stone-300 mr-1" />
        </div>
      </div>

    </div>
  );
};
