import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navigation from './components/shared/Navigation/Navigation'
import Authenticate from './pages/Authenticate/Authenticate'
import Activate from './pages/Activate/Activate'
import Rooms from './pages/Rooms/Rooms'
import { useSelector } from 'react-redux'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh'
import Loader from './components/shared/Loader/Loader'
import Room from './pages/Room/Room'

function App() {
  const { loading } = useLoadingWithRefresh()
  return loading ? (
    <Loader message='Loading, Please wait...' />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path='/'
          exact
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path='/activate'
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />

        <Route
          path='/authenticate'
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path='/rooms'
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path='/room/:id'
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

const GuestRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.authSlice)

  if (auth) {
    return <Navigate to='/rooms' />
  }

  return children
}

const SemiProtectedRoute = ({ children }) => {
  const { auth, user } = useSelector((state) => state.authSlice)
  if (!auth) {
    return <Navigate to='/' />
  } else if (auth && !user.activated) {
    return children
  } else if (auth && user.activated) {
    return <Navigate to='/rooms' />
  }
}

const ProtectedRoute = ({ children }) => {
  const { auth, user } = useSelector((state) => state.authSlice)
  if (!auth) {
    return <Navigate to='/' />
  } else if (auth && !user.activated) {
    return <Navigate to='/activate' />
  } else if (auth && user.activated) {
    return children
  }
}

export default App
