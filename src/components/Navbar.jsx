import { useNavigate } from 'react-router-dom';
import styles from '@/styles/Navbar.module.scss';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('user_name') || 'default_name';
  
  const onLogoutClick = () => {
    const url = 'https://todoo.5xcamp.us/users/sign_out';
    axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem('access_token') || ''}`
      }
    })
    .then((res) => {
      localStorage.getItem('access_token') && localStorage.clear('access_token');
      localStorage.getItem('user_name') && localStorage.clear('user_name');
      // if(globalThis['myWorker']) {
      //   const data = {
      //     mission: 'stop',
      //   }
      //   globalThis['myWorker'].postMessage(data);
      // }
      navigate('/login');
    })
    .catch(err => console.log('logout err', err))
  }

  return (
    <nav>
      <a href="#" className={styles.logo}>
        <img src="/React_TodoList/logo.png" alt="" />
      </a>

      <ul className={styles['header-root-list']}>
        <li 
          className={`fz-medium text-bold ${styles['header-option']} ${styles['username']}`}
        >{userName}的代辦</li>
        <li 
          className={`fz-medium ${styles['header-option']} ${styles['logout-btn']}`}
          onClick={onLogoutClick}
        >登出</li>
      </ul>
    </nav>
  )
}

export default Navbar;