export const TREE_SLOT_COUNT = 75;
export const DONATION_GOAL = 15000;
export const DONATION_PRESETS = [15, 30, 50, 100, 250];

export const DONATION_TIERS = [
    {
        id: "kindle",
        min: 5,
        label: "Kindle Light",
        color: "#A7B7FF",
        glow: "rgba(167,183,255,.45)",
        size: 1,
        description: "A gentle light on the tree.",
    },
    {
        id: "ember",
        min: 25,
        label: "Warm Ember",
        color: "#FF8CA6",
        glow: "rgba(255,140,166,.45)",
        size: 1.08,
        description: "A richer finish with stronger glow.",
    },
    {
        id: "starlit",
        min: 75,
        label: "Starlit Glass",
        color: "#FFD88E",
        glow: "rgba(255,216,142,.5)",
        size: 1.16,
        description: "Premium detail and luminous polish.",
    },
    {
        id: "aurora",
        min: 150,
        label: "Aurora Signature",
        color: "#9EFFE0",
        glow: "rgba(158,255,224,.55)",
        size: 1.24,
        description: "Rare ornament with signature aura.",
    },
];
