import { Outlet } from "react-router-dom";
import styles from '@/styles/Layout.module.scss';
const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout;