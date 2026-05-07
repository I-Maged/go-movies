import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from './form/Input'
import Select from './form/Select'
import TextArea from './form/TextArea'

/* const genreOptions = [
  { id: 'Drama', value: 'Drama' },
  { id: 'Crime', value: 'Crime' },
  { id: 'Action', value: 'Action' },
  { id: 'Comic Book', value: 'Comic Book' },
  { id: 'Sci-Fi', value: 'Sci-Fi' },
  { id: 'Mystery', value: 'Mystery' },
  { id: 'Adventure', value: 'Adventure' },
  { id: 'Comedy', value: 'Comedy' },
  { id: 'Romance', value: 'Romance' },
] */
const mpaaOptions = [
  { id: 'G', value: 'G' },
  { id: 'PG', value: 'PG' },
  { id: 'PG-13', value: 'PG-13' },
  { id: 'R', value: 'R' },
  { id: 'NC17', value: 'NC17' },
  { id: '18A', value: '18A' },
]

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
    <div>
      <h2>Add/Edit Movie</h2>
      <hr />

      <pre>{JSON.stringify(movie, null, 3)}</pre>

      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' value={movie.id} id='id' />
        <Input
          title={'title'}
          name={'title'}
          className={'form-control'}
          type={'text'}
          value={movie.title}
          onChange={handleChange}
          errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a title'}
        />
        <Input
          title={'Release Date'}
          name={'release_date'}
          className={'form-control'}
          type={'date'}
          value={movie.release_date}
          onChange={handleChange}
          errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a Release Date'}
        />
        <Input
          title={'Runtime'}
          name={'runtime'}
          className={'form-control'}
          type={'text'}
          value={movie.runtime}
          onChange={handleChange}
          errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter Runtime'}
        />
        <Select
          title={'MPAA Rating'}
          name={'mpaa_rating'}
          value={movie.runtime}
          onChange={handleChange}
          placeHolder={'Choose rating'}
          options={mpaaOptions}
          errorDiv={hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a rating'}
        />

        <TextArea
          title={'Description'}
          name={'description'}
          className={'form-control'}
          type={'text'}
          value={movie.description}
          rows={'3'}
          onChange={handleChange}
          errorDiv={hasError('description') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a description'}
        />
      </form>
    </div>
  )
}

export default EditMovie
