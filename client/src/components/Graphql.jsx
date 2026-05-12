import { useEffect, useState } from 'react'
import Input from './form/Input'
import { Link } from 'react-router-dom'

const Graphql = () => {
  const [movies, setMovies] = useState([])
  const [fullList, setFullList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const performSearch = () => {
    const payload = `
    {
      search(titleContains: "${searchTerm}") {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`

    const headers = new Headers()
    headers.append('Content-Type', 'application/graphql')

    const requestOptions = { method: 'POST', headers: headers, body: payload }

    fetch(`/api/graph`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let theList = Object.values(data.data.search)
        setMovies(theList)
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    e.preventDefault()

    let value = e.target.value
    setSearchTerm(value)

    if (value.length > 2) {
      performSearch()
    } else {
      setMovies(fullList)
    }
  }

  useEffect(() => {
    const payload = `
                  {
                    list {
                        id
                        title
                        runtime
                        release_date
                        mpaa_rating
                    }
                  }`

    const headers = new Headers()
    headers.append('Content-Type', 'application/graphql')

    const requestOptions = { method: 'POST', headers: headers, body: payload }

    fetch(`/api/graph`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let theList = Object.values(data.data.list)
        setMovies(theList)
        setFullList(theList)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='text-center'>
      <h2>GraphQL</h2>
      <hr />
      <form onSubmit={handleChange}>
        <Input
          title='Search Term'
          type='search'
          className='form-control'
          id='searchTerm'
          name='searchTerm'
          placeholder='Search Term'
          onChange={handleChange}
          autoComplete='search-term-new'
          value={searchTerm}
        />
      </form>

      {movies ? (
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
                <th>{new Date(movie.release_date).toLocaleDateString()}</th>
                <th>{movie.mpaa_rating}</th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies yet</p>
      )}
    </div>
  )
}

export default Graphql
