import { useCallback, useMemo, useState } from "react";
import { fetchFirestoreData } from "../config/firebase";
import saveUserDataToFirestore from "../functions/saveDataToFirestore";
import { DONATION_GOAL, TREE_SLOT_COUNT } from "../components/experience/constants";
import { getTier, normalizeDonation } from "../components/experience/utils";

export default function useDonationExperience() {
    const [ornaments, setOrnaments] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");

    const occupiedIds = useMemo(() => new Set(ornaments.map((item) => Number(item.id))), [ornaments]);

    const confirmed = useMemo(
        () => ornaments.filter((item) => item.donationStatus !== "pending"),
        [ornaments]
    );

    const raised = confirmed.reduce((sum, item) => sum + (Number(item.sum) || 0), 0);
    const fillRate = Math.min(100, Math.round((confirmed.length / TREE_SLOT_COUNT) * 100));
    const goalProgress = Math.min(100, Math.round((raised / DONATION_GOAL) * 100));

    const recentFeed = useMemo(
        () => [...confirmed].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 6),
        [confirmed]
    );

    const loadDonations = useCallback(async () => {
        try {
            const data = await fetchFirestoreData(JSON.parse(process.env.NEXT_PUBLIC_LIVE_DB) ? "2025_Live" : "2025_Test");
            setOrnaments(data.filter((entry) => Number.isFinite(Number(entry.id))).map(normalizeDonation));
        } catch (loadError) {
            setError("We could not load live donations right now.");
        }
    }, []);

    const submitDonation = useCallback(async ({ selectedSlotId, donationAmount, name, message, isAnonymous }) => {
        setStatus("pending");
        setError("");

        const tier = getTier(donationAmount);
        const payload = {
            id: selectedSlotId,
            sum: donationAmount,
            name: isAnonymous ? "Anonymous" : name.trim(),
            anon: isAnonymous,
            comment: message.trim(),
            color: tier.color,
            tier: tier.id,
            donationStatus: "confirmed",
            createdAt: new Date().toISOString(),
        };

        try {
            if (!JSON.parse(process.env.NEXT_PUBLIC_DEV || "false")) {
                const success = await saveUserDataToFirestore(payload);
                if (!success) throw new Error("Saving donation failed");
            }

            setOrnaments((prev) => [...prev, payload]);
            setStatus("success");
            return payload;
        } catch (submitError) {
            setStatus("error");
            setError("Your donation could not be completed. Please try again.");
            return null;
        }
    }, []);

    return {
        ornaments,
        occupiedIds,
        confirmed,
        raised,
        fillRate,
        goalProgress,
        recentFeed,
        status,
        error,
        loadDonations,
        submitDonation,
        setStatus,
        setError,
    };
}
