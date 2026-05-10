import { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

const ManageCatalouge = () => {
  const [movies, setMovies] = useState([])
  const { jwtToken } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login')
      return
    }
    function getMovies() {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + jwtToken)

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/admin/movies`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data)
        })
        .catch((err) => console.log(err))
    }

    getMovies()
  }, [jwtToken, navigate])

  return (
    <div className='text-center'>
      <h2>Manage Catalogue</h2>
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
                <Link to={`/admin/movie/${movie.id}`}>{movie.title}</Link>
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

export default ManageCatalouge
