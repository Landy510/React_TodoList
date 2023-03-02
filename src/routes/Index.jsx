import Navbar from "@/components/Navbar";
import InputTodo from "@/components/InputTodo";
import TodoList from "@/components/TodoList";
import styles from '@/styles/Index.module.scss';
const Index = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles['todo-section']}>
        <InputTodo></InputTodo>
        <TodoList></TodoList>
      </div>
    </>
  )
}

export default Index;