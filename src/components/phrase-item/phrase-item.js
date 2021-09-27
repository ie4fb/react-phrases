import styles from './phrase-item.module.css';
import { useState } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';

export default function PhraseItem({ item, data }) {
  console.log('phrase', item);
  const [isSelected, setIsSelected] = useState(false);
  const toggleSelected = () => {
    setIsSelected((prevState) => !prevState);
  };
  console.log('stats', item[Object.keys(item)[0]]);

  return (
    <div className={styles.container} onClick={toggleSelected}>
      <div className={styles.info}>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={isSelected}
          onChange={toggleSelected}
          onClick={toggleSelected}
        />
        <div className={styles.statistics_wrapper}>

          <p className={styles.label}>{Object.keys(item)[0]}</p>
        </div>
        <KeywordStatistics data={item[Object.keys(item)[0]]} />
      </div>
    </div>
  );
}
