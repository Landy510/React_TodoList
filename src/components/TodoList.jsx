import styles from '@/styles/TodoList.module.scss';
import { useEffect, useState } from 'react';
import { useTodosStore } from '@/store';
import TodoItem from './TodoItem';
import axios from 'axios';
const TodoList = () => {
  
  const {initialTodos, todos} = useTodosStore(state => state)
  useEffect(() => {
    const url = 'https://todoo.5xcamp.us/todos';
    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('access_token') || ''}`
      }
    })
    .then(res => initialTodos(res.data.todos))
  }, [])


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
                content={todo.content}
                id={todo.id}
                completed_at={todo.completed_at}
              ></TodoItem>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default TodoList;