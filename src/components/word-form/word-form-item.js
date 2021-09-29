import styles from './word-form.module.css';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import { useState } from 'react';
import { data } from '../../config/data';
import PhraseItem from '../phrase-item/phrase-item';
import ListSelector from '../list-selector/list-selector';

export default function WordForm({ upperLevelKeyword, item, data, onTop }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListSelectorRequested, setIsListSelectorRequested] = useState(false);
  const [dataToAdd, setDataToAdd] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const toggleSelected = (e) => {
    e.stopPropagation();
    setIsSelected((prevState) => !prevState);
  };

  const toggleExpansion = (e) => {
    e.stopPropagation();
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
      setDataToAdd({
        [upperLevelKeyword]: { wordsInPhrase: { [item]: data } },
      });
    }
  };

  return (
    <div
      onClick={toggleExpansion}
      className={`${styles.container} ${onTop ? styles.container_onTop : ''}`}
    >
      <div
        className={`${styles.info} ${isExpanded ? styles.info_expanded : ''}`}
      >
        <input
          className={styles.checkbox}
          type='checkbox'
          defaultChecked={isSelected}
          onClick={toggleSelected}
        />
        <p className={styles.label}>{item}</p>
        <KeywordStatistics
          data={{ ...data.fileFields, phraseCount: data.wordPhrases.length }}
        />
        <div className={styles.button_container}>
          <button onClick={handleAddAction} className={styles.button}>
            В список
          </button>
          {dataToAdd && (
            <ListSelector data={dataToAdd} coordinates={coordinates} onClose={handleAddAction}/>
          )}
        </div>
      </div>

      {isExpanded ? (
        <div className={styles.children_wrapper}>
          {' '}
          {data.wordPhrases.map((phrase, index) => (
            <PhraseItem
              key={`${phrase} ${index}`}
              item={phrase}
              upperLevelKeyword={upperLevelKeyword}
              form={item}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
