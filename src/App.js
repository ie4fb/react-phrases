import './App.css';
import WordGroup from './pages/word-group';
import store from './services';
import { useEffect, useState } from 'react';
import { setLists } from './services/reducers/wordLists';
import { data } from './config/data';

let obj = { general: {} };

function App() {
  console.log(data);
  Object.keys(data.data).forEach((key, index) => {
      obj.general[key] = data.data[key];
  });

  useEffect(() => {
    store.dispatch(setLists({ body: obj, name: 'general' }));
  }, []);

  return (
    <div className='App'>
      <WordGroup />
    </div>
  );
}

export default App;
