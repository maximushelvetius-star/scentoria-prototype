import React from "react";
import { motion } from "motion/react";
import { BottleColor } from "../utils/recommendation";

interface PerfumeBottleProps {
  color: BottleColor;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  imageUrl?: string;
}

export const PerfumeBottle: React.FC<PerfumeBottleProps> = ({
  color,
  name,
  size = "md",
  animated = true,
  imageUrl,
}) => {
  const [imageError, setImageError] = React.useState(false);
  // Dimensions based on size
  const sizes = {
    xs: { width: 36, height: 50 },
    sm: { width: 48, height: 70 },
    md: { width: 90, height: 130 },
    lg: { width: 140, height: 200 },
    xl: { width: 180, height: 250 },
  };

  const selectedSize = sizes[size] || sizes.md;
  const { width, height } = selectedSize;

  // Animation variants for floating effect
  const floatingVariants = {
    animate: {
      y: [0, -6, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Detect bottle type / family
  const getBottleType = (perfumeName: string) => {
    const lName = perfumeName.toLowerCase();
    if (lName.includes("chanel")) return "chanel";
    if (lName.includes("tom ford") || lName.includes("vanille") || lName.includes("cherry") || lName.includes("oud")) return "tomford";
    if (lName.includes("j'adore") || lName.includes("jadore")) return "jadore";
    if (lName.includes("colonia") || lName.includes("parma")) return "acquadiparma";
    if (lName.includes("santal") || lName.includes("labo")) return "lelabo";
    if (lName.includes("giò") || lName.includes("gio") || lName.includes("armani")) return "armani";
    if (lName.includes("sauvage")) return "sauvage";
    if (lName.includes("aventus") || lName.includes("creed") || lName.includes("irish") || lName.includes("mountain")) return "creed";
    if (lName.includes("baccarat") || lName.includes("rouge") || lName.includes("540")) return "mfk";
    if (lName.includes("hermès") || lName.includes("hermes") || lName.includes("terre")) return "hermes";
    if (lName.includes("opium") || lName.includes("ysl")) return "ysl";
    if (lName.includes("philosykos") || lName.includes("diptyque")) return "diptyque";
    if (lName.includes("xerjoff") || lName.includes("naxos") || lName.includes("pura") || lName.includes("mefisto")) return "xerjoff";
    if (lName.includes("layton") || lName.includes("herod") || lName.includes("marly")) return "marly";
    if (lName.includes("angels' share") || lName.includes("angels share") || lName.includes("kilian")) return "kilian";
    if (lName.includes("prada")) return "prada";
    if (lName.includes("le male") || lName.includes("ultra male") || lName.includes("gaultier")) return "jpg";
    if (lName.includes("chloé") || lName.includes("chloe")) return "chloe";
    if (lName.includes("byredo") || lName.includes("gypsy")) return "byredo";
    if (lName.includes("amouage") || lName.includes("reflection")) return "amouage";
    if (lName.includes("initio") || lName.includes("side effect")) return "initio";
    if (lName.startsWith("lv-") || lName.includes("louis vuitton") || lName.includes("imagination") || lName.includes("afternoon swim") || lName.includes("ombre nomade") || lName.includes("immensité") || lName.includes("gris dior")) return "lv";
    return "generic";
  };

  const bottleType = getBottleType(name);
  const uniqueId = React.useId().replace(/:/g, "-");

  // Extract solid colors for safe fallback rendering
  const fillPrimary = color.accent || "#b87333";
  const liquidFill = color.liquid || "rgba(214, 211, 209, 0.2)";
  const capColor = color.cap || "#1c1917";

  // Shared inner glass tube spray wire with multi-stop chrome gradients
  const SprayTube = () => (
    <>
      {/* Sleek silver nozzle cylinder inside neck */}
      <rect x="57" y="42" width="6" height="10" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" opacity="0.9" />
      {/* Elegant dip tube style glass straw */}
      <line x1="60" y1="46" x2="60" y2="142" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="60" y1="46" x2="60" y2="142" stroke="#1c1917" strokeWidth="0.6" strokeOpacity="0.25" />
      <circle cx="60" cy="46" r="2.5" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" />
    </>
  );

  // Shared brand/name badge text on bottle using elegant curated design fonts
  const LabelText = ({ brand, scent, darkBackground = false, accentColor = "" }: { brand: string; scent: string; darkBackground?: boolean; accentColor?: string }) => (
    <g transform="translate(60, 102)" className="select-none pointer-events-none font-sans">
      <text
        x="0"
        y="-6"
        fill={accentColor || (darkBackground ? "#ffffff" : "#1e293b")}
        fontSize="7"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="1.2"
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        {brand.toUpperCase()}
      </text>
      <text
        x="0"
        y="5"
        fill={darkBackground ? "#cbd5e1" : "#57534e"}
        fontSize="5"
        fontWeight="500"
        textAnchor="middle"
        letterSpacing="0.4"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {scent.substring(0, 14).toUpperCase()}
      </text>
    </g>
  );

  const renderBottleSVG = () => {
    switch (bottleType) {
      case "chanel": // Bleu de Chanel - Square dark solid, cylindrical cap
        return (
          <>
            {/* Magnetic cylindrical cap with subtle double-C logo design on top */}
            <rect x="41" y="14" width="38" height="26" rx="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <line x1="41" y1="27" x2="79" y2="27" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            {/* Double-C logo mock pattern engraved on top of cap */}
            <circle cx="60" cy="20" r="3" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="58" cy="20" r="3" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3" />
            
            {/* Premium electropolished gold/silver collar */}
            <rect x="49" y="40" width="22" height="6" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
            
            {/* Glass body - Softened wide luxury container with dark midnight blue tint */}
            <rect x="18" y="46" width="84" height="106" rx="12" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Core inner liquid glowing with deep ocean reflection */}
            <rect x="23" y="52" width="74" height="94" rx="8" fill={`url(#liquid-grad-${uniqueId})`} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.1" />
            <SprayTube />

            {/* Direct Glass Printed Luxury Typography (No paper label in real life for Bleu de Chanel) */}
            <g transform="translate(60, 92)" className="select-none pointer-events-none text-center">
              <text x="0" y="-8" fill="#ffffff" fillOpacity="0.95" fontSize="7" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.8" }} textAnchor="middle">BLEU</text>
              <text x="0" y="-1" fill="#f8fafc" fillOpacity="0.8" fontSize="4.5" fontWeight="700" style={{ fontFamily: "JetBrains Mono", letterSpacing: "0.8" }} textAnchor="middle">DE</text>
              <text x="0" y="8" fill={`url(#gold-metal-${uniqueId})`} fontSize="8.5" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "2.2" }} textAnchor="middle">CHANEL</text>
              <text x="0" y="16" fill="#94a3b8" fillOpacity="0.6" fontSize="3.2" fontWeight="500" style={{ fontFamily: "monospace", letterSpacing: "1" }} textAnchor="middle">EAU DE PARFUM</text>
            </g>
          </>
        );

      case "tomford": {
        const isLostCherry = name.toLowerCase().includes("cherry");
        const isOudWood = name.toLowerCase().includes("oud");
        return (
          <>
            {/* Chess Queen Rook flat cap with TF custom top plaque */}
            <rect x="40" y="10" width="40" height="14" rx="1.5" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="45" y="24" width="30" height="14" rx="1" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Neck collar (Gold for Vanille, Ruby for Cherry, Smoked metal for Oud) */}
            <rect x="49" y="38" width="22" height="8" fill={isLostCherry ? "#be123c" : isOudWood ? `url(#silver-metal-${uniqueId})` : `url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Stout architectural square body */}
            <path d="M22,46 L98,46 L94,152 L26,152 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* inner juice glowing with specific warm light ray reflections */}
            <path d="M27,51 L93,51 L90,147 L30,147 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Architectural metallic plaque with gold border frame */}
            <rect 
              x="34" y="72" width="52" height="46" rx="2" 
              fill={isLostCherry ? "#4c0519" : isOudWood ? "#1f2937" : `url(#gold-metal-${uniqueId})`} 
              stroke="#1c1917" strokeWidth="1.5" 
            />
            <rect x="37" y="75" width="46" height="40" rx="1.2" fill="none" stroke={isLostCherry ? "#fda4af" : isOudWood ? "#94a3b8" : "#fef08a"} strokeWidth="0.8" strokeOpacity="0.4" />
            
            {/* Real engraved branding text inside label plaque */}
            <LabelText 
              brand="TOM FORD" 
              scent={isLostCherry ? "LOST CHERRY" : isOudWood ? "OUD WOOD" : "TOBACCO V."} 
              darkBackground={true}
              accentColor={isLostCherry ? "#fecdd3" : isOudWood ? "#cbd5e1" : "#fef08a"}
            />
            {/* Small text indicating concentration at the bottom of the plaque */}
            <text x="60" y="112" fill="#ffffff" fillOpacity="0.4" fontSize="3" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">EAU DE PARFUM</text>
          </>
        );
      }

      case "jadore": // Dior J'adore - Tear-drop amphora, golden coils, pearl beacon
        return (
          <>
            {/* Glass pearl cap with glossy radial reflection */}
            <circle cx="60" cy="18" r="10" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <circle cx="58" cy="15" r="4" fill="#ffffff" fillOpacity="0.8" />
            <circle cx="60" cy="18" r="6" fill={`url(#gold-metal-${uniqueId})`} fillOpacity="0.45" />

            {/* Golden coiled tall neck */}
            <path d="M51,28 L69,28 L64,62 L56,62 Z" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Rib rings for the 3D coil feel */}
            <line x1="52.2" y1="33" x2="67.8" y2="33" stroke="#5c3e03" strokeWidth="1.5" />
            <line x1="52.2" y1="33" x2="67.8" y2="33" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="53.4" y1="39" x2="66.6" y2="39" stroke="#5c3e03" strokeWidth="1.5" />
            <line x1="53.4" y1="39" x2="66.6" y2="39" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="54.6" y1="45" x2="65.4" y2="45" stroke="#5c3e03" strokeWidth="1.5" />
            <line x1="54.6" y1="45" x2="65.4" y2="45" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="55.8" y1="51" x2="64.2" y2="51" stroke="#5c3e03" strokeWidth="1.5" />
            <line x1="55.8" y1="51" x2="64.2" y2="51" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="57" y1="57" x2="63" y2="57" stroke="#5c3e03" strokeWidth="1.5" />
            <line x1="57" y1="57" x2="63" y2="57" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" />

            {/* Tear-drop golden glass flacon */}
            <path
              d="M60,62 C42,62 26,104 26,128 C26,146 41,156 60,156 C79,156 94,146 94,128 C94,104 78,62 60,62 Z"
              fill={`url(#bottle-grad-${uniqueId})`}
              stroke="#1c1917"
              strokeWidth="1.8"
            />
            {/* Fluid shimmer */}
            <path
              d="M60,68 C45,68 31,104 31,126 C31,142 44,151 60,151 C76,151 89,142 89,126 C89,104 75,68 60,68 Z"
              fill={`url(#liquid-grad-${uniqueId})`}
            />
            <SprayTube />

            {/* Delicate gold-medallion styled text overlay */}
            <g transform="translate(60, 114)" className="select-none pointer-events-none font-sans">
              <text x="0" y="-8" fill="#eab308" fontSize="5" fontWeight="800" textAnchor="middle" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }}>J'ADORE</text>
              <line x1="-12" y1="-3" x2="12" y2="-3" stroke="#ca8a04" strokeWidth="0.6" strokeOpacity="0.6" />
              <text x="0" y="3" fill="#854d0e" fontSize="4" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "JetBrains Mono" }}>DIOR</text>
            </g>
          </>
        );

      case "acquadiparma": // Acqua di Parma - Classic Art Deco trapezoid with cylinder cap
        return (
          <>
            {/* Cylinder stout cap with warm Bakelite black color */}
            <rect x="40" y="14" width="40" height="32" rx="1" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <line x1="41" y1="20" x2="41" y2="40" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.15" />
            
            {/* Tapered Art Deco body */}
            <path d="M30,46 L90,46 L82,150 Q82,154 78,154 L42,154 Q38,154 38,150 L30,46 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Rich Italian citrus yellow sunshine liquid */}
            <path d="M34,51 L86,51 L80,146 L40,146 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />
 
            {/* Standard circular/crested shield label resembling real fine parchment paper */}
            <rect x="36" y="78" width="48" height="40" rx="3" fill="#fcfbf7" stroke="#1c1917" strokeWidth="1.5" />
            <rect x="39" y="81" width="42" height="34" rx="1.5" fill="none" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1.2" />
            
            {/* Parma Royal Crest detail icon print */}
            <g transform="translate(60, 91)" stroke="#854d0e" strokeWidth="0.8" fill="none" opacity="0.85">
              <path d="M-8,-4 L8,-4 L5,2 L0,5 L-5,2 Z" />
              <circle cx="0" cy="-6" r="1.5" />
            </g>
            
            <LabelText brand="PARMA" scent="COLONIA" accentColor="#1c1917" />
          </>
        );

      case "lelabo": // Le Labo - laboratory apothecary bottle, metal neck
        return (
          <>
            {/* Laboratory screw cap with realistic knurled metal lines */}
            <rect x="46" y="14" width="28" height="22" rx="3" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Knurled diagonal cross-hatch texture on metal cap */}
            <g opacity="0.4">
              <line x1="48" y1="14" x2="54" y2="36" stroke="#000" strokeWidth="0.8" />
              <line x1="52" y1="14" x2="58" y2="36" stroke="#000" strokeWidth="0.8" />
              <line x1="56" y1="14" x2="62" y2="36" stroke="#000" strokeWidth="0.8" />
              <line x1="60" y1="14" x2="66" y2="36" stroke="#000" strokeWidth="0.8" />
              <line x1="64" y1="14" x2="70" y2="36" stroke="#000" strokeWidth="0.8" />
              <line x1="48" y1="36" x2="54" y2="14" stroke="#fff" strokeWidth="0.8" />
              <line x1="52" y1="36" x2="58" y2="14" stroke="#fff" strokeWidth="0.8" />
              <line x1="56" y1="36" x2="62" y2="14" stroke="#fff" strokeWidth="0.8" />
              <line x1="60" y1="36" x2="66" y2="14" stroke="#fff" strokeWidth="0.8" />
            </g>
 
            {/* Glass neck collar */}
            <rect x="50" y="36" width="20" height="12" fill={`url(#silver-metal-${uniqueId})`} fillOpacity="0.45" stroke="#1c1917" strokeWidth="1.8" />
 
            {/* Round shoulders & clean stout apothecary body */}
            <path d="M24,62 C24,50 36,48 48,48 L72,48 C84,48 96,50 96,62 L96,146 C96,152 90,154 84,154 L36,154 C30,154 24,152 24,146 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Liquid inside */}
            <path d="M29,64 C29,56 38,54 48,54 L72,54 C82,54 91,56 91,64 L91,145 C91,148 88,150 84,150 L36,150 C32,150 29,148 29,145 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />
 
            {/* Detailed real apothecary/typewriter label with grid aesthetic & actual specs */}
            <rect x="29" y="70" width="62" height="58" rx="1" fill="#fbfaf7" stroke="#78716c" strokeWidth="1.2" />
            {/* Grid line separators resembling fine security/lab paper */}
            <line x1="33" y1="83" x2="87" y2="83" stroke="#e4e2dd" strokeWidth="0.8" />
            <line x1="33" y1="102" x2="87" y2="102" stroke="#e4e2dd" strokeWidth="0.8" />
            
            <g transform="translate(60, 80)" className="select-none pointer-events-none font-sans text-center">
              <text x="0" y="-3" fill="#0f172a" fontSize="8" fontWeight="bold" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">SANTAL 33</text>
              <text x="0" y="4" fill="#334155" fontSize="3" fontWeight="bold" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">100ml / 3,4 FL.OZ.</text>
            </g>
            {/* Draw alternate text for Another 13 if selected */}
            {name.toUpperCase().includes("ANOTHER") && (
              <g transform="translate(60, 80)" className="select-none pointer-events-none font-sans text-center">
                <text x="0" y="-3" fill="#0f172a" fontSize="8" fontWeight="bold" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">ANOTHER 13</text>
                <text x="0" y="4" fill="#334155" fontSize="3" fontWeight="bold" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">100ml / 3,4 FL.OZ.</text>
              </g>
            )}

            <g transform="translate(60, 98)" className="select-none pointer-events-none font-sans text-center">
              <text x="0" y="0" fill="#475569" fontSize="3" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">Compounded: in New York</text>
              <text x="0" y="4" fill="#475569" fontSize="3" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">Fresh: 12 Months</text>
              <text x="0" y="11" fill="#090d16" fontSize="5.5" fontWeight="950" style={{ fontFamily: "'Space Grotesk'", letterSpacing: "1" }} textAnchor="middle">LE LABO</text>
              <text x="0" y="16" fill="#64748b" fontSize="2.5" style={{ fontFamily: "Courier New, monospace" }} textAnchor="middle">GRASSE - NEW YORK</text>
            </g>
          </>
        );

      case "armani": // Acqua di Giò - Frosted glass rounded vertical rectangle, cylindrical cap
        return (
          <>
            {/* Pebble-like warm grey stone/wood styled cap */}
            <rect x="42" y="14" width="36" height="26" rx="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <line x1="43" y1="20" x2="77" y2="20" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
            <rect x="49" y="40" width="22" height="6" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
 
            {/* Clean rounded frosted block body */}
            <rect x="22" y="46" width="76" height="104" rx="14" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Frosted mineral sand juice */}
            <rect x="27" y="51" width="66" height="94" rx="10" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Direct glass printed chic charcoal grey lettering (No sticker) */}
            <g transform="translate(60, 94)" className="select-none pointer-events-none font-sans text-center">
              <text x="0" y="-8" fill="#1e293b" fontSize="8" fontWeight="800" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">ACQUA DI</text>
              <text x="0" y="0.5" fill="#1e293b" fontSize="12" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "2.5" }} textAnchor="middle">GIÒ</text>
              <line x1="-15" y1="5.5" x2="15" y2="5.5" stroke="#334155" strokeWidth="0.8" strokeOpacity="0.5" />
              <text x="0" y="12" fill="#475569" fontSize="4.5" fontWeight="700" style={{ fontFamily: "monospace", letterSpacing: "1.6" }} textAnchor="middle">GIORGIO ARMANI</text>
            </g>
          </>
        );

      case "sauvage": // Dior Sauvage - Ribbed cylinder, magnetic heavy black cap
        return (
          <>
            {/* Horizontal ribbed heavy dark cap with glossy cylinder lighting */}
            <rect x="43" y="14" width="34" height="28" rx="3" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <line x1="43" y1="21" x2="77" y2="21" stroke="#111827" strokeWidth="1.5" />
            <line x1="43" y1="28" x2="77" y2="28" stroke="#111827" strokeWidth="1.5" />
            <line x1="43" y1="35" x2="77" y2="35" stroke="#111827" strokeWidth="1.5" />

            {/* Silver nozzle */}
            <rect x="49" y="42" width="22" height="4" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" />

            {/* Round cylindrical bottle body with deep ocean-to-midnight-black gradient */}
            <rect x="25" y="46" width="70" height="106" rx="18" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Inside dark blue gradient juice */}
            <rect x="29" y="50" width="62" height="98" rx="14" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Premium glass edge highlights */}
            <line x1="33" y1="52" x2="33" y2="140" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
            <line x1="87" y1="52" x2="87" y2="140" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" strokeLinecap="round" />

            {/* Direct glass printed luxury typography */}
            <g transform="translate(60, 94)" className="select-none pointer-events-none text-center">
              <text x="0" y="-8" fill="#e2e8f0" fillOpacity="0.95" fontSize="9" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "2.2" }} textAnchor="middle">SAUVAGE</text>
              <text x="0" y="3" fill={`url(#silver-metal-${uniqueId})`} fontSize="3" fontWeight="bold" style={{ fontFamily: "monospace", letterSpacing: "1" }} textAnchor="middle">EAU DE PARFUM</text>
              <text x="0" y="14" fill="#94a3b8" fillOpacity="0.7" fontSize="5" fontWeight="700" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">Dior</text>
            </g>
          </>
        );

      case "creed": {
        const isSMW = name.toLowerCase().includes("silver");
        const isGIT = name.toLowerCase().includes("green");
        return (
          <>
            {/* Octagonal Stepped Crown Cap (Glossy silver for SMW, Deep dark forest/silver for GIT/Aventus) */}
            <polygon points="48,15 72,15 76,26 44,26" fill={isSMW ? `url(#silver-metal-${uniqueId})` : `url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="42" y="26" width="36" height="12" rx="1" fill={isSMW ? `url(#silver-metal-${uniqueId})` : `url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />

            {/* Stout heavy glass base */}
            <rect 
              x="18" y="38" width="84" height="114" rx="8" 
              fill={isSMW ? "#ffffff" : isGIT ? "#061f18" : `url(#bottle-grad-${uniqueId})`} 
              stroke="#1c1917" strokeWidth="1.8" 
            />
            
            {isSMW || isGIT ? (
              // Full solid color body
              <rect x="23" y="43" width="74" height="104" rx="4" fill={isSMW ? "#fafafa" : "#0c2c23"} fillOpacity="0.9" />
            ) : (
              // Saffiano leather base wrap + custom cutout silver rider emblem for Aventus
              <>
                <rect x="18" y="90" width="84" height="62" rx="1" fill={`url(#saffiano-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
                <line x1="18" y1="90" x2="102" y2="90" stroke="#1c1917" strokeWidth="1.8" strokeOpacity="0.8" />
                {/* luxury stitch borders */}
                <line x1="18" y1="94" x2="102" y2="94" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,3" strokeOpacity="0.2" />
                <line x1="18" y1="148" x2="102" y2="148" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,3" strokeOpacity="0.2" />
                
                {/* Silver horse and rider emblem on leather wrap */}
                <g transform="translate(60, 122)" fill={`url(#silver-metal-${uniqueId})`} stroke="#000" strokeWidth="0.4">
                  {/* Horse body shape */}
                  <path d="M-8,-4 Q-4,-2 -2,-4 Q0,-6 2,-3 L6,-4 L5,-2 Q8,1 3,2 C0,2 -2,4 -4,1 L-7,2 Z" />
                  {/* Rider silhouette */}
                  <circle cx="-1" cy="-7" r="1.5" />
                  <path d="M-2,-5 L2,-2 L-1,1 Z" />
                </g>
              </>
            )}

            <SprayTube />

            {/* Crest label shield overlay with realistic gold or silver relief */}
            <rect x="34" y="48" width="52" height="36" rx="2" fill={isSMW ? "#fafafa" : isGIT ? "rgba(6, 31, 24, 0.98)" : "#fafafa"} stroke="#1c1917" strokeWidth="1.5" />
            <ellipse cx="60" cy="58" rx="8" ry="6" fill="none" stroke={isSMW ? `url(#silver-metal-${uniqueId})` : `url(#gold-metal-${uniqueId})`} strokeWidth="1" />
            <LabelText 
              brand="CREED" 
              scent={isSMW ? "S. MOUNTAIN" : isGIT ? "GREEN IRISH" : "AVENTUS"} 
              darkBackground={isGIT}
              accentColor={isSMW ? "#475569" : isGIT ? "#10b981" : `#111827`}
            />
          </>
        );
      }

      case "mfk": // Baccarat Rouge - Luxurious solid cube, massive gold fluted cap
        return (
          <>
            {/* Tall fluted gold cap using realistic gold-metal gradient */}
            <rect x="42" y="10" width="36" height="34" rx="2" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Fluted lines of light/shadow */}
            <line x1="48" y1="10" x2="48" y2="44" stroke="#78350f" strokeWidth="1" />
            <line x1="54" y1="10" x2="54" y2="44" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
            <line x1="60" y1="10" x2="60" y2="44" stroke="#78350f" strokeWidth="1" />
            <line x1="66" y1="10" x2="66" y2="44" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
            <line x1="72" y1="10" x2="72" y2="44" stroke="#78350f" strokeWidth="1" />

            {/* Perfect Cube block glass */}
            <rect x="22" y="44" width="76" height="106" rx="4" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Liquid inside */}
            <rect x="27" y="49" width="66" height="96" rx="2" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Big square red crimson label styled like real Baccarat Rouge card */}
            <rect x="33" y="68" width="54" height="54" rx="1.5" fill="#a21caf" stroke="#1c1917" strokeWidth="1.5" />
            {/* Crimson red infill */}
            <rect x="35" y="70" width="50" height="50" rx="1" fill="#701a75" />
            <rect x="37" y="72" width="46" height="46" rx="1" fill="none" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1.2" />
            
            <g transform="translate(60, 95)" className="select-none pointer-events-none text-center">
              <text x="0" y="-12" fill={`url(#gold-metal-${uniqueId})`} fontSize="5.2" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">BACCARAT</text>
              <text x="0" y="-5" fill={`url(#gold-metal-${uniqueId})`} fontSize="4.8" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.8" }} textAnchor="middle">ROUGE 540</text>
              <line x1="-15" y1="-1" x2="15" y2="-1" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="0.8" opacity="0.6" />
              <text x="0" y="6" fill="#fbcfe8" fontSize="3.8" fontWeight="700" style={{ fontFamily: "JetBrains Mono" }} textAnchor="middle">EXTRAIT DE P.</text>
              <text x="0" y="14" fill={`url(#gold-metal-${uniqueId})`} fontSize="4.8" fontWeight="800" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.8" }} textAnchor="middle">M.F.K. PARIS</text>
            </g>
          </>
        );

      case "hermes": // Terre d'Hermès - Solid column, prominent nested 'H' orange base
        return (
          <>
            {/* Flat low black twisting cap */}
            <rect x="43" y="18" width="34" height="20" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Bronze spray details */}
            <rect x="48" y="38" width="24" height="4" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1" />

            {/* Pure architectural rectangular glass block */}
            <rect x="22" y="42" width="76" height="110" rx="3" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />

            {/* Mineral-colored liquid column */}
            <rect x="27" y="47" width="66" height="96" rx="1" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Heavy bottom base segment */}
            <line x1="22" y1="130" x2="98" y2="130" stroke="#1c1917" strokeWidth="1.5" />
            {/* Iconic orange nested 'H' path in the bottom glass */}
            <path d="M 40,152 L 40,136 L 46,136 L 46,143 L 74,143 L 74,136 L 80,136 L 80,152 Z" fill="#f97316" fillOpacity="0.95" stroke="#1c1917" strokeWidth="1.2" />

            {/* Direct glass print elegant labeling */}
            <g transform="translate(60, 94)" className="select-none pointer-events-none text-center">
              <text x="0" y="-8" fill="#1e293b" fontSize="7" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">TERRE</text>
              <text x="0" y="-2" fill="#475569" fontSize="4.5" fontWeight="700" style={{ fontFamily: "monospace" }} textAnchor="middle">D'HERMÈS</text>
              <line x1="-12" y1="2" x2="12" y2="2" stroke="#ea580c" strokeWidth="0.8" />
              <text x="0" y="8" fill="#7c2d12" fontSize="3.5" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">EAU DE TOILETTE</text>
            </g>
          </>
        );

      case "ysl": // Black Opium - Glitter textured square, circular glass pink window
        return (
          <>
            {/* Glossy dark round-edged cap */}
            <rect x="43" y="16" width="34" height="24" rx="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Bold rectangular bottle filled with our dense glitter galaxy pattern! */}
            <rect x="20" y="40" width="80" height="112" rx="12" fill="#1e1b4b" stroke="#1c1917" strokeWidth="1.8" />
            <rect x="20" y="40" width="80" height="112" rx="12" fill={`url(#glitter-${uniqueId})`} opacity="0.9" />

            <SprayTube />

            {/* Iconic glowing pink center circular window with heavy glass outer bezel */}
            <circle cx="60" cy="94" r="23" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.2" />
            <circle cx="60" cy="94" r="20" fill="rgba(244, 63, 94, 0.95)" stroke="#1c1917" strokeWidth="0.8" />
            {/* Inner liquid ring */}
            <circle cx="60" cy="94" r="16" fill={`url(#liquid-grad-${uniqueId})`} />

            {/* Gloss glare on circle */}
            <path d="M 48,84 Q 52,80 60,80 Q 52,88 48,94" fill="#ffffff" fillOpacity="0.4" />

            <g transform="translate(60, 96)" className="select-none pointer-events-none">
              <text x="0" y="-2" fill="#ffffff" fillOpacity="0.95" fontSize="7" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">YSL</text>
              <text x="0" y="5" fill="#fecdd3" fontSize="4.5" fontWeight="bold" style={{ fontFamily: "JetBrains Mono" }} textAnchor="middle">BLACK OPIUM</text>
            </g>
          </>
        );

      case "diptyque": // Philosykos - Oval capsule glass bottle, circular label, black dome cap
        return (
          <>
            {/* Ellipstical flat dome cap */}
            <path d="M43,36 C43,22 77,22 77,36 Z" fill={capColor} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="42" y="34" width="36" height="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />

            {/* Giant elegant oval body */}
            <rect x="23" y="44" width="74" height="110" rx="34" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Liquid inside */}
            <rect x="27" y="48" width="66" height="102" rx="30" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Centered large oval patch with signature branding */}
            <rect x="36" y="66" width="48" height="64" rx="16" fill="#fbfbfa" stroke="#1c1917" strokeWidth="1.5" />
            
            {/* Innermost outline oval */}
            <rect x="38" y="68" width="44" height="60" rx="14" fill="none" stroke="#1c1917" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
            
            {/* Real Diptyque French hand-drawn botanical sketch (Fig forest wood and leaf) */}
            <g transform="translate(60, 108)" stroke="#1e293b" strokeWidth="0.8" fill="none" strokeOpacity="0.6">
              {/* Detailed branch */}
              <path d="M-10,6 Q0,2 10,8" />
              {/* Leaf shapes */}
              <path d="M-6,4 Q-12,-4 -4,-2 Z" fill="#15803d" fillOpacity="0.3" />
              <path d="M4,5 Q10,-2 2,1 Z" fill="#15803d" fillOpacity="0.3" />
              <circle cx="0" cy="4" r="2" fill="#701a75" fillOpacity="0.4" />
            </g>

            {/* Real Diptyque classic printed labeling */}
            <g transform="translate(60, 81)" className="select-none pointer-events-none text-center">
              <text x="0" y="-3" fill="#0f172a" fontSize="5.2" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">DIPTYQUE</text>
              <text x="0" y="1" fill="#475569" fontSize="2.2" style={{ fontFamily: "monospace" }} textAnchor="middle">34 BOULEVARD SG</text>
              <line x1="-14" y1="3" x2="14" y2="3" stroke="#27272a" strokeWidth="0.5" />
              <text x="0" y="9.5" fill="#111827" fontSize="5.8" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.5" }} textAnchor="middle">PHILOSYKOS</text>
              <text x="0" y="14" fill="#334155" fontSize="2.8" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">PARIS</text>
            </g>
          </>
        );

      case "xerjoff": { // Xerjoff - Royal wing flacon, pointed dynamic horn crown cap
        const scentLabel = name.toUpperCase().includes("NAXOS") ? "NAXOS" : name.toUpperCase().includes("ERBA") ? "ERBA PURA" : "ALEXANDRIA";
        return (
          <>
            {/* Xerjoff pointed horn cap - Tall, majestic, highly polished gold */}
            <path d="M43,38 C43,26 49,8 60,4 C71,8 77,26 77,38 Z" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <path d="M49,38 C49,28 53,16 60,12 C67,16 71,28 71,38 Z" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="44" y="34" width="32" height="4" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />

            {/* Royal dynamic wing-carved flacon */}
            <path
              d="M30,48 L38,44 Q60,38 82,44 L90,48 C94,64 92,88 84,104 C74,122 72,138 71,154 L49,154 C48,138 46,122 36,104 C28,88 26,64 30,48 Z"
              fill={`url(#bottle-grad-${uniqueId})`}
              stroke="#1c1917"
              strokeWidth="1.8"
            />
            {/* Inner fill contours with core fluid */}
            <path
              d="M34,51 Q60,43 86,51 C89,64 88,86 80,100 C71,118 69,134 68,149 L52,149 C51,134 49,118 40,100 C32,86 31,64 34,51 Z"
              fill={`url(#liquid-grad-${uniqueId})`}
            />
            <SprayTube />

            {/* Golden Roman central shield sticker with luxury outline */}
            <path d="M44,72 L76,72 L70,111 L60,118 L50,111 Z" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
            <path d="M47,75 L73,75 L68,108 L60,114 L52,108 Z" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.5" />

            {/* Roman engraving and lettering */}
            <g transform="translate(60, 93)" className="select-none pointer-events-none text-center">
              <text x="0" y="-12" fill="#78350f" fontSize="3" fontWeight="900" style={{ fontFamily: "monospace" }} textAnchor="middle">XVII</text>
              <text x="0" y="-4" fill="#090d16" fontSize="6.5" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">XERJOFF</text>
              <line x1="-12" y1="0.5" x2="12" y2="0.5" stroke="#78350f" strokeWidth="0.6" opacity="0.6" />
              <text x="0" y="7" fill="#78350f" fontSize="5.2" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.8" }} textAnchor="middle">{scentLabel}</text>
              <text x="0" y="11" fill="#451a03" fontSize="2.8" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">PARFUM</text>
            </g>
          </>
        );
      }

      case "marly": { // Parfums de Marly - Layton, Herod
        const scentLabel = name.toUpperCase().includes("LAYTON") ? "LAYTON" : name.toUpperCase().includes("HEROD") ? "HEROD" : "HALTANE";
        return (
          <>
            {/* Crown metal heavy cap - Highly polished dome with royal collar */}
            <path d="M46,12 L74,12 L70,34 L50,34 Z" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <circle cx="60" cy="12" r="3" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1" />
            <line x1="50" y1="23" x2="70" y2="23" stroke="#1c1917" strokeWidth="1.2" />

            {/* Luxurious body with solid matte colored flacon */}
            <path d="M22,46 L98,46 L92,148 Q92,154 84,154 L36,154 Q28,154 28,148 L22,46 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <path d="M26,50 L94,50 L89,144 Q89,148 83,148 L37,148 Q31,148 31,144 L26,50 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />
            
            {/* Double Rearing Horses majestic royal crest emboss */}
            <g transform="translate(60, 93)" stroke="currentColor" fill="none" className="text-slate-900 dark:text-amber-100" opacity="0.85">
              {/* Shield outline */}
              <path d="M-13,-12 L13,-12 Q10,13 0,20 Q-10,13 -13,-12 Z" stroke="#1c1917" strokeWidth="1" />
              {/* Left Horse rearing */}
              <path d="M-10,-2 C-9,-12 -3,-8 -5,0 C-7,4 -1,3 -3,8" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
              {/* Right Horse rearing */}
              <path d="M10,-2 C9,-12 3,-8 5,0 C7,4 1,3 3,8" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
              {/* Royal French Crown above horses */}
              <path d="M-5,-15 L5,-15 L7,-19 L2,-17 L0,-21 L-2,-17 L-7,-19 Z" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" />
            </g>

            {/* Real elegant gold/silver embossed labeling */}
            <g transform="translate(60, 134)" className="select-none pointer-events-none text-center">
              <text x="0" y="-12" fill="#1e293b" fillOpacity="0.8" fontSize="3" fontWeight="900" style={{ fontFamily: "monospace", letterSpacing: "0.5" }} textAnchor="middle">PARFUMS DE MARLY</text>
              <text x="0" y="-4" fill="#0f172a" fontSize="7.5" fontWeight="950" style={{ fontFamily: "'Space Grotesk'", letterSpacing: "1.2" }} textAnchor="middle">{scentLabel}</text>
              <text x="0" y="3" fill="#64748b" fontSize="3" fontWeight="700" style={{ fontFamily: "monospace" }} textAnchor="middle">ROYALLY BRANDED</text>
            </g>
          </>
        );
      }

      case "kilian": // Angels' Share
        return (
          <>
            {/* Faceted liquor crystal wide cap resembling a fine crystal carafe topper */}
            <rect x="20" y="16" width="80" height="34" rx="4" fill={`url(#silver-metal-${uniqueId})`} fillOpacity="0.35" stroke="#1c1917" strokeWidth="1.8" />
            {/* Deep crystal light facets */}
            <line x1="30" y1="16" x2="35" y2="50" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.4" />
            <line x1="45" y1="16" x2="47" y2="50" stroke="#1e1b4b" strokeWidth="1.5" strokeOpacity="0.35" />
            <line x1="60" y1="16" x2="60" y2="50" stroke="#ffffff" strokeWidth="2.2" strokeOpacity="0.5" />
            <line x1="75" y1="16" x2="73" y2="50" stroke="#1e1b4b" strokeWidth="1.5" strokeOpacity="0.35" />
            <line x1="90" y1="16" x2="85" y2="50" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.4" />

            {/* Heavy-bottomed crystal tumbler column flacon */}
            <path d="M22,54 L98,54 L90,146 Q90,154 82,154 L38,154 Q30,154 30,146 L22,54 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Golden honey heavy cognac juice */}
            <path d="M25,58 L95,58 L88,142 Q88,146 82,146 L38,146 Q32,146 32,142 L25,58 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Heavy 3D tumbler crystal vertical cuts to mimic real liquor flacon */}
            <line x1="36" y1="58" x2="42" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="48" y1="58" x2="51" y2="140" stroke="#1c1917" strokeWidth="1.6" strokeOpacity="0.25" />
            <line x1="60" y1="58" x2="60" y2="140" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.5" />
            <line x1="72" y1="58" x2="69" y2="140" stroke="#1c1917" strokeWidth="1.6" strokeOpacity="0.25" />
            <line x1="84" y1="58" x2="78" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Centered diamond elegant gold embossed plaque plaque */}
            <polygon points="60,74 86,94 60,114 34,94" fill="#0f172a" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1.5" />
            <polygon points="60,77 82,94 60,111 38,94" fill="none" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="0.8" strokeOpacity="0.5" />
            
            <g transform="translate(60, 96)" className="select-none pointer-events-none text-center">
              <text x="0" y="-7" fill={`url(#gold-metal-${uniqueId})`} fontSize="6" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">KILIAN</text>
              <text x="0" y="1" fill="#f8fafc" fontSize="4.2" fontWeight="700" style={{ fontFamily: "JetBrains Mono" }} textAnchor="middle">ANGELS'</text>
              <text x="0" y="7" fill="#fbcfe8" fontSize="4.5" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.5" }} textAnchor="middle">SHARE</text>
            </g>
          </>
        );

      case "prada": // Prada L'Homme
        return (
          <>
            {/* Cylinder silver/nickel heavy cap */}
            <rect x="42" y="14" width="36" height="26" rx="2" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <line x1="42" y1="20" x2="78" y2="20" stroke="#475569" strokeWidth="1.2" />

            {/* Silver nozzle system */}
            <rect x="48" y="40" width="24" height="6" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />

            {/* Heavy glass column with textured sides */}
            <rect x="22" y="46" width="76" height="106" rx="10" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Real Prada luxury Saffiano cross-hatch leather wrapped side pillars */}
            <rect x="22" y="46" width="10" height="106" fill={`url(#saffiano-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" />
            <rect x="88" y="46" width="10" height="106" fill={`url(#saffiano-${uniqueId})`} stroke="#1c1917" strokeWidth="0.8" />

            {/* Inner silver metallic shield */}
            <rect x="34" y="52" width="52" height="94" rx="4" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Pristine engraved central plaque with precise typography & royal Savoy crest print */}
            <rect x="38" y="72" width="44" height="42" rx="1" fill="#ffffff" stroke="#1c1917" strokeWidth="1.2" />
            <rect x="40" y="74" width="40" height="38" rx="0.5" fill="none" stroke={`url(#silver-metal-${uniqueId})`} strokeWidth="0.6" />
            
            {/* Prada logo typography with detail Savoy Crest */}
            <g transform="translate(60, 89)" className="select-none pointer-events-none text-center">
              <text x="0" y="-7" fill="#0f172a" fontSize="6.8" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">PRADA</text>
              <text x="0" y="-1.5" fill="#475569" fontSize="2.5" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">MILANO</text>
              
              {/* Small Savoy crest shape crown */}
              <path d="M-4,1.5 L4,1.5 L3,4 Q0,3 -3,4 Z" fill="none" stroke="#dc2626" strokeWidth="0.6" />
              
              <text x="0" y="10.5" fill="#1e293b" fontSize="5.2" fontWeight="900" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">L'HOMME</text>
            </g>
          </>
        );

      case "jpg": // JPG Torso
        const isUltraMale = name.toUpperCase().includes("ULTRA");
        return (
          <>
            {/* The iconic aerosol metal spray canister nozzle (no cap in real life!) */}
            <rect x="52" y="16" width="16" height="18" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
            {/* Safety padlock spray pin ring key block */}
            <circle cx="48" cy="23" r="5" fill="none" stroke={isUltraMale ? `url(#gold-metal-${uniqueId})` : `url(#silver-metal-${uniqueId})`} strokeWidth="1.5" />
            <line x1="53" y1="23" x2="48" y2="23" stroke="#1c1917" strokeWidth="1.5" />

            {/* Broad shoulders, styled chest, narrow classic waist male torso */}
            <path
              d="M 60,34 
                 C 52,34 40,36 34,44 
                 C 26,54 28,66 32,70 
                 C 34,72 38,72 36,78 
                 C 34,84 32,94 36,112 
                 C 40,126 36,146 44,152 
                 L 76,152 
                 C 84,146 80,126 84,112 
                 C 88,94 86,84 84,78 
                 C 82,72 86,72 88,70 
                 C 92,66 94,54 86,44 
                 C 80,34 68,34 60,34 Z"
              fill={`url(#bottle-grad-${uniqueId})`}
              stroke="#1c1917"
              strokeWidth="1.8"
            />
            {/* Nautical Marinière Stripes wrapping torso symmetrically */}
            <path d="M 33,52 Q 60,55 87,52 L 86,58 Q 60,61 34,58 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />
            <path d="M 31,66 Q 60,69 89,66 L 88,72 Q 60,75 32,72 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />
            <path d="M 33,80 Q 60,83 87,80 L 86,86 Q 60,89 34,86 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />
            <path d="M 34,94 Q 60,97 86,94 L 85,100 Q 60,103 35,100 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />
            <path d="M 35,108 Q 60,111 85,108 L 84,114 Q 60,117 36,114 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />
            <path d="M 37,122 Q 60,125 83,122 L 82,128 Q 60,131 38,128 Z" fill="#ffffff" fillOpacity="0.4" stroke={isUltraMale ? "#111827" : "#0284c7"} strokeWidth="0.8" />

            <SprayTube />
            
            {/* Pectoral & Abdominals torso outline sketch lines */}
            <path d="M42,50 Q60,54 78,50" stroke="#111827" strokeWidth="1.2" strokeOpacity="0.2" fill="none" />
            <line x1="60" y1="50" x2="60" y2="78" stroke="#111827" strokeWidth="1.2" strokeOpacity="0.2" />

            <g transform="translate(60, 145)" className="select-none pointer-events-none text-center">
              <text x="0" y="0" fill={isUltraMale ? "#be185d" : "#0284c7"} fontSize="6.5" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">{isUltraMale ? "ULTRA MALE" : "LE MALE"}</text>
              <text x="0" y="4" fill="#475569" fontSize="2.8" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">J.P. GAULTIER</text>
            </g>
          </>
        );

      case "chloe": // Chloé
        return (
          <>
            {/* Round glass cap dome with reflection shine */}
            <rect x="46" y="10" width="28" height="18" rx="2" fill="rgba(255,255,255,0.7)" stroke="#1c1917" strokeWidth="1.5" />
            
            {/* Silver metal top shoulder wrap */}
            <path d="M24,42 L96,42 L96,64 L24,64 Z" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* hand-woven pastel beige ribbon bows on neck collar */}
            <ellipse cx="40" cy="36" rx="8" ry="4" fill="#eddcd2" stroke="#1c1917" strokeWidth="1" transform="rotate(-15 40 36)" />
            <ellipse cx="80" cy="36" rx="8" ry="4" fill="#eddcd2" stroke="#1c1917" strokeWidth="1" transform="rotate(15 80 36)" />
            <circle cx="60" cy="36" r="3.5" fill="#dbbfa5" stroke="#1c1917" strokeWidth="1" />

            {/* Vintage vertical pleated flat glass flacon */}
            <rect x="24" y="64" width="72" height="88" rx="2" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="29" y="69" width="62" height="78" rx="1" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Pleasant vertical pleat grooves to create glass refracting lines */}
            <line x1="34" y1="69" x2="34" y2="147" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="40" y1="69" x2="40" y2="147" stroke="#374151" strokeWidth="0.8" strokeOpacity="0.1" />
            <line x1="46" y1="69" x2="46" y2="147" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="52" y1="69" x2="52" y2="147" stroke="#374151" strokeWidth="0.8" strokeOpacity="0.1" />
            <line x1="58" y1="69" x2="58" y2="147" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="64" y1="69" x2="64" y2="147" stroke="#374151" strokeWidth="0.8" strokeOpacity="0.1" />
            <line x1="70" y1="69" x2="70" y2="147" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="76" y1="69" x2="76" y2="147" stroke="#374151" strokeWidth="0.8" strokeOpacity="0.1" />
            <line x1="82" y1="69" x2="82" y2="147" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="88" y1="69" x2="88" y2="147" stroke="#374151" strokeWidth="0.8" strokeOpacity="0.1" />

            {/* Tiny silver engraved center branding plaque */}
            <rect x="42" y="47" width="36" height="12" fill="#ffffff" stroke="#1c1917" strokeWidth="1" />
            <text x="60" y="55" fill="#1c1917" fontSize="5" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.5" }} textAnchor="middle">CHLOÉ</text>
          </>
        );

      case "byredo": { // Byredo - Short plump dome flask
        const scentLabel = name.toUpperCase().includes("GYPSY") ? "GYPSY WATER" : name.toUpperCase().includes("BAL") ? "BAL D'AFRIQUE" : "MOJAVE GHOST";
        return (
          <>
            {/* Perfectly semi-circular smooth shiny black dome cap */}
            <path d="M42,34 C42,16 78,16 78,34 Z" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="40" y="32" width="40" height="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />

            {/* Glass neck collar */}
            <rect x="52" y="36" width="16" height="12" fill={`url(#silver-metal-${uniqueId})`} fillOpacity="0.25" stroke="#1c1917" strokeWidth="1.5" />

            {/* Short cylindrical thick pharmaceutical crystal glass body */}
            <path d="M24,70 C24,54 34,48 48,48 L72,48 C86,48 96,54 96,70 L96,144 C96,150 90,154 84,154 L36,154 C30,154 24,150 24,144 Z" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <path d="M28,72 C28,58 36,54 48,54 L72,54 C84,54 92,58 92,72 L92,143 C92,147 88,150 84,150 L36,150 C32,150 28,147 28,143 Z" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* White minimal textured typography paper sticker label */}
            <rect x="32" y="74" width="56" height="48" rx="1" fill="#fcfbf7" stroke="#3f3f46" strokeWidth="1.2" />
            
            {/* Real minimal spaced clean Helvetica typography look */}
            <g transform="translate(60, 89)" className="select-none pointer-events-none text-center">
              <text x="0" y="-7" fill="#090d16" fontSize="7.8" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "2.4" }} textAnchor="middle">BYREDO</text>
              <line x1="-12" y1="-3.5" x2="12" y2="-3.5" stroke="#111827" strokeWidth="0.8" />
              <text x="0" y="5" fill="#1e293b" fontSize="5" fontWeight="800" style={{ fontFamily: "Space Grotesk", letterSpacing: "0.5" }} textAnchor="middle">{scentLabel}</text>
              <text x="0" y="10" fill="#475569" fontSize="2.8" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">EAU DE PARFUM</text>
            </g>
          </>
        );
      }

      case "amouage": // Amouage - Arabic palace dome
        return (
          <>
            {/* Dome shaped metal palace cap with a glowing core warm ruby gemstone */}
            <path d="M44,32 C44,20 50,14 60,14 C70,14 76,20 76,32 Z" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="42" y="30" width="36" height="4" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
            {/* The single centerpiece red gemstone */}
            <circle cx="60" cy="20" r="2.8" fill="#e11d48" stroke="#000" strokeWidth="0.8" />
            <circle cx="59.2" cy="19.2" r="0.8" fill="#fff" opacity="0.8" />

            {/* Heavy solid luxury square glass flacon */}
            <rect x="18" y="34" width="84" height="118" rx="8" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="23" y="39" width="74" height="108" rx="4" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Iconic Amouage radiant royal sunburst brass crest medal */}
            <circle cx="60" cy="80" r="14" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1" />
            <circle cx="60" cy="80" r="8" fill="#db2777" stroke="none" opacity="0.25" />
            <circle cx="60" cy="80" r="3.5" fill="#7c2d12" />
            {/* Elegant laser ray lines of sunburst */}
            <line x1="60" y1="62" x2="60" y2="98" stroke="#ca8a04" strokeWidth="1.1" strokeOpacity="0.4" />
            <line x1="42" y1="80" x2="78" y2="80" stroke="#ca8a04" strokeWidth="1.1" strokeOpacity="0.4" />

            {/* Real Amouage luxury printed typography */}
            <g transform="translate(60, 114)" className="select-none pointer-events-none text-center">
              <text x="0" y="-1" fill={`url(#gold-metal-${uniqueId})`} fontSize="6" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1" }} textAnchor="middle">AMOUAGE</text>
              <line x1="-12" y1="2.5" x2="12" y2="2.5" stroke="#f59e0b" strokeWidth="0.5" />
              <text x="0" y="8" fill="#fae8ff" fillOpacity="0.9" fontSize="4.8" fontWeight="800" style={{ fontFamily: "JetBrains Mono" }} textAnchor="middle">REFLECTION</text>
            </g>
          </>
        );

      case "initio": // Initio - Masonic gold velvet plate
        return (
          <>
            {/* Matte minimal dark heavy block cap */}
            <rect x="42" y="16" width="36" height="24" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Gold center ring band */}
            <line x1="42" y1="28" x2="78" y2="28" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1.8" />

            {/* Beautiful heavy solid velvet textured dark block container */}
            <rect x="20" y="40" width="80" height="112" rx="4" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="24" y="44" width="72" height="104" rx="2" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* The dramatic gold Masonic symbol crest face plate */}
            <rect x="36" y="68" width="48" height="58" rx="3" fill="#15151b" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1.5" />
            {/* Inside dynamic Masonic gold pattern lines */}
            <polygon points="60,74 70,86 60,98 50,86" fill="none" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1" />
            <circle cx="60" cy="86" r="2.5" fill={`url(#gold-metal-${uniqueId})`} />

            <g transform="translate(60, 112)" className="select-none pointer-events-none text-center">
              <text x="0" y="0" fill={`url(#gold-metal-${uniqueId})`} fontSize="5.2" fontWeight="950" style={{ fontFamily: "Space Grotesk", letterSpacing: "1.2" }} textAnchor="middle">INITIO</text>
              <text x="0" y="4" fill="#cbd5e1" fontSize="3" fontWeight="bold" style={{ fontFamily: "monospace" }} textAnchor="middle">PARFUMS PRIVÉS</text>
            </g>
          </>
        );

      case "lv": { // Louis Vuitton / Christian Dior Privee - Tall cylindrical apothecary
        const isDior = name.toLowerCase().includes("dior");
        return (
          <>
            {/* Thick bold black magnetized cylinder cap */}
            <rect x="42" y="14" width="36" height="28" rx="4" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            {/* Metal collar */}
            <rect x="49" y="42" width="22" height="6" fill={`url(#silver-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />

            {/* Contemporary sleek pharmaceutical tall cylinder body */}
            <rect x="26" y="48" width="68" height="106" rx="20" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            
            {/* Colored premium clear juice fill */}
            <rect x="31" y="53" width="58" height="96" rx="16" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />

            {/* Elegant glass base bottom block */}
            <line x1="28" y1="138" x2="92" y2="138" stroke="#1c1917" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* Clean luxury brand lettering directly on glass (no paper sticker) */}
            <LabelText 
              brand={isDior ? "DIOR" : "L. VUITTON"} 
              scent={isDior ? "GRIS DIOR" : name.toUpperCase().includes("IMMENSITE") ? "L'IMMENSITÉ" : "AFTERNOON S."} 
            />
          </>
        );
      }

      default: // Generic beautifully crafted standard bottle
        return (
          <>
            <rect x="42" y="12" width="36" height="28" rx="6" fill={`url(#cap-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="50" y="40" width="20" height="8" fill={`url(#gold-metal-${uniqueId})`} stroke="#1c1917" strokeWidth="1.5" />
            <rect x="20" y="48" width="80" height="102" rx="14" fill={`url(#bottle-grad-${uniqueId})`} stroke="#1c1917" strokeWidth="1.8" />
            <rect x="26" y="58" width="68" height="84" rx="8" fill={`url(#liquid-grad-${uniqueId})`} />
            <SprayTube />
            <rect x="32" y="78" width="56" height="40" rx="4" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
            <rect x="35" y="81" width="50" height="34" rx="2" fill="none" stroke={`url(#gold-metal-${uniqueId})`} strokeWidth="1" />
            <LabelText brand="SCENTORIA" scent={name} />
          </>
        );
    }
  };

  const bottleContent = imageUrl && !imageError ? (
    <img
      src={imageUrl}
      alt={name}
      onError={() => setImageError(true)}
      referrerPolicy="no-referrer"
      className="object-contain rounded-lg drop-shadow-lg select-none pointer-events-none"
      style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
    />
  ) : (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.12))" }}
    >
      <defs>
        {/* Dynamic cap cylinder lighting gradient */}
        <linearGradient id={`cap-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={capColor} />
          <stop offset="25%" stopColor={capColor === "#1c1917" ? "#3e3a36" : "#e2e8f0"} />
          <stop offset="45%" stopColor={capColor === "#1c1917" ? "#57534e" : "#ffffff"} />
          <stop offset="65%" stopColor={capColor === "#1c1917" ? "#2d2a26" : "#cbd5e1"} />
          <stop offset="100%" stopColor={capColor} />
        </linearGradient>

        {/* Dynamic 3D bottle lighting gradient using primary glass tint */}
        <linearGradient id={`bottle-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color.bottle} stopOpacity={1.0} />
          <stop offset="15%" stopColor={color.bottle} stopOpacity={0.8} />
          <stop offset="50%" stopColor={color.bottle} stopOpacity={0.4} />
          <stop offset="85%" stopColor={color.bottle} stopOpacity={0.8} />
          <stop offset="100%" stopColor={color.bottle} stopOpacity={1.0} />
        </linearGradient>

        {/* Core dynamic liquid backlit luminescence */}
        <radialGradient id={`liquid-grad-${uniqueId}`} cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.45} />
          <stop offset="40%" stopColor={liquidFill === "rgba(214, 211, 209, 0.2)" ? "rgba(245, 245, 244, 0.6)" : liquidFill} stopOpacity={0.8} />
          <stop offset="100%" stopColor={liquidFill === "rgba(214, 211, 209, 0.2)" ? "rgba(245, 245, 244, 0.2)" : liquidFill} stopOpacity={0.55} />
        </radialGradient>

        {/* Electroplated multi-stop Gold metallic */}
        <linearGradient id={`gold-metal-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="20%" stopColor="#fbbf24" />
          <stop offset="40%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="80%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Highly polished Chrome Silver metallic */}
        <linearGradient id={`silver-metal-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#cbd5e1" />
          <stop offset="45%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="90%" stopColor="#475569" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Studio spotlight sweep glass reflection */}
        <linearGradient id={`glass-reflection-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />
          <stop offset="20%" stopColor="#ffffff" stopOpacity={0.05} />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Saffiano cross hatch leather texture for Prada */}
        <pattern id={`saffiano-${uniqueId}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#111827" strokeWidth="0.8" strokeOpacity="0.45" />
          <line x1="0" y1="0" x2="4" y2="0" stroke="#111827" strokeWidth="0.8" strokeOpacity="0.45" />
        </pattern>

        {/* Dense cosmic glitter sparkle cluster for YSL Black Opium */}
        <pattern id={`glitter-${uniqueId}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#f472b6" opacity="0.5" />
          <circle cx="5" cy="5" r="0.4" fill="#ffffff" opacity="0.8" />
          <circle cx="8" cy="2" r="0.8" fill="#fda4af" opacity="0.7" />
          <polygon points="4,2 5,3 4,4 3,3" fill="#be185d" opacity="0.5" />
        </pattern>
      </defs>

      {/* 1. Underlying dynamic bottle shape layer */}
      <g>
        {renderBottleSVG()}
      </g>

      {/* 2. Top-level physical lighting glaze overlays */}
      <g pointerEvents="none" className="select-none">
        {/* Soft thick glassware crystal base lensing refraction */}
        <path d="M 23,138 Q 60,134 97,138 L 97,146 Q 60,154 23,146 Z" fill="#ffffff" opacity="0.12" fillRule="evenodd" />
        <path d="M 28,140 Q 60,137 92,140 Q 92,142 60,144 Q 28,142 28,140 Z" fill="#ffffff" opacity="0.18" fillRule="evenodd" />

        {/* Organic 3D curved glass shoulder glint */}
        <path d="M 26,48 Q 60,40 94,48 L 92,54 Q 60,46 28,54 Z" fill="#ffffff" opacity="0.22" />

        {/* Dynamic Studio spotlight gloss diagonal sweep */}
        <path d="M 23,48 Q 45,45 65,48 L 23,130 Z" fill={`url(#glass-reflection-${uniqueId})`} opacity="0.7" />

        {/* Sharp vertical studio reflections along outer cylindrical edges */}
        <path d="M 25,48 L 27.5,48 L 27.5,148 L 25,148 Z" fill="#ffffff" opacity="0.2" />
        <path d="M 92.5,48 L 95,48 L 95,148 L 92.5,148 Z" fill="#ffffff" opacity="0.08" />
      </g>
    </svg>
  );

  return (
    <div
      style={{ width, height }}
      className="flex items-center justify-center relative cursor-pointer"
    >
      {animated ? (
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="w-full h-full flex items-center justify-center"
        >
          {bottleContent}
        </motion.div>
      ) : (
        bottleContent
      )}
    </div>
  );
};
