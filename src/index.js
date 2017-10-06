import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import rootReducer from './reducers'
import 'todomvc-app-css/index.css'
import dataService from './services/data-service'

let store = createStore(rootReducer,{}, applyMiddleware(dataService))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// load the initial state from the API
store.dispatch({type: 'GET_TODO_DATA'})
