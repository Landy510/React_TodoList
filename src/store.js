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
  }
})
export const useTodosStore = create(todosStore)