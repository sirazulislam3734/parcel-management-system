/* eslint-disable react/prop-types */

import DeadlineLoading from '../components/DeadlineLoading';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation()
  
    if (loading || isAdminLoading) return (<DeadlineLoading />)
    if (isAdmin) return children
    return <Navigate to='/login' state={location.pathname} replace></Navigate>
};

export default AdminRoute;