import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    let myMovie = {
      id: 1,
      title: 'Highlander',
      release_date: '1986-5-10',
      runtime: 116,
      mpaa_rating: 'R',
      description: 'Some lengthy description',
    }
    function getMovie() {
      setMovie(myMovie)
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
      <hr />
      <p>{movie.description}</p>
    </div>
  )
}

export default Movie
