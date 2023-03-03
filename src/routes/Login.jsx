import styles from '@/styles/Login.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('login');
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  })
  const [registerState, setRegisterState] = useState({
    email: '',
    nickname: '',
    password: '',
    rePassword: ''
  })
  const handleLoginFormChange = (evt) => {
    setLoginState({
      ...loginState,
      [evt.target.name]: evt.target.value
    })
  }
  const handleRegisterFormChange = (evt) => {
    setRegisterState({
      ...registerState,
      [evt.target.name]: evt.target.value
    })
  }

  const onLoginFormSubmit = () => {
    if(type !== 'login') return; // 防止 form 表單是在 註冊帳號的狀態下，去按 登入鈕 會執行以下去打 登入 api 的狀況
    const url = 'https://todoo.5xcamp.us/users/sign_in'
    const body = JSON.stringify({
        user: {
          email: loginState.email,
          password: loginState.password
        }
      })

    axios.post(url, body, {headers: {"Content-Type": "application/json"}})
      .then(res => {
        console.log('success', res);
        localStorage.setItem('access_token', res.headers['authorization']);
        navigate('/index');
      })
      .catch(err => console.log('err', err.response.data.message))
  }

  const onRegisterFormSubmit = () => {
    if(type !== 'register') return; // 防止 form 表單是在 登入的狀態下，去按 登入鈕 會執行以下去打 註冊帳號 api 的狀況
    const url = 'https://todoo.5xcamp.us/users';
    const body = JSON.stringify({
      user:{
        email: registerState.email,
        nickname: registerState.nickname,
        password: registerState.password
      }
    })

    axios.post(url, body, {headers: {"Content-Type": "application/json"}})
      .then(res => {
        console.log('success', res);
      })
      .catch(err => console.log('err', err.response.data.message))
  }

  return (
    <div className={styles['login-wrapper']}>
      <img className={styles['desktop-image']} src="src/assets/images/left.png" alt="" />
      <div className={styles['form-wrapper']}>
        <img className={styles['mobile-image']} src="src/assets/images/logo_lg.png" alt="" />
        <h3 className={`fz-large text-bold ${styles['title']}`}>最實用的線上代辦事項服務</h3>


        {/* Login Form | START */}
        <form 
          className={type === 'login' ? styles['active'] : styles['hidden']}
        >
          <div className={styles['cell']}>
            <label htmlFor='email' className={`text-bold ${styles['label']}`}>Email</label>
            <input 
              type="email" 
              placeholder='請輸入Email'
              id='email'
              name="email"
              value={loginState.email}
              onChange={handleLoginFormChange}
            />
            <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>
          </div>
          <div className={styles['cell']}>
            <label htmlFor='password' className={`text-bold ${styles['label']}`}>密碼</label>
            <input 
              type="password" 
              placeholder='請輸入密碼'
              id='password'
              name="password"
              value={loginState.password}
              onChange={handleLoginFormChange}
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
              name='email'
              value={registerState.email}
              onChange={handleRegisterFormChange}
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='nickname' className={`text-bold ${styles['label']}`}>您的暱稱</label>
            <input 
              type="text" 
              placeholder='請輸入您的暱稱'
              id='nickname'
              name='nickname'
              value={registerState.nickname}
              onChange={handleRegisterFormChange}
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='register_password' className={`text-bold ${styles['label']}`}>密碼</label>
            <input 
              type="password" 
              placeholder='請輸入密碼'
              id='register_password'
              name='password'
              value={registerState.password}
              onChange={handleRegisterFormChange}
            />
          </div>
          <div className={styles['cell']}>
            <label htmlFor='rePassword' className={`text-bold ${styles['label']}`}>請再次輸入密碼</label>
            <input 
              type="password" 
              placeholder='請再次輸入密碼'
              id='rePassword'
              name='rePassword'
              value={registerState.rePassword}
              onChange={handleRegisterFormChange}
            />
          </div>
        </form>

        <div className={styles['btn-section']}>
            <button 
              className={`fz-medium text-bold ${type==='login' ? 'active' : ''}`}
              style={type ==='login' ? {order: '-1'} : {}}
              type='button'
              onClick={() => {
                setType('login');
                onLoginFormSubmit();
              }}
            >登入</button>
            <button 
              className={`fz-medium text-bold ${type==='register' ? 'active' : ''}`} 
              style={type==='register' ? {order: '-1'} : {}}
              type='button'
              onClick={() => {
                setType('register');
                onRegisterFormSubmit();
              }}
            >註冊帳號</button>
        </div>
      </div>
    </div>
  )
}

export default Login;