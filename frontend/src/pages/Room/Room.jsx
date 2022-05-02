import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useWebRTC } from '../../hooks/useWebRTC'
import { getRoom } from '../../http'
import styles from './Room.module.css'

const Room = () => {
  const { id: roomId } = useParams()
  const user = useSelector((state) => state.authSlice.user)
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user)
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [isMute, setMute] = useState(true)

  useEffect(() => {
    handleMute(isMute, user._id)
    console.log('mute - ', isMute)
  }, [isMute])

  const handleManualLeave = () => {
    navigate('/rooms')
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId)
      // console.log(data)
      setRoom((prev) => data)
    }
    fetchRoom()
  }, [roomId])

  const handleMuteClick = (clientId) => {
    if (clientId !== user._id) return
    setMute((isMute) => !isMute)
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
          <h2 className={styles.topic}>{room?.topic}</h2>
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
              <div className={styles.client} key={client._id}>
                <div className={styles.userHead}>
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

                  <button
                    onClick={() => handleMuteClick(client._id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img src='/images/mic-mute.png' alt='mic-mute-icon' />
                    ) : (
                      <img src='/images/mic.png' alt='mic-icon' />
                    )}
                  </button>
                </div>
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
