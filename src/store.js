import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';
const todosStore = (set) => ({
  todos: [
    {
      id: uuidv4(),
      title: '把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟把冰箱發霉的檸檬拿去丟',
      completed: false
    },
    {
      id: uuidv4(),
      title: '整理電腦資料夾',
      completed: true
    },
  ],
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
      todos: [...state.todos.map(todo => {
        if(todo.id === id) todo.title = title;
        return todo;
      })]
    }))
  }
})
export const useTodosStore = create(todosStore)