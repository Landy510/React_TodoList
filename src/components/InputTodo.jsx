import styles from '@/styles/InputTodo.module.scss';
import { BsFillPlusSquareFill } from "react-icons/bs";
const InputTodo = () => {
  return (
    <form className={styles['input-wrapper']}>
      <input 
        type="text" 
        placeholder='新增代辦事項'
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