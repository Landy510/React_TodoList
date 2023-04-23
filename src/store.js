import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';
const todosStore = (set) => ({
  todos: [],
  initialTodos: (result) => {
    set((state) => ({
      todos: result
    }))
  },
  addTodoItem: ({id, content}) => {
    const newTodo = {
      id,
      content,
      completed_at: false
    }

    set((state) => ({
      todos: [...state.todos, newTodo]
    }))
  },
  updateItem: ({id, content}) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if(todo.id === id) todo.content = content;
        return todo;
      })
    }))
  },
  delTodoItem: ({id}) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }))
  },
  toggleTodoItem: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if(todo.id === id) todo.completed_at = !todo.completed_at;
        return todo;
      })
    }))
  }
})
export const useTodosStore = create(todosStore)