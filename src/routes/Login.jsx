import styles from '@/styles/Login.module.scss';
import { useState } from 'react';
const Login = () => {
  const [type, setType] = useState('login');
  return (
    <div className={styles['login-wrapper']}>
      <img className={styles['desktop-image']} src="src/assets/images/left.png" alt="" />
      <div className={styles['form-wrapper']}>
        <img className={styles['mobile-image']} src="src/assets/images/logo_lg.png" alt="" />
        <h3 className={`fz-large text-bold ${styles['title']}`}>最實用的線上代辦事項服務</h3>


        {/* Login Form | START */}
        <form className={type === 'login' ? styles['active'] : styles['hidden']}>
          <div className={styles['cell']}>
            <label htmlFor='email' className={`text-bold ${styles['label']}`}>Email</label>
            <input 
              type="email" 
              placeholder='請輸入Email'
              id='email'
            />
            <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>
          </div>
          <div className={styles['cell']}>
            <label htmlFor='password' className={`text-bold ${styles['label']}`}>密碼</label>
            <input 
              type="password" 
              placeholder='請輸入密碼'
              id='password'
            />
          </div>
        </form>
        {/* Login Form | END */}

        {/* Register Form | START */}
        <form className={type === 'register' ? styles['active'] : styles['hidden']}>
          <div className={styles['cell']}>
            <label htmlFor='register_email' className={`text-bold ${styles['label']}`}>Email</label>
            <input 
              type="email" 
              placeholder='請輸入Email'
              id='register_email'
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='nickname' className={`text-bold ${styles['label']}`}>您的暱稱</label>
            <input 
              type="text" 
              placeholder='請輸入您的暱稱'
              id='nickname'
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='register_password' className={`text-bold ${styles['label']}`}>密碼</label>
            <input 
              type="password" 
              placeholder='請輸入密碼'
              id='register_password'
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='rePassword' className={`text-bold ${styles['label']}`}>請再次輸入密碼</label>
            <input 
              type="password" 
              placeholder='請再次輸入密碼'
              id='rePassword'
            />
          </div>
        </form>

        <div className={styles['btn-section']}>
            <button 
              className={`fz-medium text-bold ${type==='login' ? 'active' : ''}`}
              style={type ==='login' ? {order: '-1'} : {}}
              type='submit'
              onClick={() => setType('login')}
            >登入</button>
            <button 
              className={`fz-medium text-bold ${type==='register' ? 'active' : ''}`} 
              style={type==='register' ? {order: '-1'} : {}}
              type='button'
              onClick={() => setType('register')}
            >註冊帳號</button>
        </div>
      </div>
    </div>
  )
}

export default Login;