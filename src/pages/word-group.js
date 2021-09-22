import styles from './word-group.module.css';
import UpperLevelDropdownList from '../components/upper-level-dropdown-list/upper-level-dropdown-list';
import { data } from '../config/data';

export default function WordGroup() {
  console.log(Object.keys(data.body.general));

  return (
    <main className={styles.content}>
      {Object.keys(data.body.general).map((key, index) => (
        <UpperLevelDropdownList key={`${key} ${index}`} upperLevelKeyword={key} item={data.body.general[key]} />
      ))}
    </main>
  );
}
