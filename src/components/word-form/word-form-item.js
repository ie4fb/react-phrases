import styles from './word-form.module.css';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import { useState } from 'react';
import { data } from '../../config/data';
import PhraseItem from '../phrase-item/phrase-item';

export default function WordForm({ upperLevelKeyword, item, data, onTop }) {
  console.log('data', data);
  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSelected = (e) => {
    e.stopPropagation();
    setIsSelected((prevState) => !prevState);
  };

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div
      onClick={toggleExpansion}
      className={`${styles.container} ${onTop ? styles.container_onTop : ''}`}
    >
      <div className={styles.info}>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={isSelected}
          onClick={toggleSelected}
        />
        <p className={styles.label}>{item}</p>
        <KeywordStatistics
          data={{ ...data.fileFields, phraseCount: data.wordPhrases.length }}
        />
      </div>

      {isExpanded ? (
        <div className={styles.children_wrapper}>
          {' '}
          {data.wordPhrases.map((phrase, index) => (
            <PhraseItem key={`${phrase} ${index}`} item={phrase} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
