import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fetchFirestoreData } from "../config/firebase";
import saveUserDataToFirestore from "../functions/saveDataToFirestore";
import styles from "../styles/Home.module.css";

const TREE_SLOT_COUNT = 75;
const DONATION_GOAL = 15000;

const DONATION_TIERS = [
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

const donationPresets = [15, 30, 50, 100, 250];

const getTier = (amount = 0) => [...DONATION_TIERS].reverse().find((tier) => amount >= tier.min) ?? DONATION_TIERS[0];

const getTreeSlots = (count) => {
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

export default function Home() {
    const reduceMotion = useReducedMotion();
    const [ornaments, setOrnaments] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [donationAmount, setDonationAmount] = useState(30);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    const [showGuide, setShowGuide] = useState(false);
    const [focusedOrnament, setFocusedOrnament] = useState(null);

    const slots = useMemo(() => getTreeSlots(TREE_SLOT_COUNT), []);

    useEffect(() => {
        const seen = window.localStorage.getItem("mk_donation_seen");
        if (!seen) setShowGuide(true);

        fetchFirestoreData(JSON.parse(process.env.NEXT_PUBLIC_LIVE_DB) ? "2025_Live" : "2025_Test")
            .then((data) => {
                const normalized = data
                    .filter((entry) => Number.isFinite(Number(entry.id)))
                    .map((entry) => ({
                        ...entry,
                        id: Number(entry.id),
                        sum: Number(entry.sum) || 0,
                        donationStatus: entry.donationStatus || "confirmed",
                    }));
                setOrnaments(normalized);
            })
            .catch(() => setError("We could not load live donations right now."));
    }, []);

    const occupiedIds = useMemo(() => new Set(ornaments.map((item) => Number(item.id))), [ornaments]);
    const selectedSlotTaken = selectedSlotId !== null && occupiedIds.has(selectedSlotId);

    const confirmed = useMemo(
        () => ornaments.filter((item) => item.donationStatus !== "pending"),
        [ornaments]
    );
    const raised = confirmed.reduce((sum, item) => sum + (Number(item.sum) || 0), 0);
    const fillRate = Math.min(100, Math.round((confirmed.length / TREE_SLOT_COUNT) * 100));
    const goalProgress = Math.min(100, Math.round((raised / DONATION_GOAL) * 100));

    const selectedTier = getTier(donationAmount);

    const recentFeed = useMemo(
        () => [...confirmed].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 6),
        [confirmed]
    );

    const canSubmit = selectedSlotId !== null && !selectedSlotTaken && donationAmount >= 5 && (isAnonymous || name.trim().length > 1);

    const saveDonation = async () => {
        if (!canSubmit) return;

        setStatus("pending");
        setError("");

        const payload = {
            id: selectedSlotId,
            sum: donationAmount,
            name: isAnonymous ? "Anonymous" : name.trim(),
            anon: isAnonymous,
            comment: message.trim(),
            color: selectedTier.color,
            tier: selectedTier.id,
            donationStatus: "confirmed",
            createdAt: new Date().toISOString(),
        };

        try {
            if (!JSON.parse(process.env.NEXT_PUBLIC_DEV || "false")) {
                const success = await saveUserDataToFirestore(payload);
                if (!success) throw new Error("Saving donation failed");
            }

            setOrnaments((prev) => [...prev, payload]);
            setFocusedOrnament(payload.id);
            setSelectedSlotId(null);
            setName("");
            setMessage("");
            setDonationAmount(30);
            setIsAnonymous(false);
            setStatus("success");
        } catch (e) {
            setStatus("error");
            setError("Your donation could not be completed. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Monikahaus · Christmas Giving Tree</title>
                <meta
                    name="description"
                    content="Choose a place on the Monikahaus Christmas tree, place your ornament, and support children and youth with your donation."
                />
            </Head>

            <div className={styles.page}>
                <div className={styles.ambientGlow} aria-hidden />
                <div className={styles.snowLayer} aria-hidden />

                <header className={styles.header}>
                    <p className={styles.kicker}>Monikahaus Winter Campaign</p>
                    <h1>Place a light on the tree.</h1>
                    <p className={styles.subtitle}>
                        Select an open branch spot, choose your donation, and add a meaningful ornament that stays on
                        the tree for everyone to see.
                    </p>
                </header>

                <section className={styles.metrics} aria-label="Donation progress">
                    <article>
                        <span>Raised</span>
                        <strong>€{raised.toLocaleString("de-DE")}</strong>
                        <div className={styles.progressTrack}><div style={{ width: `${goalProgress}%` }} /></div>
                    </article>
                    <article>
                        <span>Ornaments placed</span>
                        <strong>{confirmed.length}</strong>
                        <div className={styles.progressTrack}><div style={{ width: `${fillRate}%` }} /></div>
                    </article>
                    <article>
                        <span>Tree illumination</span>
                        <strong>{fillRate}%</strong>
                        <p className={styles.micro}>Each donation unlocks brighter tree light.</p>
                    </article>
                </section>

                <main className={styles.mainGrid}>
                    <section className={styles.treeCard} aria-label="Interactive donation tree">
                        <div className={styles.treeShell}>
                            <div className={styles.treeBody} style={{ filter: `brightness(${0.78 + fillRate / 250})` }}>
                                {slots.map((slot) => {
                                    const donation = ornaments.find((item) => Number(item.id) === slot.id);
                                    const taken = Boolean(donation);
                                    const tier = donation ? getTier(donation.sum) : selectedTier;
                                    const selected = selectedSlotId === slot.id;

                                    return (
                                        <motion.button
                                            key={slot.id}
                                            type="button"
                                            className={`${styles.slot} ${taken ? styles.taken : styles.free} ${
                                                selected ? styles.selected : ""
                                            }`}
                                            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                                            whileHover={reduceMotion ? undefined : { scale: taken ? 1.02 : 1.1 }}
                                            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                                            onClick={() => {
                                                setSelectedSlotId(slot.id);
                                                if (taken) setFocusedOrnament(slot.id);
                                            }}
                                            aria-label={
                                                taken
                                                    ? `Occupied ornament by ${donation.anon ? "anonymous donor" : donation.name}`
                                                    : `Free slot ${slot.id + 1}`
                                            }
                                        >
                                            {taken ? (
                                                <span
                                                    className={styles.ornament}
                                                    style={{
                                                        background: `radial-gradient(circle at 25% 20%, #fff, ${tier.color} 58%, #162030)`,
                                                        boxShadow: `0 0 24px ${tier.glow}`,
                                                        transform: `scale(${tier.size})`,
                                                    }}
                                                />
                                            ) : (
                                                <span className={styles.emptyDot} />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                        <p className={styles.treeHint}>
                            Tip: use keyboard tab + enter to pick a slot. Occupied ornaments can be opened to read
                            donor dedications.
                        </p>
                    </section>

                    <section className={styles.panel}>
                        <h2>Complete your donation</h2>
                        <p className={styles.panelText}>
                            Step 1: choose an available slot. Step 2: select an amount. Step 3: confirm your
                            dedication.
                        </p>

                        <div className={styles.fieldGroup}>
                            <label>Donation amount</label>
                            <div className={styles.amountGrid}>
                                {donationPresets.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        className={donationAmount === amount ? styles.amountActive : styles.amountBtn}
                                        onClick={() => setDonationAmount(amount)}
                                    >
                                        €{amount}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                min={5}
                                step={5}
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(Number(e.target.value) || 0)}
                                className={styles.amountInput}
                                aria-label="Custom donation amount"
                            />
                            <p className={styles.tierHint}>
                                Tier: <strong>{selectedTier.label}</strong> · {selectedTier.description}
                            </p>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="donorName">Your name</label>
                            <input
                                id="donorName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.textInput}
                                placeholder="e.g. Anna Müller"
                                disabled={isAnonymous}
                            />
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                                Donate anonymously
                            </label>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="message">Dedication (optional)</label>
                            <textarea
                                id="message"
                                className={styles.textArea}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={120}
                                placeholder="A short message to brighten the tree"
                            />
                        </div>

                        <div className={styles.summaryBox}>
                            <p>Selected slot: {selectedSlotId !== null ? `#${selectedSlotId + 1}` : "None"}</p>
                            <p>Status: {selectedSlotTaken ? "Already occupied" : status === "pending" ? "Processing" : "Ready"}</p>
                        </div>

                        <button
                            type="button"
                            onClick={saveDonation}
                            disabled={!canSubmit || status === "pending"}
                            className={styles.submitBtn}
                        >
                            {status === "pending" ? "Securing donation…" : "Confirm donation & place ornament"}
                        </button>

                        {error && <p className={styles.error}>{error}</p>}
                        {status === "success" && <p className={styles.success}>Thank you — your ornament now shines on the tree.</p>}
                    </section>
                </main>

                <section className={styles.feed}>
                    <h3>Recent dedications</h3>
                    <div className={styles.feedGrid}>
                        {recentFeed.map((item) => (
                            <button
                                key={`${item.id}-${item.createdAt}`}
                                className={styles.feedCard}
                                type="button"
                                onClick={() => setFocusedOrnament(Number(item.id))}
                            >
                                <p>{item.anon ? "Anonymous" : item.name}</p>
                                <span>€{Number(item.sum).toLocaleString("de-DE")}</span>
                                {item.comment ? <small>“{item.comment}”</small> : <small>No message provided</small>}
                            </button>
                        ))}
                    </div>
                </section>

                <AnimatePresence>
                    {showGuide && (
                        <motion.aside
                            className={styles.guide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                        >
                            <h4>Welcome to the Giving Tree</h4>
                            <ol>
                                <li>Pick a glowing-free slot on the tree.</li>
                                <li>Choose an amount and optional dedication.</li>
                                <li>Confirm your donation to light the tree together.</li>
                            </ol>
                            <button
                                type="button"
                                onClick={() => {
                                    window.localStorage.setItem("mk_donation_seen", "true");
                                    setShowGuide(false);
                                }}
                            >
                                Start donating
                            </button>
                        </motion.aside>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {focusedOrnament !== null && (() => {
                        const donor = ornaments.find((entry) => Number(entry.id) === Number(focusedOrnament));
                        if (!donor) return null;
                        return (
                            <motion.div className={styles.spotlight} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.article
                                    className={styles.spotlightCard}
                                    initial={{ scale: 0.96, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.98, opacity: 0 }}
                                >
                                    <h4>Ornament #{Number(donor.id) + 1}</h4>
                                    <p>
                                        {donor.anon ? "Anonymous donor" : donor.name} donated €
                                        {Number(donor.sum).toLocaleString("de-DE")}.
                                    </p>
                                    {donor.comment && <p>“{donor.comment}”</p>}
                                    <button type="button" onClick={() => setFocusedOrnament(null)}>
                                        Close
                                    </button>
                                </motion.article>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </>
    );
}
