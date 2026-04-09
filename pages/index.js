import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useReducedMotion } from "framer-motion";
import useDonationExperience from "../hooks/useDonationExperience";
import styles from "../styles/Home.module.css";
import { TREE_SLOT_COUNT } from "../components/experience/constants";
import { getTier, getTreeSlots } from "../components/experience/utils";
import ProgressMetrics from "../components/experience/ProgressMetrics";
import TreeExperience from "../components/experience/TreeExperience";
import DonationFormPanel from "../components/experience/DonationFormPanel";
import RecentDedications from "../components/experience/RecentDedications";
import GuideOverlay from "../components/experience/GuideOverlay";
import OrnamentSpotlight from "../components/experience/OrnamentSpotlight";
import TierLegend from "../components/experience/TierLegend";
import TrustBar from "../components/experience/TrustBar";

export default function Home() {
    const reduceMotion = useReducedMotion();
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [donationAmount, setDonationAmount] = useState(30);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [focusedOrnament, setFocusedOrnament] = useState(null);

    const {
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
    } = useDonationExperience();

    const slots = useMemo(() => getTreeSlots(TREE_SLOT_COUNT), []);

    useEffect(() => {
        const seen = window.localStorage.getItem("mk_donation_seen");
        if (!seen) setShowGuide(true);
        loadDonations();
    }, [loadDonations]);

    const selectedSlotTaken = selectedSlotId !== null && occupiedIds.has(selectedSlotId);
    const selectedTier = getTier(donationAmount);
    const canSubmit = selectedSlotId !== null && !selectedSlotTaken && donationAmount >= 5 && (isAnonymous || name.trim().length > 1);

    const focusedDonor = focusedOrnament !== null
        ? ornaments.find((entry) => Number(entry.id) === Number(focusedOrnament))
        : null;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        const payload = await submitDonation({
            selectedSlotId,
            donationAmount,
            name,
            message,
            isAnonymous,
        });

        if (!payload) return;

        setFocusedOrnament(payload.id);
        setSelectedSlotId(null);
        setName("");
        setMessage("");
        setDonationAmount(30);
        setIsAnonymous(false);
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
                        Select an open branch spot, choose your donation, and add a meaningful ornament that stays on the tree for everyone to see.
                    </p>
                </header>

                <ProgressMetrics
                    styles={styles}
                    raised={raised}
                    confirmedCount={confirmed.length}
                    fillRate={fillRate}
                    goalProgress={goalProgress}
                />

                <TrustBar styles={styles} />

                <main className={styles.mainGrid}>
                    <TreeExperience
                        styles={styles}
                        slots={slots}
                        ornaments={ornaments}
                        fillRate={fillRate}
                        selectedSlotId={selectedSlotId}
                        selectedTier={selectedTier}
                        reduceMotion={reduceMotion}
                        onSelectSlot={setSelectedSlotId}
                        onOpenOrnament={setFocusedOrnament}
                    />

                    <div className={styles.panelStack}>
                        <DonationFormPanel
                            styles={styles}
                            donationAmount={donationAmount}
                            setDonationAmount={setDonationAmount}
                            selectedTier={selectedTier}
                            name={name}
                            setName={setName}
                            message={message}
                            setMessage={setMessage}
                            isAnonymous={isAnonymous}
                            setIsAnonymous={setIsAnonymous}
                            selectedSlotId={selectedSlotId}
                            selectedSlotTaken={selectedSlotTaken}
                            canSubmit={canSubmit}
                            status={status}
                            error={error}
                            onSubmit={handleSubmit}
                        />
                        <TierLegend styles={styles} />
                    </div>
                </main>

                <RecentDedications styles={styles} recentFeed={recentFeed} onOpenOrnament={setFocusedOrnament} />

                <GuideOverlay
                    styles={styles}
                    showGuide={showGuide}
                    onClose={() => {
                        window.localStorage.setItem("mk_donation_seen", "true");
                        setShowGuide(false);
                    }}
                />

                <OrnamentSpotlight styles={styles} donor={focusedDonor} onClose={() => {
                    setFocusedOrnament(null);
                    if (status === "success") setStatus("idle");
                }} />
            </div>
        </>
    );
}
