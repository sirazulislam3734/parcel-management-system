/* eslint-disable react/prop-types */

import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useDeliveryMan from '../hooks/useDeliveryMan';

const DeliveryManRoute = ({children}) => {
      const { loading } = useAuth();
      const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
    
      const location = useLocation()
    
      if (loading || isDeliveryManLoading) return (<div className='flex items-center justify-center w-full min-h-[calc(100vh-305px)]'><span className="loading loading-ring w-32 "></span></div>)
      if (isDeliveryMan) return children
      return <Navigate to='/login' state={location.pathname} replace></Navigate>
     
};

export default DeliveryManRoute;