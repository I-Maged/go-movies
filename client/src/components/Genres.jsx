import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Genres = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    function getGenres() {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOptions = { method: 'GET', headers: headers }

      fetch(`/api/genres`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setGenres(data)
        })
        .catch((err) => console.log(err))
    }

    getGenres()
  }, [])

  return (
    <div>
      <h2>Genres</h2>
      <hr />
      <div className='list-group mx-3'>
        {genres.length > 0 &&
          genres.map((genre) => (
            <Link
              key={genre.id}
              className='list-group-item list-group-item-action'
              to={`/api/genres/${genre.id}`}
              state={{ genreName: genre.genre_name }}
            >
              {genre.genre_name}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Genres
