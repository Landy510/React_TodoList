import React from "react";
import { BsXLg, BsCheckLg } from "react-icons/bs";

import styles from '@/styles/TodoItem.module.scss';
const TodoItem = ({id, title, completed}) => {
  return (
    <li className={styles['todoItem']}>
      <p>
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
        <span>
          {title}
        </span>
      </p>
      <div className={styles['del-icon']}>
        <BsXLg></BsXLg>
      </div>
    </li>
  )
}

export default TodoItem;