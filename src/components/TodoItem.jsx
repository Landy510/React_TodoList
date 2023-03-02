import { BsXLg } from "react-icons/bs";
import styles from '@/styles/TodoItem.module.scss';
const TodoItem = ({id, title, completed}) => {
  return (
    <li className={styles['todoItem']}>
      <p>
        {title}
      </p>
      <div className={styles['del-icon']}>
        <BsXLg></BsXLg>
      </div>
    </li>
  )
}

export default TodoItem;