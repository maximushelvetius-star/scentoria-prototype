import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  HelpCircle,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Flame,
  Briefcase,
  Heart,
  Moon,
  Sparkles,
  Smile,
  Zap,
  MoreHorizontal,
  X,
  Anchor
} from "lucide-react";
import { getRecommendation, Fragrance } from "../utils/recommendation";

interface FinderProps {
  initialStepIndex?: number;
  onBack: () => void;
  onFinishFinder: (primary: Fragrance, alternatives: Fragrance[], selectedData: { mood: number; weather: string; occasion: string }) => void;
}

type WeatherOption = "Sonnig" | "Wolkig" | "Regen" | "Kalt" | "Heiss";
type OccasionOption = "Arbeit" | "Date" | "Freizeit" | "Abend" | "Mehr";

export const Finder: React.FC<FinderProps> = ({
  onBack,
  onFinishFinder,
}) => {
  // State for parameters - default to values requested/shown in Column 3
  const [moodValue, setMoodValue] = useState<number>(45); 
  const [selectedWeather, setSelectedWeather] = useState<WeatherOption>("Regen"); 
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionOption>("Arbeit"); 
  const [showHelp, setShowHelp] = useState(false);

  // Radial weather circle options
  // Arrangement matching column 3 layout:
  // Sonnig (Top: -90 deg)
  // Kalt (Top-Right/Right: -10 deg)
  // Regen (Bottom-Right: 55 deg)
  // Heiss (Bottom-Left: 125 deg)
  // Wolkig (Top-Left: 195 deg)
  const radialWeatherOptions: { id: WeatherOption; label: string; icon: React.ReactNode; angle: number; emoji: string }[] = [
    { id: "Sonnig", label: "Sonnig", icon: <Sun size={18} className="stroke-[1.8]" />, angle: -90, emoji: "☀️" }, 
    { id: "Kalt", label: "Kalt", icon: <Snowflake size={18} className="stroke-[1.8]" />, angle: -15, emoji: "❄️" }, 
    { id: "Regen", label: "Regen", icon: <CloudRain size={18} className="stroke-[1.8]" />, angle: 55, emoji: "🌧️" }, 
    { id: "Heiss", label: "Heiss", icon: <Flame size={18} className="stroke-[1.8]" />, angle: 125, emoji: "🔥" }, 
    { id: "Wolkig", label: "Wolkig", icon: <Cloud size={18} className="stroke-[1.8]" />, angle: 195, emoji: "☁️" }, 
  ];

  // Occasions list showing beautifully matched icons matching step 3
  const occasions: { id: OccasionOption; label: string; icon: React.ReactNode }[] = [
    { id: "Arbeit", label: "Arbeit", icon: <Briefcase size={16} className="stroke-[1.8]" /> },
    { id: "Date", label: "Date", icon: <Heart size={16} className="stroke-[1.8]" /> },
    { id: "Freizeit", label: "Freizeit", icon: <Anchor size={16} className="stroke-[1.8]" /> },
    { id: "Abend", label: "Abend", icon: <Moon size={16} className="stroke-[1.8]" /> },
    { id: "Mehr", label: "Mehr", icon: <MoreHorizontal size={16} className="stroke-[1.8]" /> },
  ];

  const handleCalculate = () => {
    const { primary, alternatives } = getRecommendation(moodValue, selectedWeather, selectedOccasion);
    onFinishFinder(primary, alternatives, {
      mood: moodValue,
      weather: selectedWeather,
      occasion: selectedOccasion,
    });
  };

  // Styled Slider track style
  // Light green progress, light blue remainder, beautiful indicator
  const sliderProgressStyle = {
    background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${moodValue}%, #e2e8f0 ${moodValue}%, #e2e8f0 100%)`,
  };

  return (
    <div className="flex flex-col h-full bg-[#fbf9f5] pb-24 overflow-y-auto relative scrollbar-none text-left">
      
      {/* COMPACT APP-NAVBAR */}
      <div className="flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-stone-200/50">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-[#0f2b5c] hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200/40"
        >
          <ArrowLeft size={16} className="stroke-[2.2]" />
        </button>
        <h3 className="font-serif text-base font-bold text-[#0f2b5c]">
          Situation wählen
        </h3>
        <button
          onClick={() => setShowHelp(true)}
          className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-[#0f2b5c] hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200/40"
        >
          <HelpCircle size={16} className="stroke-[2.2]" />
        </button>
      </div>

      <div className="px-5 py-5 space-y-6">
        
        {/* 1. STIMMUNG */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-400">
            1. Stimmung
          </h4>
          <div className="p-4 rounded-3xl bg-white border border-stone-200/50 shadow-xs space-y-3">
            
            {/* Custom slider input bar */}
            <div className="relative pt-1.5 pb-1">
              <input
                type="range"
                min="0"
                max="100"
                value={moodValue}
                onChange={(e) => setMoodValue(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none relative z-10"
                style={sliderProgressStyle}
              />
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white pointer-events-none shadow-md transition-all duration-75 z-20"
                style={{ left: `calc(${moodValue}% - 8px)` }}
              />
            </div>
            
            {/* Labels under slider */}
            <div className="flex justify-between items-center text-[9px] font-extrabold uppercase tracking-wide text-stone-450 leading-none">
              <span className="flex items-center gap-1 text-teal-600">
                <Smile size={12} />
                Entspannt
              </span>
              <span className="flex items-center gap-1 text-blue-800">
                <Zap className="w-3 h-3 text-blue-600 fill-blue-600/10" />
                Selbstbewusst
              </span>
            </div>
          </div>
        </div>

        {/* 2. WETTER (Radial Weather-Wheel in Center) */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-400">
            2. Wetter
          </h4>
          
          <div className="flex items-center justify-center py-5 bg-white rounded-[2rem] border border-stone-250/30 shadow-xs relative overflow-hidden">
            {/* Symmetrical coordinates container */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Symmetrical Dashed Guide Circle inside path */}
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-stone-200/80 pointer-events-none" />
              
              {/* Central Glowing Selected Node (Column 3 specification) */}
              <div className="absolute z-10 w-28 h-28 rounded-full bg-[#0f2b5c] text-white flex flex-col items-center justify-center text-center shadow-lg border border-amber-300/30 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedWeather}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="text-xl mb-0.5 filter drop-shadow">
                      {radialWeatherOptions.find(o => o.id === selectedWeather)?.emoji}
                    </span>
                    <span className="text-xs font-semibold font-serif tracking-wide">{selectedWeather}</span>
                    <span className="text-[7.5px] text-white/50 tracking-wider font-extrabold mt-0.5 uppercase">Aktuell gewählt</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Symmetrical Placement of Orbiting Buttons */}
              {radialWeatherOptions.map((opt) => {
                const isActive = selectedWeather === opt.id;
                
                // radius is 80 px for clean mobile frame centering
                const radius = 80; 
                const rad = (opt.angle * Math.PI) / 180;
                const tx = radius * Math.cos(rad);
                const ty = radius * Math.sin(rad);

                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedWeather(opt.id)}
                    style={{
                      transform: `translate(${tx}px, ${ty}px)`,
                    }}
                    className={`absolute w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-200 z-20 cursor-pointer ${
                      isActive
                        ? "bg-[#0f2b5c] text-white border border-[#0f2b5c] ring-2 ring-blue-200 shadow-md scale-108 font-bold"
                        : "bg-white text-stone-500 border border-stone-200/75 hover:bg-stone-50 hover:text-stone-750"
                    }`}
                  >
                    <div className="scale-90">{opt.icon}</div>
                    <span className="text-[7.5px] font-extrabold uppercase mt-0.5 tracking-tighter">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. ANLASS (horizontal five columns row) */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-400">
            3. Anlass
          </h4>
          
          <div className="grid grid-cols-5 gap-1.5">
            {occasions.map((occ) => {
              const isActive = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all aspect-square border text-center cursor-pointer ${
                    isActive
                      ? "bg-[#0f2b5c] text-white border-[#0f2b5c] shadow-xs font-bold"
                      : "bg-white text-stone-550 border-stone-200/60 hover:bg-stone-50"
                  }`}
                >
                  <div className={`mb-1 transition-transform ${isActive ? "text-amber-200" : "text-stone-400"}`}>
                    {occ.icon}
                  </div>
                  <span className="text-[8.5px] font-extrabold tracking-tighter uppercase leading-none">{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA RECOMMENDATION TRIGGER: SPARKLED BLUE CAPSULE */}
        <div className="pt-3 pb-8">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleCalculate}
            id="btn-finder-get-recommendation"
            className="w-full bg-[#0f2b5c] hover:bg-[#123166] text-white font-bold py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(15,43,92,0.3)] flex items-center justify-center space-x-2 transition-all border border-amber-300/10 uppercase text-xs tracking-widest cursor-pointer text-[#fafbfc]"
          >
            <span className="text-amber-300 text-sm">✦</span>
            <span>Empfehlung finden</span>
          </motion.button>
        </div>
      </div>

      {/* HELP SYSTEM DIALOG */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative text-left"
            >
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4.5 right-4.5 text-stone-450 hover:text-stone-700 cursor-pointer"
              >
                <X size={18} />
              </button>
              <h3 className="font-serif text-base font-bold text-[#0f2b5c] flex items-center gap-1.5 mb-2">
                Situation & Duftnoten
              </h3>
              <p className="text-[11px] text-stone-500 leading-relaxed font-sans mb-4">
                Unser exklusiver Finder stützt sich auf deine emotionale Stimmung, das herrschende Klima und den Anlass deines Tages, um die am besten passende Duft-Signatur auszugeben.
              </p>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-[#0f2b5c] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer text-center"
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
