import styles from './upper-level-dropdown-list.module.css';
import { useState, useEffect } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import WordForm from '../word-form/word-form-item';
import PhraseItem from '../phrase-item/phrase-item';

export default function UpperLevelDropdownList({ upperLevelKeyword, item }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupEnabled, setIsGroupEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [keywordData, setKeywordData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    [upperLevelKeyword]: null,
  });

  const toggleSelected = (e) => {
    e.stopPropagation();
    setIsSelected((prevState) => !prevState);
  };
  const toggleGroup = () => {
    setIsGroupEnabled((prevState) => !prevState);
  };
  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const handleSelection = ({ from }) => {
    setSelectedOptions({ [upperLevelKeyword]: keywordData.wordsInPhrase });
    if (from === 'lemma' && !selectedOptions[upperLevelKeyword]) {
      setSelectedOptions({ [upperLevelKeyword]: keywordData.wordsInPhrase });
    } else if (from === 'lemma') {
      setSelectedOptions({ [upperLevelKeyword]: null });
    }
  };

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);
  useEffect(() => {
    const final = {
      keywordPhrase: [],
      phraseCount: 0,
      wordsInPhrase: {},
      fileFields: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spent: 0,
      },
    };
    if (item) {
      const middleLevelWords = Object.keys(item.wordsInPhrase);
      //console.log(upperLevelKeyword, middleLevelWords);
      let stats = {};
      middleLevelWords.forEach((middleLevelWord, index) => {
        stats[middleLevelWord] = {};
        item.wordsInPhrase[middleLevelWord].wordPhrases.forEach((item) => {
          //     console.log(item);
          stats[middleLevelWord][Object.keys(item)[0]] =
            item[Object.keys(item)[0]];
        });
        stats[middleLevelWord].total = {
          impressions: 0,
          clicks: 0,
          spent: 0,
          conversions: 0,
        };
        Object.keys(stats[middleLevelWord]).forEach((key) => {
          if (key !== 'total') {
            stats[middleLevelWord].total.impressions += parseInt(
              stats[middleLevelWord][key].impressions
            );
            stats[middleLevelWord].total.clicks +=
              parseInt(stats[middleLevelWord][key].clicks) || 0;
            stats[middleLevelWord].total.conversions +=
              parseInt(stats[middleLevelWord][key].conversions) || 0;
            stats[middleLevelWord].total.spent +=
              parseFloat(stats[middleLevelWord][key].spent) || 0;
          }
          if (middleLevelWord === '!и') {
            console.log(
              'stats',
              stats[middleLevelWord][key].conversions,
              middleLevelWord,
              key,
              stats[middleLevelWord][key],
              stats
            );
          }
        });
        final.wordsInPhrase[middleLevelWord] = {
          wordPhrases: item.wordsInPhrase[middleLevelWord].wordPhrases,
          fileFields: {
            impressions: stats[middleLevelWord].total.impressions,
            clicks: stats[middleLevelWord].total.clicks,
            conversions: stats[middleLevelWord].total.conversions,
            spent: stats[middleLevelWord].total.spent,
          },
        };
      });
      Object.keys(final.wordsInPhrase).forEach((finalItem) => {
        console.log(final.wordsInPhrase[finalItem]);
        final.fileFields.impressions +=
          final.wordsInPhrase[finalItem].fileFields.impressions;
        final.fileFields.clicks +=
          final.wordsInPhrase[finalItem].fileFields.clicks;
        final.fileFields.spent +=
          final.wordsInPhrase[finalItem].fileFields.spent;
        final.fileFields.conversions +=
          final.wordsInPhrase[finalItem].fileFields.conversions;
        final.phraseCount += final.wordsInPhrase[finalItem].wordPhrases.length;
        final.wordsInPhrase[finalItem].wordPhrases.forEach((phrase) =>
          final.keywordPhrase.push(phrase)
        );
        // final.wordsInPhrase.push(final.keywordPhrase[finalItem])
      });
      setKeywordData(final);
    }
  }, [item]);

  return (
    <>
      {keywordData ? (
        <>
          {Object.keys(keywordData.wordsInPhrase).length === 1 ? (
            <>
              {Object.keys(keywordData.wordsInPhrase).map((key, index) => (
                <WordForm
                  item={key}
                  key={`${key} ${index}`}
                  data={keywordData.wordsInPhrase[key]}
                  upperLevelKeyword={upperLevelKeyword}
                  onTop={true}
                />
              ))}
            </>
          ) : (
            <>
              <div onClick={toggleExpansion} className={styles.container}>
                <div className={styles.info}>
                  <input
                    className={styles.checkbox}
                    type='checkbox'
                    defaultChecked={isSelected}
                    onClick={toggleSelected}
                  />
                  <p  className={styles.label}>
                    {upperLevelKeyword}
                  </p>
                  <button
                    onClick={toggleGroup}
                    className={`${styles.group_button} ${
                      isGroupEnabled ? styles.flipped : ''
                    }`}
                  ></button>
                  <KeywordStatistics
                    data={{
                      ...keywordData.fileFields,
                      phraseCount: keywordData.phraseCount,
                    }}
                    //item={item}
                  />
                </div>
                {isExpanded ? (
                  <>
                    {isGroupEnabled ? (
                      <div className={styles.children_wrapper}>
                        {Object.keys(keywordData.wordsInPhrase).map(
                          (key, index) => (
                            <WordForm
                              item={key}
                              key={`${key} ${index}`}
                              data={keywordData.wordsInPhrase[key]}
                              upperLevelKeyword={upperLevelKeyword}
                              onTop={false}
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <>
                        {keywordData.keywordPhrase.map((phrase, index) => (
                          <PhraseItem
                            item={phrase}
                            key={`${phrase} ${index}`}
                          />
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
}
