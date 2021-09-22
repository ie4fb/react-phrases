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
        }
    }
})

export const { setLists, setSelectedList } = wordLists.actions
export default wordLists.reducer