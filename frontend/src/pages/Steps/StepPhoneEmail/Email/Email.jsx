import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = () => {
  const [email, setEmail] = useState('')

  return (
    <div>
      <Card title='Enter your email id' icon='email-emoji'>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text={`Next`} />
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

export default Email
