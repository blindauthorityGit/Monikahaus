import { AnimatePresence, motion } from "framer-motion";

export default function GuideOverlay({ styles, showGuide, onClose }) {
    return (
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
                    <button type="button" onClick={onClose}>
                        Start donating
                    </button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
