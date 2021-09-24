import styles from './phrase-statistics.module.css';

export default function KeywordStatistics({ data }) {
 // console.log(item);
  return (
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
        <b>Траты:</b>&nbsp;{data.spent.toFixed(2)}
      </p>
      <p className={styles.item}>
        <b>Фраз:</b>&nbsp;{data.phraseCount}
      </p>
    </div>
  );
}
