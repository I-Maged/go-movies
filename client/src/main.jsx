import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Home from '../src/components/Home.jsx'
import Movies from '../src/components/Movies.jsx'
import Movie from '../src/components/Movie.jsx'
import EditMovie from '../src/components/EditMovie.jsx'
import Genres from './components/Genres.jsx'
import Graphql from './components/Graphql.jsx'
import Login from './components/Login.jsx'
import ManageCatalouge from './components/ManageCatalouge.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/movies/:id', element: <Movie /> },
      { path: '/genres', element: <Genres /> },
      { path: '/admin/movie/0', element: <EditMovie /> },
      { path: '/manage-catalouge', element: <ManageCatalouge /> },
      { path: '/graphql', element: <Graphql /> },
      { path: '/login', element: <Login /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
