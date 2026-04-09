export default function ProgressMetrics({ raised, confirmedCount, fillRate, goalProgress, styles }) {
    return (
        <section className={styles.metrics} aria-label="Donation progress">
            <article>
                <span>Raised</span>
                <strong>€{raised.toLocaleString("de-DE")}</strong>
                <div className={styles.progressTrack}>
                    <div style={{ width: `${goalProgress}%` }} />
                </div>
            </article>
            <article>
                <span>Ornaments placed</span>
                <strong>{confirmedCount}</strong>
                <div className={styles.progressTrack}>
                    <div style={{ width: `${fillRate}%` }} />
                </div>
            </article>
            <article>
                <span>Tree illumination</span>
                <strong>{fillRate}%</strong>
                <p className={styles.micro}>Each donation unlocks brighter tree light.</p>
            </article>
        </section>
    );
}
