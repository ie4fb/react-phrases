import styles from './upper-level-dropdown-list.module.css';
import { useState, useEffect } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';

export default function UpperLevelDropdownList({ upperLevelKeyword, item }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupEnabled, setIsGroupEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [keywordData, setKeywordData] = useState(null);

  const toggleSelected = () => {
    setIsSelected((prevState) => !prevState);
  };
  const toggleGroup = () => {
    setIsGroupEnabled((prevState) => !prevState);
  };
  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <input
            className={styles.checkbox}
            type='checkbox'
            checked={isSelected}
            onChange={toggleSelected}
          />
          <p onClick={toggleExpansion} className={styles.label}>
            {upperLevelKeyword}
          </p>
          <button
            onClick={toggleGroup}
            className={`${styles.group_button} ${
              isGroupEnabled ? styles.flipped : ''
            }`}
          ></button>
          <KeywordStatistics
            data={{ ...item.fileFields, phraseCount: item.phraseCount }}
          />
        </div>
      </div>
    </>
  );
}
