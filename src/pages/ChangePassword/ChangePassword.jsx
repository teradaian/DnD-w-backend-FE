import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import styles from './ChangePassword.module.css'

const ChangePassword = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
    <div className='app'>
      <main className='card title'>
        <h1>Change Password</h1>
      </main><br />
    </div>
    <div className='app'>
      <ChangePasswordForm {...props} updateMessage={updateMessage} />
      <p>{message}</p>
    </div>
    </>
  )
}

export default ChangePassword
