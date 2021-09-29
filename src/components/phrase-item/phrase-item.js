import styles from './phrase-item.module.css';
import { useState } from 'react';
import KeywordStatistics from '../phrase-statistics/phrase-statistics';
import ListSelector from '../list-selector/list-selector';

export default function PhraseItem({ item, data, upperLevelKeyword, form }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isListSelectorRequested, setIsListSelectorRequested] = useState(false);
  const [dataToAdd, setDataToAdd] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const toggleSelected = (e) => {
    e.stopPropagation();
    setIsSelected((prevState) => !prevState);
  };
  const cancelBubbling = (e) => {
    e.stopPropagation();
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
        [upperLevelKeyword]: {
          wordsInPhrase: {
            [form]: {
              wordPhrases: [
                {
                  [Object.keys(item)[0]]: item[[Object.keys(item)[0]]],
                },
              ],
            },
          },
        },
      });
      // setDataToAdd({ [upperLevelKeyword]: { [form]: Object.keys(item)[0] } });
    }
  };

  return (
    <div className={styles.container} onClick={cancelBubbling}>
      <div className={styles.info}>
        <input
          onClick={toggleSelected}
          className={styles.checkbox}
          type='checkbox'
          defaultChecked={isSelected}
        />
        <div className={styles.statistics_wrapper}>
          <p className={styles.label}>{Object.keys(item)[0]}</p>
        </div>
        <KeywordStatistics data={item[Object.keys(item)[0]]} />
        <div className={styles.button_container}>
          <button onClick={handleAddAction} className={styles.button}>
            В список
          </button>
          {dataToAdd && (
            <ListSelector data={dataToAdd} onClose={handleAddAction} coordinates={coordinates} />
          )}
        </div>
      </div>
    </div>
  );
}
