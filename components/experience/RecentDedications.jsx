export default function RecentDedications({ styles, recentFeed, onOpenOrnament }) {
    return (
        <section className={styles.feed}>
            <h3>Recent dedications</h3>
            <div className={styles.feedGrid}>
                {recentFeed.map((item) => (
                    <button
                        key={`${item.id}-${item.createdAt}`}
                        className={styles.feedCard}
                        type="button"
                        onClick={() => onOpenOrnament(Number(item.id))}
                    >
                        <p>{item.anon ? "Anonymous" : item.name}</p>
                        <span>€{Number(item.sum).toLocaleString("de-DE")}</span>
                        {item.comment ? <small>“{item.comment}”</small> : <small>No message provided</small>}
                    </button>
                ))}
            </div>
        </section>
    );
}
