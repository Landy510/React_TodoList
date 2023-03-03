import styles from '@/styles/InputTodo.module.scss';
import { useTodosStore } from '@/store';
import { useRef, useState } from 'react';
import { BsFillPlusSquareFill } from "react-icons/bs";
import axios from 'axios';
const InputTodo = () => {
  const [inputState, setInputState] = useState('');
  const addTodoItem = useTodosStore(state => state.addTodoItem)
  const inputRef = useRef();
  const onHandleSubmit = (evt) => {
    evt.preventDefault();
    const body = {
      todo: {
        content: inputState
      }
    }
    axios.post('https://todoo.5xcamp.us/todos', body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('access_token') || ''}`
      }
    })
    .then(res => {
      addTodoItem({id: res.data.id, title: res.data.content});
      inputRef.current.value = '';
    })
    .catch(err => console.log('add fail', err))
  }

  return (
    <form 
      className={styles['input-wrapper']}
      onSubmit={onHandleSubmit}
    >
      <input 
        type="text" 
        placeholder='新增代辦事項'
        ref={inputRef}
        onChange={(e) => setInputState(e.target.value)}
      />
      <button 
        type='submit'
        className={styles['add-btn']}
      >
        <BsFillPlusSquareFill style={{
            color: '#000',
            fontSize: '39px',
            borderRadius: '10px'
          }}
        ></BsFillPlusSquareFill>
      </button>
    </form>
  )
}

export default InputTodo;