import { AnimatePresence, motion } from "framer-motion";

export default function OrnamentSpotlight({ styles, donor, onClose }) {
    return (
        <AnimatePresence>
            {donor && (
                <motion.div className={styles.spotlight} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.article
                        className={styles.spotlightCard}
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                    >
                        <h4>Ornament #{Number(donor.id) + 1}</h4>
                        <p>
                            {donor.anon ? "Anonymous donor" : donor.name} donated €{Number(donor.sum).toLocaleString("de-DE")}.
                        </p>
                        {donor.comment && <p>“{donor.comment}”</p>}
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </motion.article>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
