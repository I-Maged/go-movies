import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const OneGenre = () => {
  const location = useLocation()
  const { genreName } = location.state
  const { id } = useParams()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    function getGenreMovies() {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/movies/genres/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data)
        })
        .catch((err) => console.log(err))
    }

    getGenreMovies()
  }, [id])

  return (
    <div className='text-center'>
      <h2>Genre: {genreName}</h2>
      <hr />
      {movies.length > 0 ? (
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
      ) : (
        <h3>No Movies in this genre yet</h3>
      )}
    </div>
  )
}

export default OneGenre
