import styles from '@/styles/Navbar.module.scss';
const Navbar = () => {
  return (
    <nav>
      <a href="#" className={styles.logo}>
        <img src="src/assets/images/logo.png" alt="" />
      </a>

      <ul className={styles['header-root-list']}>
        <li className={`fz-medium text-bold ${styles['header-option']} ${styles['username']}`}>王小明的代辦</li>
        <li className={`fz-medium ${styles['header-option']} ${styles['logout-btn']}`}>登出</li>
      </ul>
    </nav>
  )
}

export default Navbar;