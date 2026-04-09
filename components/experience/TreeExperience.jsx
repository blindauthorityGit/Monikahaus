import { motion } from "framer-motion";
import { getTier } from "./utils";

export default function TreeExperience({
    styles,
    slots,
    ornaments,
    fillRate,
    selectedSlotId,
    selectedTier,
    reduceMotion,
    onSelectSlot,
    onOpenOrnament,
}) {
    return (
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
                                className={`${styles.slot} ${taken ? styles.taken : styles.free} ${selected ? styles.selected : ""}`}
                                style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                                whileHover={reduceMotion ? undefined : { scale: taken ? 1.02 : 1.1 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                                onClick={() => {
                                    onSelectSlot(slot.id);
                                    if (taken) onOpenOrnament(slot.id);
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
                Tip: use keyboard tab + enter to pick a slot. Occupied ornaments can be opened to read donor dedications.
            </p>
        </section>
    );
}
