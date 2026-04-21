import { Link } from 'react-router-dom'
import Ticket from '../images/movie-tickets.jpg'

const Home = () => {
  return (
    <div className='text-center'>
      <h2>find a movie to watch tonight!</h2>
      <hr />
      <Link to='/movies'>
        <img src={Ticket} width={300} height={200} alt='movie ticket' />
      </Link>
    </div>
  )
}

export default Home
