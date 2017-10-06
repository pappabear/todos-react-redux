import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, title) => {
    if (title.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.updateTodo(id, title)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, toggleTodo, deleteTodo } = this.props
    
    let element

    if (this.state.editing) {
      element = (
        <TodoTextInput title={todo.title}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.complete}
                 onChange={() => toggleTodo(todo.id, !todo.complete)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.title}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.complete,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
