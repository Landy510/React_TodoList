import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';
const todosStore = (set) => ({
  todos: [
    
  ],
  initialTodos: (result) => {
    set((state) => ({
      todos: result
    }))
  },
  addTodoItem: ({id, title}) => {
    const newTodo = {
      id,
      title,
      completed: false
    }

    set((state) => ({
      todos: [...state.todos, newTodo]
    }))
  },
  updateItem: ({id, title}) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if(todo.id === id) todo.title = title;
        return todo;
      })
    }))
  }
})
export const useTodosStore = create(todosStore)