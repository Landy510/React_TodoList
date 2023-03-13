import styles from '@/styles/Login.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/authStore';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const LoginForm = ({formDisplayState}) => {
  const updateUserInfo = useAuthStore(state => state.updateUserInfo);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    getValues,
    trigger
  } = useForm();
  
  useEffect(() => {
    if(formDisplayState.show === 'login' && formDisplayState.submit === 'login-submit') {
      onSubmitEvt()
    }
  }, [formDisplayState])

  const onSubmitEvt = async () => {
    const valid_result = await trigger();
    if(!valid_result) return;
    const url = 'https://todoo.5xcamp.us/users/sign_in'
    const body = JSON.stringify({
        user: {
          email: getValues('email'),
          password: getValues('password')
        }
      })

    axios.post(url, body, {headers: {"Content-Type": "application/json"}})
      .then(res => {
        updateUserInfo(res.data)
        localStorage.setItem('access_token', res.headers['authorization']);
        localStorage.setItem('user_name', res.data.nickname)
        navigate('/');
      })
      .catch(err => console.log('err', err.response.data.message))
  }

  return (
    <form style={{
      display: `${formDisplayState.show === 'login' ? 'block' : 'none'}`
    }}>
      <div className={styles['cell']}>
        <label htmlFor='email' className={`text-bold ${styles['label']}`}>Email</label>
        <input 
          type="email" 
          placeholder='請輸入Email'
          id='email'
          {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
        />
        {errors.email?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}
        {errors.email?.type === 'pattern' && <p className={`text-bold ${styles['warn-msg']}`}>不符合 Email 規則</p>}
      </div>
      <div className={styles['cell']}>
        <label htmlFor='password' className={`text-bold ${styles['label']}`}>密碼</label>
        <input 
          type="password" 
          placeholder='請輸入密碼'
          id='password'
          {...register('password', {required: true})}
        />
        {errors.password?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}
      </div>
    </form>
  )  
}

const RegisterForm = ({ formDisplayState }) => {
  const {
    register,
    formState: { errors },
    getValues,
    trigger
  } = useForm();

  console.log('errors',errors)

  useEffect(() => {
    if(formDisplayState.show === 'register' && formDisplayState.submit === 'register-submit') {
      onSubmitEvt();
    }
  }, [formDisplayState])

  const onSubmitEvt = async () => {
    const valid_result = await trigger();
    if(!valid_result) return;
    const url = 'https://todoo.5xcamp.us/users';
    const body = JSON.stringify({
      user:{
        email: getValues('email'),
        nickname: getValues('nickname'),
        password: getValues('register_password')
      }
    })

    axios.post(url, body, {headers: {"Content-Type": "application/json"}})
      .then(res => {
        console.log('success', res);
      })
      .catch(err => console.log('err', err.response.data.message))
  }

  return (
    <form style={{
      display: `${formDisplayState.show === 'register' ? 'block' : 'none'}`
    }}>
      <div className={styles['cell']}>
        <label htmlFor='register_email' className={`text-bold ${styles['label']}`}>Email</label>
        <input 
          type="email" 
          placeholder='請輸入Email'
          id='register_email'
          {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
        />
        {errors.email?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}
        {errors.email?.type === 'pattern' && <p className={`text-bold ${styles['warn-msg']}`}>不符合 Email 規則</p>}
      </div>
      <div className={styles['cell']}>
        <label htmlFor='nickname' className={`text-bold ${styles['label']}`}>您的暱稱</label>
        <input 
          type="text" 
          placeholder='請輸入您的暱稱'
          id='nickname'
          {...register('nickname', {required: true})}
        />
        {errors.nickname?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}

      </div>
      <div className={styles['cell']}>
        <label htmlFor='register_password' className={`text-bold ${styles['label']}`}>密碼</label>
        <input 
          type="password" 
          placeholder='請輸入密碼'
          id='register_password'
          {...register('register_password', {required: true, minLength: 6})}
        />
        {errors.register_password?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}
        {errors.register_password?.type === 'minLength' && <p className={`text-bold ${styles['warn-msg']}`}>最少不低於 6 碼</p>}
      </div>
      <div className={styles['cell']}>
        <label htmlFor='rePassword' className={`text-bold ${styles['label']}`}>請再次輸入密碼</label>
        <input 
          type="password" 
          placeholder='請再次輸入密碼'
          id='rePassword'
          {...register('rePassword', {required: true, minLength: 6})}
        />
        {errors.rePassword?.type === 'required' && <p className={`text-bold ${styles['warn-msg']}`}>此欄位不可為空</p>}
        {errors.rePassword?.type === 'minLength' && <p className={`text-bold ${styles['warn-msg']}`}>最少不低於 6 碼</p>}
      </div>
    </form>
  )
}


const Login = () => {
  const {
    formState: { errors },
  } = useForm();

  const [formState, setFormState] = useState({
    show: 'login',
    submit: ''
  });

  const onLoginFormSubmit = () => {
    if(formState.show === 'login') {
      // 代表當前已經是 login form 的狀態了，此時，按下登入紐，就是要將表單送出
      setFormState({
        ...formState,
        submit: 'login-submit'
      })
      return;
    }

    setFormState({
      ...formState,
      show: 'login',
      submit: ''
    })
  }

  const onRegisterFormSubmit = () => {
    if(formState.show === 'register') {
      // 代表當前已經是 register form 的狀態了，此時，按下註冊帳號紐，就是要將表單送出
      setFormState({
        ...formState,
        submit: 'register-submit'
      })
      return;
    }
    
    setFormState({
      ...formState,
      show: 'register',
      submit: ''
    })
  }

  return (
    <div className={styles['login-wrapper']}>
      <img className={styles['desktop-image']} src="/React_TodoList/left.png" alt="" />
      <div className={styles['form-wrapper']}>
        <img className={styles['mobile-image']} src="/React_TodoList/logo_lg.png" alt="" />
        <h3 className={`fz-large text-bold ${styles['title']}`}>最實用的線上代辦事項服務</h3>


        {/* Login Form | START */}
        <LoginForm 
          formDisplayState={formState}
        />
        {/* Login Form | END */}

        {/* Register Form | START */}
        <RegisterForm 
          formDisplayState={formState}
        />
        {/* Register Form | END*/}

        <div className={styles['btn-section']}>
            <button 
              className={`fz-medium text-bold ${formState.show ==='login' ? 'active' : ''}`}
              style={formState.show ==='login' ? {order: '-1'} : {}}
              type='button'
              onClick={() => {
                onLoginFormSubmit();
              }}
            >登入</button>
            <button 
              className={`fz-medium text-bold ${formState.show ==='register' ? 'active' : ''}`} 
              style={formState.show ==='register' ? {order: '-1'} : {}}
              type='button'
              onClick={() => {
                onRegisterFormSubmit();
              }}
            >註冊帳號</button>
        </div>
      </div>
    </div>
  )
}

export default Login;