import styles from './upper-level-dropdown-list.module.css';
import { useState, useEffect } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import WordForm from '../word-form/word-form-item';
import PhraseItem from '../phrase-item/phrase-item';
import ListSelector from '../list-selector/list-selector';

export default function UpperLevelDropdownList({ upperLevelKeyword, item }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupEnabled, setIsGroupEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListSelectorRequested, setIsListSelectorRequested] = useState(false);
  const [keywordData, setKeywordData] = useState(null);
  const [dataToAdd, setDataToAdd] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const toggleSelected = (e) => {
    e.stopPropagation();
    setIsSelected((prevState) => !prevState);
  };
  const toggleGroup = (e) => {
    e.stopPropagation();
    setIsGroupEnabled((prevState) => !prevState);
  };
  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const handleAddAction = (e) => {
    e.stopPropagation();
    setCoordinates({ x: e.pageX, y: e.pageY });
    if (isListSelectorRequested) {
      setIsListSelectorRequested(false);
      setDataToAdd(null);
    } else {
      setIsListSelectorRequested((prevState) => !prevState);
      setDataToAdd({ [upperLevelKeyword]: item });
    }
  };

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
          stats[middleLevelWord][Object.keys(item)[0]] = {
            ...item[Object.keys(item)[0]],
            parent: middleLevelWord,
          };
          //console.log( stats[middleLevelWord][Object.keys(item)[0]])
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
        final.fileFields.impressions +=
          final.wordsInPhrase[finalItem].fileFields.impressions;
        final.fileFields.clicks +=
          final.wordsInPhrase[finalItem].fileFields.clicks;
        final.fileFields.spent +=
          final.wordsInPhrase[finalItem].fileFields.spent;
        final.fileFields.conversions +=
          final.wordsInPhrase[finalItem].fileFields.conversions;
        final.phraseCount += final.wordsInPhrase[finalItem].wordPhrases.length;
        final.wordsInPhrase[finalItem].wordPhrases.forEach((phrase) => {
          const modifiedPhrases = {[Object.keys(phrase)[0]]: {}}
          Object.keys(phrase[Object.keys(phrase)[0]]).forEach((key) => {
            modifiedPhrases[Object.keys(phrase)[0]][key] =   phrase[Object.keys(phrase)[0]][key]
          })
          modifiedPhrases[Object.keys(phrase)[0]].parent = finalItem;
          final.keywordPhrase.push(modifiedPhrases);
        });
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
                <div
                  className={`${styles.info} ${
                    isExpanded ? styles.info_expanded : ''
                  }`}
                >
                  <input
                    className={styles.checkbox}
                    type='checkbox'
                    defaultChecked={isSelected}
                    onClick={toggleSelected}
                  />
                  <p className={styles.label}>{upperLevelKeyword}</p>
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
                  <div className={styles.button_container}>
                    <button onClick={handleAddAction} className={styles.button}>
                      В список
                    </button>
                    {dataToAdd && (
                      <ListSelector
                        onClose={handleAddAction}
                        data={dataToAdd}
                        coordinates={coordinates}
                      />
                    )}
                  </div>
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
                            upperLevelKeyword={upperLevelKeyword}
                            form={phrase[Object.keys(phrase)[0]].parent}
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
