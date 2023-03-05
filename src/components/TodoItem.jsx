import React, { useRef, useState } from "react";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import axios from "axios";
import { useTodosStore } from "@/store";

import styles from '@/styles/TodoItem.module.scss';
const TodoItem = ({id, content, completed}) => {
  const {updateItem, delTodoItem} = useTodosStore(state => state);
  const [editing, setEditing] = useState(false);
  const [delBtnState, setDelBtnState] = useState({display: 'none'});
  const updateInputRef = useRef();
  let viewMode = {};
  let editMode = {};
  if(editing) {
    viewMode['display'] = 'none';
  } else {
    editMode['display'] = 'none';
  }

  const handleEditing = () => {
    console.log('hello')
    setEditing(true);
  }

  const handleUpdatedDone = (evt) => {
    if(evt.code === 'Enter') {
      setEditing(false);
      const url = `https://todoo.5xcamp.us/todos/${id}`;
      const body = {
        todo: {
          content: updateInputRef.current.value
        }
      }
      axios.put(url, body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('access_token') || ''}`
        }
      })
      .then(res => updateItem({id: res.data.id, content: res.data.content}))
      .catch(err => console.log('update error', err))
    }
  }

  const handleMouseOver = () => {
    if(editing) return;
    setDelBtnState({display: 'block'});
  }

  const handleMouseLeave = () => {
    if(editing) return;
    setDelBtnState({display: 'none'});
  }

  const delItemFnc = () => {
    const url = `https://todoo.5xcamp.us/todos/${id}`;
    axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('access_token') || ''}`
      }
    })
    .then(res => {
      console.log('del success', res);
      delTodoItem({id})
    })
    .catch(err => console.log('del fail', err))
  }

  return (
    <li 
      className={styles['todoItem']}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {
        !editing ? 
        (
          <>
            <p onDoubleClick={handleEditing}>
              <span className={styles['checkbox-section']}>
                {
                  !completed ? 
                  (<input type="checkbox" />):
                  (
                    <BsCheckLg style={{
                      fontSize: '20px',
                      color: '#FFD370'
                    }}></BsCheckLg>
                  )
                } 
              </span>
              <span className={`${completed ? styles['done'] : ''}`}>
                {content}
              </span>
            </p>
          </>
        ):
        (
          <p className={styles['edit-section']}>
            <input 
              type="text" 
              defaultValue={content}
              style={editMode}
              ref={updateInputRef}
              onKeyDown={(e) => handleUpdatedDone(e)}
            />
          </p>
        )
      }
      <div 
        className={styles['del-icon']}
        style={delBtnState}
        onClick={delItemFnc}
      >
        <BsXLg style={viewMode}></BsXLg>
      </div>
    </li>
  )
}

export default TodoItem;