import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    function getMovies() {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/movies`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data)
        })
        .catch((err) => console.log(err))
    }

    getMovies()
  }, [])

  return (
    <div className='text-center'>
      <h2>Movies</h2>
      <hr />
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <th>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </th>
              <th>{movie.release_date}</th>
              <th>{movie.mpaa_rating}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Movies
