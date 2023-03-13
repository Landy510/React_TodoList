import { Outlet, useLocation } from "react-router-dom";
import styles from '@/styles/Layout.module.scss';
const Layout = () => {
  const {pathname} = useLocation();
  return (
    <div className={`${styles.wrapper} ${pathname === '/login' ? '' : styles.accessed}`}>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout;