import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/shared/Button/Button'
import Card from '../../components/shared/Card/Card'
import styles from './Home.module.css'

const Home = () => {
  const siginLink = {
    color: '#0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px',
  }
  const navigate = useNavigate()
  const startRegister = () => {
    navigate('/authenticate')
    console.log('register clicked')
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title='Welcome to Coderhouse' icon='logo'>
        <p className={styles.text}>
          We're working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text={`Let's go`} />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  )
}

export default Home
