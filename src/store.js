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
    console.log('inner step1', id, content);
    const newTodo = {
      id,
      content,
      completed: false
    }

    console.log('inner step2', newTodo);

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
  }
})
export const useTodosStore = create(todosStore)