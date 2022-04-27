import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import { sendOtp } from '../../../../http'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice'

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  const dispatch = useDispatch()

  const submit = async () => {
    if (!phoneNumber) return
    // server request
    const { data } = await sendOtp({ phone: phoneNumber })
    console.log(data)

    dispatch(setOtp({ phone: data.phone, hash: data.hash }))

    onNext()
  }

  return (
    <div>
      <Card title='Enter your phone number' icon='phone'>
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text={`Next`} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you're are agreeing to our Terms of Service
            and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Phone
