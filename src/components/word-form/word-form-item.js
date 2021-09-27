import styles from './word-form.module.css';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import { useState } from 'react';
import { data } from '../../config/data';
import PhraseItem from '../phrase-item/phrase-item';

export default function WordForm({ upperLevelKeyword, item, data }) {
  console.log('data', data);
  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSelected = () => {
    setIsSelected((prevState) => !prevState);
  };

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={isSelected}
          onChange={toggleSelected}
        />
        <p onClick={toggleExpansion} className={styles.label}>
          {item}
        </p>
        <KeywordStatistics
          data={{ ...data.fileFields, phraseCount: data.wordPhrases.length }}
        />
      </div>

      {isExpanded ? (
        <div className={styles.children_wrapper}>
          {' '}
          {data.wordPhrases.map((phrase) => (
            <PhraseItem item={phrase} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
