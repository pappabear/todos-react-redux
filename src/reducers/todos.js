import { ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

export default function todos(state = [], action) {

  switch (action.type) {

    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          complete: false,
          title: action.title,
          owner: 'chip.irek@gmail.com'
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, title: action.title } :
          todo
      )

    case TOGGLE_TODO:
      console.log("reducers/todos.ds TOGGLE_TODO=" + action.id)
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, complete: !todo.complete } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.complete)
      return state.map(todo => ({
        ...todo,
        complete: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.complete === false)

    case 'GET_TODO_DATA_RECEIVED':
      //console.log('GET_TODO_DATA_RECEIVED')
      return action.data
  
    default:
      return state
  }
}
