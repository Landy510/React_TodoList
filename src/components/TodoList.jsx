import styles from '@/styles/TodoList.module.scss';
import { useState } from 'react';
import { useTodosStore } from '@/store';
import TodoItem from './TodoItem';
const TodoList = () => {
  const todos = useTodosStore((state) => state.todos)
  const [category, setCategory] = useState('all');  
  const onTabChange = (type) => {
    setCategory(type)
  }
  return (
    <div className={styles['todoList-section']}>
      <ul className={styles['tabs']}>
        <li 
          className={`${styles['tab']} ${category === 'all' ? styles['active'] : ''}`}
          onClick={() => onTabChange('all')}
        >全部</li>
        <li 
          className={`${styles['tab']} ${category === 'todo' ? styles['active'] : ''}`}
          onClick={() => onTabChange('todo')}
        >待完成</li>
        <li 
          className={`${styles['tab']} ${category === 'finished' ? styles['active'] : ''}`}
          onClick={() => onTabChange('finished')}
        >已完成</li>
      </ul>
      <div className={styles['todo-content']}> 
        <ul>
          {
            todos.map((todo) => (
              <TodoItem 
                key={todo.id}
                title={todo.title}
                id={todo.id}
                completed={todo.completed}
              ></TodoItem>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default TodoList;