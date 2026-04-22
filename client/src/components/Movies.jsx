import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let moviesList = [
      {
        id: 1,
        title: 'Highlander',
        release_date: '1986-5-10',
        runtime: 116,
        mpaa_rating: 'R',
        description: 'Some lengthy description',
      },
      {
        id: 2,
        title: 'American History X',
        release_date: '1986-5-10',
        runtime: 116,
        mpaa_rating: 'PG-13',
        description: 'Some lengthy description',
      },
      {
        id: 3,
        title: 'Men in black',
        release_date: '1986-5-10',
        runtime: 116,
        mpaa_rating: 'ff',
        description: 'Some lengthy description',
      },
    ]

    function getMovies() {
      setMovies(moviesList)
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
