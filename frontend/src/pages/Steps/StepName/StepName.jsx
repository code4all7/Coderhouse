import React, { useState } from 'react'
import styles from './StepName.module.css'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../../store/activateSlice'

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activateSlice)
  const [fullName, setFullName] = useState(name)
  const dispatch = useDispatch()
  function nextStep() {
    if (!fullName) {
      return
    }

    dispatch(setName(fullName))
    onNext()
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title={`What's your full name?`} icon='goggle-emoji'>
        <TextInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div>
          <p className={styles.bottomParagraph}>
            Peoples use real name at codershouse :) !
          </p>
          <div className={styles.actionButtonWrap}>
            <Button onClick={nextStep} text={`Next`} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default StepName
