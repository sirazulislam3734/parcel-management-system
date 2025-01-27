/* eslint-disable react/prop-types */

import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation()
  
    if (loading || isAdminLoading) return (<div className='flex items-center justify-center w-full min-h-[calc(100vh-305px)]'><span className="loading loading-ring w-32 "></span></div>)
    if (user && isAdmin) return children
    return <Navigate to='/login' state={location.pathname} replace></Navigate>
};

export default AdminRoute;