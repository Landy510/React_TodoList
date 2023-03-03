import React, { useRef, useState } from "react";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import axios from "axios";
import { useTodosStore } from "@/store";

import styles from '@/styles/TodoItem.module.scss';
const TodoItem = ({id, title, completed}) => {
  const updateItem = useTodosStore(state => state.updateItem);
  const [editing, setEditing] = useState(false);
  const updateInputRef = useRef();
  let viewMode = {};
  let editMode = {};
  if(editing) {
    viewMode['display'] = 'none';
  } else {
    editMode['display'] = 'none';
  }

  const handleEditing = () => {
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
      .then(res => updateItem({id: res.data.id, title: res.data.content}))
      .catch(err => console.log('update error', err))
    }
  }

  return (
    <li className={styles['todoItem']}>
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
                {title}
              </span>
            </p>
          </>
        ):
        (
          <p className={styles['edit-section']}>
            <input 
              type="text" 
              defaultValue={title}
              style={editMode}
              ref={updateInputRef}
              onKeyDown={(e) => handleUpdatedDone(e)}
            />
          </p>
        )
      }
      <div className={styles['del-icon']}>
        <BsXLg style={viewMode}></BsXLg>
      </div>
    </li>
  )
}

export default TodoItem;