import React, { useState } from 'react'
import styles from './AddRoomModel.module.css'
import TextInput from '../shared/TextInput/TextInput'
import { createRoom as create } from '../../http'
import { useNavigate } from 'react-router-dom'

const AddRoomModel = ({ onClose }) => {
  const [roomType, setRoomType] = useState('open')
  const [topic, setTopic] = useState('')
  const navigate = useNavigate()

  async function createRoom() {
    try {
      if (!topic) return
      const { data } = await create({ topic, roomType })
      navigate(`/room/${data.id}`)
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src='/images/close.png' alt='close' />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            fullwidth='true'
          />
          <h2 className={styles.subHeading}>Room type</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType('open')}
              className={`${styles.typeBox} ${
                roomType === 'open' ? styles.active : ''
              } `}
            >
              <img src='/images/globe.png' alt='globe' />
              <p>Open</p>
            </div>
            <div
              onClick={() => setRoomType('social')}
              className={`${styles.typeBox} ${
                roomType === 'social' ? styles.active : ''
              } `}
            >
              <img src='/images/social.png' alt='ii' />
              <p>Social</p>
            </div>
            <div
              onClick={() => setRoomType('private')}
              className={`${styles.typeBox} ${
                roomType === 'private' ? styles.active : ''
              } `}
            >
              <img src='/images/lock.png' alt='ii' />
              <p>Closed</p>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src='/images/celebration.png' alt='celebration' />
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddRoomModel
