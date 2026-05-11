import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    function getMovie() {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/movies/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.genres) {
            data.genres = Object.values(data.genres)
          } else {
            data.genres = []
          }
          setMovie(data)
        })
        .catch((err) => console.log(err))
    }

    getMovie()
  }, [id])

  return (
    <div className='text-center'>
      <h2>{movie.title}</h2>
      <small>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated:{' '}
          {movie.mpaa_rating}
        </em>
      </small>
      <div>
        {movie.genres &&
          movie.genres.map((genre) => (
            <span key={genre.id} className='badge bg-secondary me-2'>
              {genre.genre_name}
            </span>
          ))}
      </div>
      <hr />
      {movie.image !== '' && (
        <div className='mb-3'>
          <img src={movie.image} alt={movie.title} />
        </div>
      )}
      <p>{movie.description}</p>
    </div>
  )
}

export default Movie
