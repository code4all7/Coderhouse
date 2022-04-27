import React, { useState } from 'react'
import styles from './Authenticate.module.css'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
}

const Authenticate = () => {
  const [step, setStep] = useState(1)

  const onNext = () => {
    setStep(step + 1)
  }

  const Step = steps[step]
  return (
    <>
      <div className={styles.cardWrapper}>
        <Step onNext={onNext} />
        {/* <Card title='Enter your phone number' icon='phone'></Card> */}
      </div>
    </>
  )
}

export default Authenticate
