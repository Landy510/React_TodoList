import React, { useEffect, useRef, useState } from "react";
import { BsXLg, BsCheckLg } from "react-icons/bs";
import axios from "axios";
import { useTodosStore } from "@/store";

import styles from '@/styles/TodoItem.module.scss';
const TodoItem = ({id, content, completed_at}) => {
  const {updateItem, delTodoItem, toggleTodoItem} = useTodosStore(state => state);
  const [clickInfo, setClickInfo] = useState({count: 0, triggerTimeStamp: 0});
  const [editing, setEditing] = useState(false);
  const [delBtnState, setDelBtnState] = useState({opacity: 0});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 378);


  const updateInputRef = useRef();
  const paragraphRef = useRef();
  let viewMode = {};
  let editMode = {};
  if(editing) {
    viewMode['display'] = 'none';
  } else {
    editMode['display'] = 'none';
  }
  
  useEffect(() => {
    if(clickInfo.count !== 2) return;

    const outsideClickListener = (event) => {
      if(editing && paragraphRef.current && !paragraphRef.current.contains(event.target)) {
        setEditing(false);
        setClickInfo({...clickInfo, count: 0});
        setDelBtnState({opacity: 0});
        if(isMobile) {
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
    }
    
    setTimeout(() => {
      document.addEventListener('click', outsideClickListener);
    }, 300)

    return () => {
      document.removeEventListener('click', outsideClickListener);
    }
  }, [editing])
  

  const handleEditing = () => {
    setClickInfo({...clickInfo, count: clickInfo.count++});
    
    if(clickInfo.count === 2) {
      const currentTimeStamp = new Date().getTime();
      const dtInSeconds = (currentTimeStamp - clickInfo.triggerTimeStamp)/1000;

      setClickInfo({...clickInfo, triggerTimeStamp: currentTimeStamp});
      if(dtInSeconds > 0.3) return;
      setEditing(true);
    } else {
      setClickInfo({...clickInfo, triggerTimeStamp: new Date().getTime()});
      setTimeout(() => {
        setClickInfo({...clickInfo, count: 0});
      }, 300)
    }
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
    setDelBtnState({opacity: 1});
  }

  const handleMouseLeave = () => {
    if(editing) return;
    setDelBtnState({opacity: 0});
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

  const toggleItemStatus = () => {
    const url = `https://todoo.5xcamp.us/todos/${id}/toggle`;
    axios.patch(url, null, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('access_token') || ''}`
      }
    }
    )
    .then(res => {
      console.log(res)
      toggleTodoItem(id)
    })
    .catch(err => {
      console.log('toggle fail', err)
    })
    
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
            <p onClick={handleEditing}>
              <span className={styles['checkbox-section']}>
                {
                  !completed_at ? 
                  (<input 
                      type="checkbox" 
                      onClick={toggleItemStatus}
                   />
                  ):
                  (
                    <BsCheckLg style={{
                      fontSize: '20px',
                      color: '#FFD370'
                    }}></BsCheckLg>
                  )
                } 
              </span>
              <span className={`${completed_at ? styles['done'] : ''}`}>
                {content}
              </span>
            </p>
          </>
        ):
        (
          <p
            ref={paragraphRef} 
            className={styles['edit-section']}>
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