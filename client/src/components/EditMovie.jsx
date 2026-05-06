import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from './form/Input'

const EditMovie = () => {
  const { jwtToken } = useOutletContext()
  const { id } = useParams()
  const navigate = useNavigate()

  // const[error,setError]=useState(null)
  const [errors, setErrors] = useState([])
  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    release_date: '',
    runtime: '',
    mpaa_rating: '',
    description: '',
  })

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login')
      return
    }
  }, [jwtToken, navigate])

  const hasError = (key) => {
    return errors.indexOf(key) !== -1
  }

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setMovie({ ...movie, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='text-center'>
      <h2>Add/Edit Movie</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' value={movie.id} id='id' />

        <Input
          title={'title'}
          name={'title'}
          className={'form-control'}
          type={'text'}
          value={movie.title}
          onChange={handleChange('title')}
          errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a title'}
        />
      </form>
    </div>
  )
}

export default EditMovie
