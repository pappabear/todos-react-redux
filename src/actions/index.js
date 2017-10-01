import * as types from '../constants/ActionTypes'

export const addTodo = title => ({ type: types.ADD_TODO, title })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const updateTodo = (id, title) => ({ type: types.UPDATE_TODO, id, title })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
