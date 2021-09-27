import { createSlice } from '@reduxjs/toolkit'


const initialState = { 
    lists: null,
    name: null,
    projectId: null,
    selectedList: null
}

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
            state.selectedList = action.payload
        },
        createList(state, action) {
            state.lists = {...state.lists, [action.payload.listName] : action.payload.list}
        },
        addToList(state, action) {
            const modifiedList = state.lists[action.payload.listName]
            console.log(modifiedList)
        }
        
    }
})

export const { setLists, setSelectedList, createList } = wordLists.actions
export default wordLists.reducer