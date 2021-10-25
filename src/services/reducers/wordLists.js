import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: null,
  name: null,
  projectId: null,
  selectedList: null,
};

const wordLists = createSlice({
  name: 'wordLists',
  initialState,
  reducers: {
    setLists(state, action) {
      console.log(action)
      state.lists = action.payload.body;
      state.name = action.payload.name;
      state.projectId = action.payload.id;
    },
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    createList(state, action) {
      state.lists = {
        ...state.lists,
        [action.payload.listName]: action.payload.list,
      };
    },
    addToList(state, action) {
      //Перебираем леммы
      Object.keys(action.payload.data).forEach((key) => {
        if (state.lists[action.payload.list][key]) {
          //Перебираем словоформы внутри леммы
          Object.keys(action.payload.data[key].wordsInPhrase).forEach(
            (secondLevelKey) => {
             //Если словоформа есть - идем глубже
              if (
                state.lists[action.payload.list][key].wordsInPhrase[
                  secondLevelKey
                ]
              ) {
                //Перебираем фразы внутри словоформы
                action.payload.data[key].wordsInPhrase[
                  secondLevelKey
                ].wordPhrases.forEach((phraseItem) => {
                  const phrase = Object.keys(phraseItem)[0];
                  //Если undefined - пушим отсуствующую фразу в массив с фразами внутри словоформы
                  if (
                    !state.lists[action.payload.list][key].wordsInPhrase[
                      Object.keys(
                        state.lists[action.payload.list][key].wordsInPhrase
                      )[0]
                    ].wordPhrases.find((statePhraseItem) => {
                      return Object.keys(statePhraseItem)[0] === phrase;
                    })
                  ) {
                    state.lists[action.payload.list][key].wordsInPhrase[
                      Object.keys(
                        state.lists[action.payload.list][key].wordsInPhrase
                      )[0]
                    ].wordPhrases.push(phraseItem);
                  }
                });
            //создаем новую словоформу в стейте, если не нашли раньше
              } else {
                state.lists[action.payload.list][key].wordsInPhrase[
                  secondLevelKey
                ] = action.payload.data[key].wordsInPhrase[secondLevelKey];
              }
            }
          );
        // создаем лемму, если не нашли раньше
        } else {
          state.lists[action.payload.list][key] = action.payload.data[key];
        }
      });
    },
  },
});

export const { setLists, setSelectedList, createList, addToList } =
  wordLists.actions;
export default wordLists.reducer;
