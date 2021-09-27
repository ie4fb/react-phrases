import styles from './phrase-statistics.module.css';

export default function KeywordStatistics({ data }) {
  return (
    <>
      {data ? (
        <div className={styles.container}>
          <p className={styles.item}>
            <b>Показы:</b>&nbsp;{data.impressions}
          </p>
          <p className={styles.item}>
            <b>Клики:</b>&nbsp;{data.clicks}
          </p>
          <p className={styles.item}>
            <b>Конверсии:</b>&nbsp;{data.conversions}
          </p>
          <p className={styles.item}>
            <b>Траты:</b>&nbsp;{parseInt(data.spent).toFixed(2)}
          </p>
          {data.phraseCount ? (
            <p className={styles.item}>
              <b>Фраз:</b>&nbsp;{data.phraseCount}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
