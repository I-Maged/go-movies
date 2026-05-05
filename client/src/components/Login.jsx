import { useRef, useState } from 'react'
import Input from './form/Input'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()

  const {
    toggleRefresh,
    setCookie,
    setJwtToken,
    setAlertClassname,
    setAlertMessage,
  } = useOutletContext()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    let payload = { email, password }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    }

    fetch('/api/authenticate', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClassname('alert-danger')
          setAlertMessage(data.message)
        } else {
          setJwtToken(data.access_token)
          setAlertClassname('d-none')
          setAlertMessage('')

          localStorage.setItem('jwt', data.access_token)
          setCookie('access_token', data.access_token, { path: '/' })
          setCookie('refresh_token', data.refresh_token, { path: '/' })
          toggleRefresh(true)

          navigate('/')
        }
      })
      .catch((error) => {
        setAlertClassname('alert-danger')
        setAlertMessage(error)
      })
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
