import { createAction } from '@reduxjs/toolkit'

const setLists = createAction('setLists')
const createList = createAction('addList')
const updateList = createAction('updateList')
const deleteList = createAction('deleteList')

export {setLists, createList, updateList, deleteList}