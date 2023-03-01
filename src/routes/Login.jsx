import styles from '@/styles/Login.module.scss';
const Login = () => {
  return (
    <div className={styles['login-wrapper']}>
      <img className={styles['desktop-image']} src="src/assets/images/left.png" alt="" />
      <div className={styles['form-wrapper']}>
        <img className={styles['mobile-image']} src="src/assets/images/logo_lg.png" alt="" />
        <h3 className={`fz-large text-bold ${styles['title']}`}>最實用的線上代辦事項服務</h3>
        <form>
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

          <div className={styles['btn-section']}>
            <button 
              className={`fz-medium active text-bold`}
              type='submit'
            >登入</button>
            <button className='fz-medium text-bold' type='button'>註冊帳號</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;