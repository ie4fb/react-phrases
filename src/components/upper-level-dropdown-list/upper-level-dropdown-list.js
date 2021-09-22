import styles from './upper-level-dropdown-list.module.css';
import { useState, useEffect } from 'react';

export default function UpperLevelDropdownList({ upperLevelKeyword, item }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupEnabled, setIsGroupEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [keywordData, setKeywordData] = useState(null);

  useEffect(() => {
    if (item) {
      setKeywordData({
        clicks: item.fileFields?.clicks || 0,
        conversions: item.fileFields?.conversions || 0,
        impressions: item.fileFields?.impressions || 0,
        spent: item.fileFields?.spent || 0,
        phraseCount: item.phraseCount || 0,
      });
    }
  }, [item]);

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
      {keywordData && (
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
            <div className={styles.stats}>
              <p className={styles.stats_item}>
                <b>Показы:</b>&nbsp;{keywordData.impressions}
              </p>
              <p className={styles.stats_item}>
                <b>Клики:</b>&nbsp;{keywordData.clicks}
              </p>
              <p className={styles.stats_item}>
                <b>Конверсии:</b>&nbsp;{keywordData.conversions}
              </p>
              <p className={styles.stats_item}>
                <b>Траты:</b>&nbsp;{keywordData.spent.toFixed(2)}
              </p>
              <p className={styles.stats_item}>
                <b>Фраз:</b>&nbsp;{keywordData.phraseCount}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
