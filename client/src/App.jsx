import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'
import { useCookies } from 'react-cookie'

const App = () => {
  const [jwtToken, setJwtToken] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])

  const [alertMessage, setAlertMessage] = useState('')
  const [alertClassname, setAlertClassname] = useState('d-none')

  const [tickInterval, setTickInterval] = useState()

  const navigate = useNavigate()

  const toggleRefresh = useCallback(
    (status) => {
      const requestOptions = { method: 'GET', credentials: 'include' }
      if (status) {
        let i = setInterval(() => {
          console.log('ticking')
          fetch('/api/refresh', requestOptions)
            .then(async (response) => {
              if (!response.ok) {
                const text = await response.text()
                throw new Error(
                  `HTTP ${response.status}: ${text || response.statusText}`,
                )
              }

              const text = await response.text()
              const data = text ? JSON.parse(text) : {}
              return data
            })
            .then((data) => {
              if (data.access_token) {
                setCookie('access_token', data.access_token, { path: '/' })
              }
            })
            .catch((err) => {
              console.error('Refresh failed', err)
            })
        }, 600000)
        setTickInterval(i)
      } else {
        setTickInterval(null)
        clearInterval(tickInterval)
      }
    },
    [setCookie, tickInterval],
  )

  const logout = () => {
    const requestOptions = { method: 'GET', credentials: 'include' }
    fetch(`/api/logout`, requestOptions)
      .catch((err) => {
        console.log('error logging out', err)
      })
      .finally(() => {
        removeCookie('access_token', { path: '/' })
        toggleRefresh(false)
      })

    setJwtToken('')
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  useEffect(() => {
    const requestOptions = { method: 'GET', credentials: 'include' }
    fetch('/api/refresh', requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text()
          throw new Error(
            `HTTP ${response.status}: ${text || response.statusText}`,
          )
        }

        const text = await response.text()
        const data = text ? JSON.parse(text) : {}
        return data
      })
      .then((data) => {
        if (data.access_token) {
          setCookie('access_token', data.access_token, { path: '/' })
          toggleRefresh(true)
        }
      })
      .catch((err) => {
        console.error('Refresh failed', err)
      })

    const getCurrentUser = () => {
      const currentUser = localStorage.getItem('jwt')
      if (currentUser != null) {
        setJwtToken(currentUser)
      }
    }

    getCurrentUser()
  }, [setCookie, toggleRefresh])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='mt-3'>Go Watch a Movie!</h1>
        </div>
        <div className='col text-end'>
          {jwtToken === '' ? (
            <Link to='/login'>
              <span className='badge bg-success mt-4'>Login</span>
            </Link>
          ) : (
            <Link to='/login'>
              <span className='badge bg-danger mt-4' onClick={logout}>
                Logout
              </span>
            </Link>
          )}
        </div>
        <hr className='mb-3' />
      </div>

      <div className='row'>
        <div className='col-md-2'>
          <nav>
            <div className='list-group'>
              <Link to='/' className='list-group-item list-group-item-action'>
                Home
              </Link>
              <Link
                to='/movies'
                className='list-group-item list-group-item-action'
              >
                Movies
              </Link>
              <Link
                to='/genres'
                className='list-group-item list-group-item-action'
              >
                Genre
              </Link>

              {jwtToken !== '' && (
                <>
                  <Link
                    to='/admin/movie/0'
                    className='list-group-item list-group-item-action'
                  >
                    Add Movie
                  </Link>

                  <Link
                    to='/manage-catalouge'
                    className='list-group-item list-group-item-action'
                  >
                    Manage Catalouge
                  </Link>
                  <Link
                    to='/graphql'
                    className='list-group-item list-group-item-action'
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className='col-md-10'>
          <Alert message={alertMessage} className={alertClassname} />
          <Outlet
            context={{
              cookies,
              setCookie,
              jwtToken,
              setJwtToken,
              setAlertClassname,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
