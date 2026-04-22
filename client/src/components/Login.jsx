import { useRef, useState } from 'react'
import Input from './form/Input'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()

  const { setJwtToken, setAlertClassname, setAlertMessage } = useOutletContext()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === 'admin@example.com') {
      setJwtToken('abc')
      setAlertClassname('d-none')
      setAlertMessage('')
      navigate('/')
    } else {
      setAlertClassname('alert-danger')
      setAlertMessage('Invalid Credentials')
    }
  }

  return (
    <div className=' col-md-6 offset-md-3'>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          title='Email address'
          type='email'
          className='form-control'
          id='email'
          name='email'
          ref={emailRef}
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email-new'
          value={email}
        />
        <Input
          title='Password'
          type='password'
          className='form-control'
          id='password'
          name='password'
          ref={passwordRef}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='password-new'
          value={password}
        />

        <hr />

        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </div>
  )
}

export default Login
