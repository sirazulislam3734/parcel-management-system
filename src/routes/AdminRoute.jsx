/* eslint-disable react/prop-types */

import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation()
  
    if (loading || isAdminLoading) return <span className="loading loading-ring loading-lg"></span>
    if (user && isAdmin) return children
    return <Navigate to='/login' state={location.pathname} replace></Navigate>
};

export default AdminRoute;