import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from './form/Input'
import Select from './form/Select'
import TextArea from './form/TextArea'
import Checkbox from './form/Checkbox'
import Swal from 'sweetalert2'

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
  const navigate = useNavigate()
  let { id } = useParams()
  if (id === undefined) {
    id = 0
  }

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState([])
  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    release_date: '',
    runtime: '',
    mpaa_rating: '',
    description: '',
    genres: [],
    genres_array: [],
  })

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login')
      return
    }

    if (id === 0) {
      // Adding a new movie
      function getGenres() {
        setMovie({
          id: 0,
          title: '',
          release_date: '',
          runtime: '',
          mpaa_rating: '',
          description: '',
          genres: [],
          genres_array: [],
        })

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOptions = { method: 'GET', headers: headers }

        fetch(`/api/genres`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const genresWithChecked = data.map((g) => ({
              ...g,
              checked: false,
            }))

            setMovie((prev) => ({ ...prev, genres: genresWithChecked }))
          })
          .catch((err) => console.log(err))
      }

      getGenres()
    } else {
      // Editing an existing movie
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + jwtToken)

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/admin/movies/${id}`, requestOptions)
        .then((res) => {
          if (res.status !== 200) {
            setError('Invalid response code: ', res.status)
          }

          return res.json()
        })
        .then((data) => {
          // fix date
          data.movie.release_date = new Date(data.movie.release_date)
            .toISOString()
            .split('T')[0]

          const checks = []
          data.genres.forEach((g) => {
            if (data.movie.genres_array.indexOf(g.id) !== -1) {
              checks.push({ id: g.id, checked: true, genre_name: g.genre_name })
            } else {
              checks.push({
                id: g.id,
                checked: false,
                genre_name: g.genre_name,
              })
            }
          })

          setMovie({ ...data.movie, genres: checks })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [jwtToken, navigate, id])

  const hasError = (key) => {
    return errors.indexOf(key) !== -1
  }

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setMovie({ ...movie, [name]: value })
  }

  const handleCheck = (e, position) => {
    const value = parseInt(e.target.value, 10)

    setMovie((currentMovie) => {
      const isChecking = !currentMovie.genres[position].checked

      const newGenres = currentMovie.genres.map((genre, index) => {
        if (index !== position) return genre
        return { ...genre, checked: isChecking }
      })

      let newGenresArray = [...currentMovie.genres_array]

      if (isChecking) {
        if (!newGenresArray.includes(value)) {
          newGenresArray.push(value)
        }
      } else {
        newGenresArray = newGenresArray.filter((id) => id !== value)
      }

      return {
        ...currentMovie,
        genres: newGenres,
        genres_array: newGenresArray,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let errors = []
    let required = [
      { field: movie.title, name: 'title' },
      { field: movie.release_date, name: 'release_date' },
      { field: movie.runtime, name: 'runtime' },
      { field: movie.mpaa_rating, name: 'mpaa_rating' },
      { field: movie.description, name: 'description' },
    ]

    required.forEach((obj) => {
      if (obj.field === '') {
        errors.push(obj.name)
      }
    })

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You must choose at least one genre',
        icon: 'error',
        confirmButtonText: 'OK!',
      })
      errors.push('genres')
    }

    setErrors(errors)

    if (errors.length > 0) {
      return false
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer ' + jwtToken)

    let method = 'Put'
    if (id > 0) {
      method = 'PATCH'
    }

    const requestBody = {
      ...movie,
      id: parseInt(movie.id, 10),
      release_date: new Date(movie.release_date).toISOString(),
      runtime: parseInt(movie.runtime, 10),
    }

    const requestOptions = {
      body: JSON.stringify(requestBody),
      method: method,
      headers: headers,
      credentials: 'include',
    }

    fetch(`/api/admin/movies/${movie.id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          navigate('/manage-catalouge')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='mb-5'>
      <h2>Add/Edit Movie</h2>
      <hr />

      {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}

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
          value={movie.mpaa_rating}
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

        <h3>Genres</h3>

        {movie.genres && movie.genres.length > 1 && (
          <>
            {Array.from(movie.genres).map((genre, index) => (
              <Checkbox
                title={genre.genre_name}
                name={'genre'}
                // key={index}
                key={genre.id}
                id={'genre-' + genre.id}
                value={genre.id}
                onChange={(e) => handleCheck(e, index)}
                checked={genre.checked || false}
              />
            ))}
          </>
        )}
        <hr />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default EditMovie
