import styles from './word-group.module.css';
import UpperLevelDropdownList from '../components/upper-level-dropdown-list/upper-level-dropdown-list';

import store from '../services';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setSelectedList } from '../services/reducers/wordLists';
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
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    if (selectedList === null) {
      store.dispatch(setSelectedList('general'));
    }
  }, [selectedList]);

  return (
    <main className={styles.content}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      {lists && selectedList && (
        <section className={styles.wordlist_container}>
          {Object.keys(lists[selectedList]).map((key, index) => (
            <UpperLevelDropdownList
              key={`${key} ${index}`}
              upperLevelKeyword={key}
              item={lists[selectedList]?.[key]}
            />
          ))}
        </section>
      )}
    </main>
  );
}
