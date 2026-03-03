// Cat SVG character system with color variants
// SVG templates use #CFCFCF (fur) and #464646 (stripes) as replacement tokens

export interface CatColor {
  name: string;
  fur: string;
  stripe: string;
  features?: string;
  yarn: string;
}

export const CAT_COLORS: CatColor[] = [
  { name: "grey", fur: "#CFCFCF", stripe: "#464646", yarn: "#D2131A" },
  {
    name: "black",
    fur: "#2A2A2A",
    stripe: "#1A1A1A",
    features: "white",
    yarn: "#7B61FF",
  },
  { name: "tan", fur: "#D2A679", stripe: "#8B6D4A", yarn: "#2E8B57" },
  { name: "white", fur: "#F0F0F0", stripe: "#B0B0B0", yarn: "#FF69B4" },
  { name: "orange", fur: "#E8883A", stripe: "#B86520", yarn: "#1E90FF" },
];

const SVG_NEUTRAL = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 14.5V20.5L4.5 22.5H16.5L18.5 20.5V14.5L17.5 13.5V10.5L16.5 9.5V7.5L15.5 7V5.5L14.5 4.5V3.5L13.5 2.5L11.5 4.5H9.5L7.5 2.5L6.5 3V4.5L5.5 5.5V6.5L4.5 7.5V9.5L3.5 10.5V13.5L2.5 14.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M22 22.5H17.5L18 20.5H20.5L21.5 20V18.5L20.5 17.5L22 16.3125L23.5 17.5V20.5L22 22.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M3 15V16L4 15H3Z" stroke="#464646"/>
<path d="M18 15V16L17 15H18Z" stroke="#464646"/>
<path d="M3 18V19L4 18H3Z" stroke="#464646"/>
<path d="M18 18V19L17 18H18Z" stroke="#464646"/>
<path d="M12.5 20.5V23H14.5V19" stroke="black"/>
<line x1="13.5" y1="23" x2="13.5" y2="21" stroke="#CFCFCF"/>
<path d="M7.5 19V23H9.5V20.5" stroke="black"/>
<line x1="8.5" y1="23" x2="8.5" y2="21" stroke="#CFCFCF"/>
<rect x="7" y="8" width="1" height="1" fill="black"/>
<rect x="13" y="8" width="1" height="1" fill="black"/>
<path d="M11.8535 9.14648L11.1465 9.85352L10.5 9.20703L9.85352 9.85352L9.14648 9.14648L10.5 7.79297L11.8535 9.14648Z" fill="black"/>
<path d="M9 9H10V10H9V9Z" fill="black"/>
<path d="M11 9H12V10H11V9Z" fill="black"/>
<path d="M10 8H11V9H10V8Z" fill="black"/>
<path d="M6 9H7V10H6V9Z" fill="#DFB9C7"/>
<path d="M14 9H15V10H14V9Z" fill="#DFB9C7"/>
</svg>`;

const SVG_WAITING_0 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 14.5V20.5L4.5 22.5H16.5L18.5 20.5V14.5L17.5 13.5V10.5L16.5 9.5V7.5L15.5 7V5.5L14.5 4.5V3.5L13.5 2.5L11.5 4.5H9.5L7.5 2.5L6.5 3V4.5L5.5 5.5V6.5L4.5 7.5V9.5L3.5 10.5V13.5L2.5 14.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M22 22.5H17.5L18 20.5H20.5L21.5 20V18.5L20.5 17.5L22 16.3125L23.5 17.5V20.5L22 22.5Z" fill="#CFCFCF" stroke="black"/>
<rect x="7" y="8" width="1" height="1" fill="black"/>
<rect x="6" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="14" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="9" y="9" width="1" height="1" fill="black"/>
<rect x="11" y="9" width="1" height="1" fill="black"/>
<rect x="10" y="8" width="1" height="1" fill="black"/>
<rect x="13" y="8" width="1" height="1" fill="black"/>
<path d="M9.5 9.5L10.5 8.5L11.5 9.5" stroke="black"/>
<path d="M3 15V16L4 15H3Z" stroke="#464646"/>
<path d="M18 15V16L17 15H18Z" stroke="#464646"/>
<path d="M3 18V19L4 18H3Z" stroke="#464646"/>
<path d="M18 18V19L17 18H18Z" stroke="#464646"/>
<path d="M12.5 21.5V23.5H14.5V21.5" stroke="black"/>
<line x1="13.5" y1="23" x2="13.5" y2="21" stroke="#CFCFCF"/>
<path d="M4.96691 23C4.4614 22.1878 3.60203 20.466 4.20864 20.0761C4.81526 19.6863 5.97794 20.8883 6.48346 21.5381H8" stroke="black"/>
<path d="M19 8.5L14 12.5L16 14.5L20 11L20.5 9.5L20 8L19 8.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M10.5 11L17 10.5L18 13L16 16.5L10.5 11Z" fill="#CFCFCF"/>
</svg>`;

const SVG_WAITING_1 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 14.5V20.5L4.5 22.5H16.5L18.5 20.5V14.5L17.5 13.5V10.5L16.5 9.5V7.5L15.5 7V5.5L14.5 4.5V3.5L13.5 2.5L11.5 4.5H9.5L7.5 2.5L6.5 3V4.5L5.5 5.5V6.5L4.5 7.5V9.5L3.5 10.5V13.5L2.5 14.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M22 22.5H17.5L18 20.5H20.5L21.5 20V18.5L20.5 17.5L22 16.3125L23.5 17.5V20.5L22 22.5Z" fill="#CFCFCF" stroke="black"/>
<rect x="7" y="8" width="1" height="1" fill="black"/>
<rect x="6" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="14" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="9" y="9" width="1" height="1" fill="black"/>
<rect x="11" y="9" width="1" height="1" fill="black"/>
<rect x="10" y="8" width="1" height="1" fill="black"/>
<rect x="13" y="8" width="1" height="1" fill="black"/>
<path d="M9.5 9.5L10.5 8.5L11.5 9.5" stroke="black"/>
<path d="M3 15V16L4 15H3Z" stroke="#464646"/>
<path d="M18 15V16L17 15H18Z" stroke="#464646"/>
<path d="M3 18V19L4 18H3Z" stroke="#464646"/>
<path d="M18 18V19L17 18H18Z" stroke="#464646"/>
<path d="M12.5 21.5V23.5H14.5V21.5" stroke="black"/>
<line x1="13.5" y1="23" x2="13.5" y2="21" stroke="#CFCFCF"/>
<path d="M4.96691 23C4.4614 22.1878 3.60203 20.466 4.20864 20.0761C4.81526 19.6863 5.97794 20.8883 6.48346 21.5381H8" stroke="black"/>
<path d="M19.9091 9.36475L13.7686 11.1798L14.865 13.7871L19.8907 12.0573L20.9202 10.8572L21.0239 9.27951L19.9091 9.36475Z" fill="#CFCFCF" stroke="black"/>
<path d="M10.5 11L17 10.5L18 13L16 16.5L10.5 11Z" fill="#CFCFCF"/>
</svg>`;

const SVG_WORKING_0 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14.5V20.5L5.5 22.5H17.5L19.5 20.5V14.5L18.5 13.5V10.5L17.5 9.5V7.5L16.5 7V5.5L15.5 4.5V3.5L14.5 2.5L13 4.5H9L7.5 2.5L6.5 3V4.5L5.5 5.5V6.5L4.5 7.5V9.5V10.5V13.5L3.5 14.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M21 22.5H18.5V20.5H19.5L20.5 20V18.5L19.5 17.5L21 16.3125L22.5 17.5V20.5L21 22.5Z" fill="#CFCFCF" stroke="black"/>
<rect x="7" y="8" width="1" height="1" fill="black"/>
<rect x="6" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="14" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="9" y="9" width="1" height="1" fill="black"/>
<rect x="11" y="9" width="1" height="1" fill="black"/>
<rect x="10" y="8" width="1" height="1" fill="black"/>
<rect x="13" y="8" width="1" height="1" fill="black"/>
<path d="M9.5 9.5L10.5 8.5L11.5 9.5" stroke="black"/>
<path d="M4 15V16L5 15H4Z" stroke="#464646"/>
<path d="M19 15V16L18 15H19Z" stroke="#464646"/>
<path d="M4 18V19L5 18H4Z" stroke="#464646"/>
<path d="M19 18V19L18 18H19Z" stroke="#464646"/>
<path d="M12.5 20V23.5H14.5V19" stroke="black"/>
<line x1="13.5" y1="23" x2="13.5" y2="21" stroke="#CFCFCF"/>
<circle cx="8" cy="15" r="3.5" fill="#D2131A" stroke="black"/>
<path d="M4.5 13.5C5.05228 13.5 5.5 13.9477 5.5 14.5C5.5 15.0523 5.05228 15.5 4.5 15.5H2.5V14.667C2.5 14.0227 3.02266 13.5 3.66699 13.5H4.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M11 15.2L14.5 14L15.5 16L12 17.5L11 15.2Z" fill="#CFCFCF"/>
<path d="M14.5 14L11 15.2L12 17.5L15.5 16" stroke="black"/>
<path d="M5.27516 22.0781C4.60849 21.2448 3.47516 19.4781 4.27516 19.0781C5.07516 18.6781 6.60849 19.9114 7.27516 20.5781H9.27516" stroke="black"/>
<path d="M6 18C4.33333 18.5 1 19.7 1 20.5C1 21.5 1.5 23.5 3 24C4.2 24.4 7.5 24.1667 9 24C9.66667 23.8333 11 23.4 11 23C11 22.5 10.5 21.5 11.5 21C12.5 20.5 14.5 20 15 21C15.4 21.8 15.8333 23.3333 16 24H18" stroke="#D2131A"/>
</svg>`;

const SVG_WORKING_1 = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14.5V20.5L5.5 22.5H17.5L19.5 20.5V14.5L18.5 13.5V10.5L17.5 9.5V7.5L16.5 7V5.5L15.5 4.5V3.5L14.5 2.5L13 4.5H9L7.5 2.5L6.5 3V4.5L5.5 5.5V6.5L4.5 7.5V9.5V10.5V13.5L3.5 14.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M21 22.5H18.5V20.5H19.5L20.5 20V18.5L19.5 17.5L21 16.3125L22.5 17.5V20.5L21 22.5Z" fill="#CFCFCF" stroke="black"/>
<rect x="7" y="8" width="1" height="1" fill="black"/>
<rect x="6" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="14" y="9" width="1" height="1" fill="#DFB9C7"/>
<rect x="9" y="9" width="1" height="1" fill="black"/>
<rect x="11" y="9" width="1" height="1" fill="black"/>
<rect x="10" y="8" width="1" height="1" fill="black"/>
<rect x="13" y="8" width="1" height="1" fill="black"/>
<path d="M9.5 9.5L10.5 8.5L11.5 9.5" stroke="black"/>
<path d="M4 15V16L5 15H4Z" stroke="#464646"/>
<path d="M19 15V16L18 15H19Z" stroke="#464646"/>
<path d="M4 18V19L5 18H4Z" stroke="#464646"/>
<path d="M19 18V19L18 18H19Z" stroke="#464646"/>
<path d="M12.8576 19.7838L11.9517 23.1645L13.8836 23.6822L15.0483 19.3355" stroke="black"/>
<line x1="13.0471" y1="22.9404" x2="13.5647" y2="21.0086" stroke="#CFCFCF"/>
<circle cx="9" cy="16" r="3.5" fill="#D2131A" stroke="black"/>
<path d="M5.5 13.5C6.05228 13.5 6.5 13.9477 6.5 14.5C6.5 15.0523 6.05228 15.5 5.5 15.5H3.5V14.667C3.5 14.0227 4.02266 13.5 4.66699 13.5H5.5Z" fill="#CFCFCF" stroke="black"/>
<path d="M11 16.2L14.5 15L15.5 17L12 18.5L11 16.2Z" fill="#CFCFCF"/>
<path d="M14.5 15L11 16.2L12 18.5L15.5 17" stroke="black"/>
<path d="M5.00001 22.5C4.33334 21.6667 3.2 20.9 4 20.5C4.8 20.1 6.60849 19.9115 7.27516 20.5781H9.27516" stroke="black"/>
<path d="M6 18C4.33333 18.5 1 19.7 1 20.5C1 21.5 1.5 23.5 3 24C4.2 24.4 7.5 24.1667 9 24C9.66667 23.8333 11 23.4 11 23C11 22.5 10.5 21.5 11.5 21C12.5 20.5 14.5 20 15 21C15.4 21.8 15.8333 23.3333 16 24H18" stroke="#D2131A"/>
</svg>`;

export const CAT_SVGS = {
  idle: SVG_NEUTRAL,
  waiting: [SVG_WAITING_0, SVG_WAITING_1],
  working: [SVG_WORKING_0, SVG_WORKING_1],
};

export interface CharacterData {
  color: CatColor;
  seed: number;
}

function rng(seed: number) {
  // Mix the seed to avoid clustering with small sequential values
  let s = ((seed + 0x6d2b79f5) | 0) ^ (seed << 13);
  s = Math.abs(((s * 16807 + 0) % 2147483647) | 0) || 1;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function generateCharacter(seed: number): CharacterData {
  const rand = rng(seed);
  const color = pick(CAT_COLORS, rand);
  return { color, seed };
}

function colorize(svg: string, color: CatColor): string {
  let result = svg
    .replaceAll("#CFCFCF", color.fur)
    .replaceAll("#464646", color.stripe)
    .replaceAll("#D2131A", color.yarn);
  if (color.features) {
    result = result.replaceAll('fill="black"', `fill="${color.features}"`);
  }
  return result;
}

export function getSvg(
  character: CharacterData,
  state: "idle" | "working" | "waiting_for_input",
  frame: number,
): string {
  let raw: string;
  switch (state) {
    case "working":
      raw = CAT_SVGS.working[frame % 2];
      break;
    case "waiting_for_input":
      raw = CAT_SVGS.waiting[frame % 2];
      break;
    default:
      raw = CAT_SVGS.idle;
      break;
  }
  return colorize(raw, character.color);
}
