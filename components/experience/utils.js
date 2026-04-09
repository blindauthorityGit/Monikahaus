import { DONATION_TIERS } from "./constants";

export const getTier = (amount = 0) => [...DONATION_TIERS].reverse().find((tier) => amount >= tier.min) ?? DONATION_TIERS[0];

export const getTreeSlots = (count) => {
    const rows = 11;
    const slots = [];
    let id = 0;

    for (let row = 0; row < rows; row += 1) {
        const slotsThisRow = Math.max(3, Math.round((row / (rows - 1)) * 10) + 2);
        for (let col = 0; col < slotsThisRow; col += 1) {
            if (id >= count) break;
            const rowProgress = row / (rows - 1);
            const x = 50 + (col - (slotsThisRow - 1) / 2) * (8.6 - rowProgress * 2.8);
            const y = 10 + rowProgress * 75;
            slots.push({ id, x, y });
            id += 1;
        }
    }

    return slots.slice(0, count);
};

export const normalizeDonation = (entry) => ({
    ...entry,
    id: Number(entry.id),
    sum: Number(entry.sum) || 0,
    donationStatus: entry.donationStatus || "confirmed",
});
