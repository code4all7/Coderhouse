import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
import { logout } from '../../../http/index'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthLogout } from '../../../store/authSlice'

const Navigation = () => {
  const brandStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
  }
  const logoText = {
    marginLeft: '10px',
  }

  const dispatch = useDispatch()
  const { auth, user } = useSelector((state) => state.authSlice)

  async function logoutUser() {
    try {
      const { data } = await logout()
      dispatch(setAuthLogout(data))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`${styles.navbar} container`}>
      <Link style={brandStyle} to='/'>
        <img src='/images/logo.png' alt='logo' />
        <span style={logoText}>Coderhouse</span>
      </Link>
      {auth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>

          <Link to='/'>
            <img
              width='40'
              height='40'
              className={styles.avatar}
              src={user.avatar ? user.avatar : '/images/monkey-avatar.png'}
              alt='avatar'
            />
          </Link>

          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src='/images/logout.png' alt='logout' />
          </button>
        </div>
      )}
    </div>
  )
}

export default Navigation
