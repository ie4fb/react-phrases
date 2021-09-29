import styles from './list-selector.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import store from '../../services';
import { addToList } from '../../services/reducers/wordLists';

export default function ListSelector({ data, coordinates, onClose }) {
  const { lists, selectedList } = useSelector((state) => state.wordLists);
  const [offset, setOffset] = useState({ x: 0, y: 20 });

  const containerRef = useRef();
  const updateList = (e) => {
    e.stopPropagation();
    store.dispatch(addToList({ list: e.target.id, data: data }));
    onClose(e);
  };

  useEffect(() => {
    if (containerRef.current) {
      const measures = containerRef.current.getBoundingClientRect();
      setOffset({ x: measures.width + 20, y: 20 });
    }
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ top: coordinates.y + offset.y, left: coordinates.x - offset.x }}
    >
      <p className={styles.title}>Выберите список</p>
      <ul className={styles.list}>
        {Object.keys(lists).map((key, index) => (
          <>
            {key !== selectedList && (
              <li
                id={key}
                onClick={(e, key) => {
                  updateList(e);
                }}
                key={`${key} ${index}`}
                className={styles.item}
              >
                {key === 'general' ? 'Неразобранные слова' : key}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
