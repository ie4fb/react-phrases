import './App.css';
import WordGroup from './pages/word-group';
import store from './services';
import { useEffect, useState } from 'react';
import { setLists } from './services/reducers/wordLists';
import { data } from './config/data';


function App() {
  useEffect(() => {
    store.dispatch(setLists(data));
  }, []);



  return (
    <div className='App'>
      <WordGroup />
    </div>
  );
}

export default App;
