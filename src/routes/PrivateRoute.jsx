/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  if (loading) return (<div className='flex items-center justify-center w-full min-h-[calc(100vh-305px)]'><span className="loading loading-ring w-32 "></span></div>)
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace></Navigate>
}

export default PrivateRoute