import styles from './word-group.module.css';
import UpperLevelDropdownList from '../components/upper-level-dropdown-list/upper-level-dropdown-list';

import store from '../services';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setSelectedList, createList } from '../services/reducers/wordLists';
import Select from 'react-select';
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

export default function WordGroup() {
  const { lists, name, projectId, selectedList } = useSelector(
    (store) => store.wordLists
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(null);
  const [listCreateRequested, setListCreateRequested] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    let options = [];
    if (lists) {
      Object.keys(lists).forEach((key) => {
        options = [
          ...options,
          {
            value: key,
            label: key === 'general' ? 'Неразобранные слова' : key,
          },
        ];
      });
      setOptions(options);
    }
  }, [lists]);

  const handleListSelection = (selectedOption) => {
    setSelectedOption(selectedOption);
    store.dispatch(setSelectedList(selectedOption.value));
  }

  

  const onSubmit = (e) => {
    store.dispatch(createList({ listName: inputRef.current.value, list: {} }));
    setListCreateRequested(false);
  };

  useEffect(() => {
    if (selectedList === null) {
      store.dispatch(setSelectedList('general'));
    }
  }, [selectedList, options]);

  return (
    <main className={styles.content}>
      <div className={styles.menu}>
        {!!options && (
          <Select
            defaultValue={{ value: 'general', label: 'Неразобранные слова' }}
            onChange={handleListSelection}
            options={options}
            className={styles.selector}
          />
        )}
        <div className={styles.listCreate_wrapper}>
          <button
            className={styles.createButton}
            onClick={() => {
              setListCreateRequested(true);
            }}
          >
            Создать список
          </button>
          {listCreateRequested ? (
            <form onSubmit={onSubmit} className={styles.create_form}>
              <input
                minLength='2'
                ref={inputRef}
                className={styles.input}
                placeholder='Название списка'
                type='text'
              ></input>
              <div className={styles.buttons_container}>
                <button onClick={onSubmit} type='button'>
                  Создать
                </button>
                <button
                  type='reset'
                  onClick={() => {
                    setListCreateRequested(false);
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
      {lists && selectedList && (
        <section className={styles.wordlist_container}>
          {Object.keys(lists[selectedList]).length !== 0 ? (
            Object.keys(lists[selectedList]).map((key, index) => (
              <UpperLevelDropdownList
                key={`${key} ${index}`}
                upperLevelKeyword={key}
                item={lists[selectedList]?.[key]}
              />
            ))
          ) : (
            <p>Список пуст</p>
          )}
        </section>
      )}
    </main>
  );
}
