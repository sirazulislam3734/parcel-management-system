/* eslint-disable react/prop-types */

import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useDeliveryMan from '../hooks/useDeliveryMan';
import DeadlineLoading from '../components/DeadlineLoading';

const DeliveryManRoute = ({children}) => {
      const { loading } = useAuth();
      const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
    
      const location = useLocation()
    
      if (loading || isDeliveryManLoading) return (<DeadlineLoading></DeadlineLoading>)
      if (isDeliveryMan) return children
      return <Navigate to='/login' state={location.pathname} replace></Navigate>
     
};

export default DeliveryManRoute;