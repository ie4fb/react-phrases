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
      Object.keys(action.payload.data).forEach((key) => {
        if (state.lists[action.payload.list][key]) {
          Object.keys(action.payload.data[key].wordsInPhrase).forEach(
            (secondLevelKey) => {
              if (
                state.lists[action.payload.list][key].wordsInPhrase[
                  secondLevelKey
                ]
              ) {
                action.payload.data[key].wordsInPhrase[
                  secondLevelKey
                ].wordPhrases.forEach((phraseItem) => {
                  const phrase = Object.keys(phraseItem)[0];
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
              } else {
                state.lists[action.payload.list][key].wordsInPhrase[
                  secondLevelKey
                ] = action.payload.data[key].wordsInPhrase[secondLevelKey];
              }
            }
          );
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
