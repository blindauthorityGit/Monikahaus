import { DONATION_TIERS } from "./constants";

export default function TierLegend({ styles }) {
    return (
        <section className={styles.legend} aria-label="Donation tier legend">
            <h3>Ornament tiers</h3>
            <div className={styles.legendGrid}>
                {DONATION_TIERS.map((tier) => (
                    <article key={tier.id}>
                        <span style={{ background: tier.color, boxShadow: `0 0 16px ${tier.glow}` }} />
                        <div>
                            <p>{tier.label}</p>
                            <small>From €{tier.min}</small>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
