import styles from '@/styles/TodoList.module.scss';
import { useEffect, useState } from 'react';
import { useTodosStore } from '@/store';
import TodoItem from './TodoItem';
import axios from 'axios';
const TodoList = () => {
  
  const {initialTodos, delTodoItem, todos} = useTodosStore(state => state)
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


  const onDeleteAllClick = () => {
    todos.forEach(todo => {
      if(!todo.completed_at) return;
      const url = `https://todoo.5xcamp.us/todos/${todo.id}`;
      axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('access_token') || ''}`
        }
      })
      .then(res => {
        console.log('del success', res);
        delTodoItem({id: todo.id})
      })
      .catch(err => console.log('del fail', err))
    })
  }

  const [category, setCategory] = useState('all');  
  const onTabChange = (type) => {
    setCategory(type)
  }

  return (
    <>
      {
        todos.length !== 0 ? 
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
              todos.map((todo) => {
                if(category === 'todo') {
                  return (
                    !todo.completed_at && <TodoItem 
                      key={todo.id}
                      content={todo.content}
                      id={todo.id}
                      completed_at={todo.completed_at}
                    ></TodoItem>
                  )
                }
                else if(category === 'finished') {
                  return (
                    todo.completed_at && <TodoItem 
                      key={todo.id}
                      content={todo.content}
                      id={todo.id}
                      completed_at={todo.completed_at}
                    ></TodoItem>
                  )
                }
                return (
                  <TodoItem 
                    key={todo.id}
                    content={todo.content}
                    id={todo.id}
                    completed_at={todo.completed_at}
                  ></TodoItem>
                )
              })
            }
            </ul>
            <div className={`${styles['process-all-data']}`}>
              <span>
                {
                  todos.filter(todo => !todo.completed_at).length
                }
                個待辦事項
              </span>
              <span onClick={onDeleteAllClick}>
                清除已完成項目
              </span>
            </div>       
          </div>
        </div>
        : 
        <div className={styles['empty-list']}>
          <p className='fz-medium'>目前尚無待辦事項</p>
          <img src="/React_TodoList/empty 1.png"/>
        </div>
      }
    </>
  )
}

export default TodoList;