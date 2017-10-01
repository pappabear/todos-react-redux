import { ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
  {
    title: 'Use Redux',
    completed: false,
    id: 0,
    owner: 'chip.irek@gmail.com'
  },
  {
    title: 'Mow lawn',
    completed: true,
    id: 1,
    owner: 'chip.irek@gmail.com'
  }

]

export default function todos(state = initialState, action) {

  switch (action.type) {

    case ADD_TODO:
      //console.log("reducers/todos.ds action.title=" + action.title)
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          title: action.title,
          owner: 'chip.irek@gmail.com'
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case UPDATE_TODO:
    //console.log("reducers/todos.ds action.title=" + action.title)
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, title: action.title } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
