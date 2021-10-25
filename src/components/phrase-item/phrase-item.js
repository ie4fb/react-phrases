import styles from './phrase-item.module.css';
import { useState } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import ListSelector from '../list-selector/list-selector';

export default function PhraseItem({ item, data, upperLevelKeyword, form }) {
  
  const cancelBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container} onClick={cancelBubbling}>
      <div className={styles.info}>
        <div className={styles.statistics_wrapper}>
          <p className={styles.label}>{item.phrase}</p>
        </div>
        <KeywordStatistics data={item.data} />
      </div>
    </div>
  );
}
