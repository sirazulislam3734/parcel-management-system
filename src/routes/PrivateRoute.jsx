/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import DeadlineLoading from '../components/DeadlineLoading'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  if (loading) return (<DeadlineLoading></DeadlineLoading>)
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace></Navigate>
}

export default PrivateRoute