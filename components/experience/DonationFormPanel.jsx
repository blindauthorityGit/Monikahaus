import { DONATION_PRESETS } from "./constants";

export default function DonationFormPanel({
    styles,
    donationAmount,
    setDonationAmount,
    selectedTier,
    name,
    setName,
    message,
    setMessage,
    isAnonymous,
    setIsAnonymous,
    selectedSlotId,
    selectedSlotTaken,
    canSubmit,
    status,
    error,
    onSubmit,
}) {
    return (
        <section className={styles.panel}>
            <h2>Complete your donation</h2>
            <p className={styles.panelText}>
                Step 1: choose an available slot. Step 2: select an amount. Step 3: confirm your dedication.
            </p>

            <div className={styles.fieldGroup}>
                <label>Donation amount</label>
                <div className={styles.amountGrid}>
                    {DONATION_PRESETS.map((amount) => (
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
                    onChange={(event) => setDonationAmount(Number(event.target.value) || 0)}
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
                    onChange={(event) => setName(event.target.value)}
                    className={styles.textInput}
                    placeholder="e.g. Anna Müller"
                    disabled={isAnonymous}
                />
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(event) => setIsAnonymous(event.target.checked)}
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
                    onChange={(event) => setMessage(event.target.value)}
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
                onClick={onSubmit}
                disabled={!canSubmit || status === "pending"}
                className={styles.submitBtn}
            >
                {status === "pending" ? "Securing donation…" : "Confirm donation & place ornament"}
            </button>

            {error && <p className={styles.error}>{error}</p>}
            {status === "success" && <p className={styles.success}>Thank you — your ornament now shines on the tree.</p>}
        </section>
    );
}
