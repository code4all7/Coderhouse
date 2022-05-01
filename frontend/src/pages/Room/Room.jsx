import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useWebRTC } from '../../hooks/useWebRTC'
import styles from './Room.module.css'

const Room = () => {
  const { id: roomId } = useParams()
  const user = useSelector((state) => state.authSlice.user)
  const { clients, provideRef } = useWebRTC(roomId, user)
  const navigate = useNavigate()

  const handleManualLeave = () => {
    navigate('/rooms')
  }

  return (
    <div>
      <div className='container'>
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src='/images/arrow-left.png' alt='arrow-left' />{' '}
          <span>All voice rooms</span>
        </button>
      </div>

      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>Node js is awsome!</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src='/images/palm.png' alt='palm' />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src='/images/win.png' alt='win' />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>

        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.userHead} key={client._id}>
                <audio
                  ref={(instance) => provideRef(instance, client._id)}
                  // controls
                  autoPlay
                ></audio>
                <img
                  src={client.avatar}
                  className={styles.userAvatar}
                  alt='avatar'
                />
                <h4>{client.name}</h4>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Room
