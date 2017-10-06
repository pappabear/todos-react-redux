import * as types from '../constants/ActionTypes'

export const addTodo = title => ({ type: types.ADD_TODO, title })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const updateTodo = (id, title) => ({ type: types.UPDATE_TODO, id, title })
export const toggleTodo = (id, complete) => ({ type: types.TOGGLE_TODO, id, complete })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const getTodos = () => ({ type: types.GET_TODOS })
