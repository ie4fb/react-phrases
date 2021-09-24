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
  useEffect(() => {
    //console.log(item);
    const final = {
      items: [],
      stats: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spent: 0,
        phraseCount: 0,
      },
    };
    if (item) {
      const middleLevelWords = Object.keys(item.wordsInPhrase);
      //console.log(upperLevelKeyword, middleLevelWords);
      let stats = {};
      middleLevelWords.forEach((middleLevelWord, index) => {
        stats[middleLevelWord] = {};
        item.wordsInPhrase[middleLevelWord].wordPhrases.forEach((item) => {
          stats[middleLevelWord][Object.keys(item)[0]] =
            item[Object.keys(item)[0]];
        });
        stats[middleLevelWord].total = {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          spent: 0,
        };
        Object.keys(stats[middleLevelWord]).forEach((key) => {
          if (upperLevelKeyword === 'СКОРОВАРКА') {console.log(index, stats[middleLevelWord], middleLevelWord, key, stats[middleLevelWord][key].impressions)}
          if (key !== 'total') {
            stats[middleLevelWord].total.impressions +=
              parseInt(stats[middleLevelWord][key].impressions);
            stats[middleLevelWord].total.clicks +=
              parseInt(stats[middleLevelWord][key].clicks) || 0;
            stats[middleLevelWord].total.conversions +=
              parseInt(stats[middleLevelWord][key].conversions) || 0;
            stats[middleLevelWord].total.spent +=
              parseFloat(stats[middleLevelWord][key].spent) || 0;
          }
        });
        final.items.push({
          [middleLevelWord]: {
            wordPhrases: item.wordsInPhrase[middleLevelWord].wordPhrases,
            stats: {
              impressions: stats[middleLevelWord].total.impressions,
              clicks: stats[middleLevelWord].total.clicks,
              conversions: stats[middleLevelWord].total.conversions,
              spent: stats[middleLevelWord].total.spent,
            },
          },
        });
       
      });
      final.items.forEach((finalItem) => {
        // console.log('item',item, final.stats, 'mlw', middleLevelWord, item[middleLevelWord]?.stats)
        if (upperLevelKeyword === 'СКОРОВАРКА') {
          console.log('item', item);
          console.log(finalItem[Object.keys(finalItem)[0]].stats);
          console.log(
            final.items.length,
            final.stats.impressions,
            finalItem[Object.keys(finalItem)[0]].stats.impressions
          );
        }
        final.stats.impressions +=
          finalItem[Object.keys(finalItem)[0]].stats.impressions;
        final.stats.clicks +=
          finalItem[Object.keys(finalItem)[0]].stats.clicks;
        // final.stats.conversions +=item[middleLevelWord]?.stats.conversions
        // final.stats.spent += finalItem[middleLevelWord]?.stats.spent;
        // final.stats.phraseCount +=finalItem[middleLevelWord]?.wordPhrases.length
      });
      setKeywordData(final);
    }
  }, [item]);

  useEffect(() => {
    if (upperLevelKeyword === 'СКОРОВАРКА') console.log('kd', keywordData);
  }, [keywordData]);
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
            //item={item}
          />
        </div>
      </div>
    </>
  );
}
