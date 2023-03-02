import Navbar from "@/components/Navbar";
import InputTodo from "@/components/InputTodo";
import styles from '@/styles/Index.module.scss';
const Index = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles['todo-section']}>
        <InputTodo></InputTodo>
      </div>
    </>
  )
}

export default Index;