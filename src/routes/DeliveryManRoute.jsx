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

// const navLinks = [
//       { path: "/", name: "Home", icon: <FiHome /> },
//       { path: "/shop", name: "Shop", icon: <FiShoppingCart /> },
//       { path: "/all-gadgets", name: "All Gadgets", icon: <FiGrid /> },
//       { path: "/about-us", name: "About", icon: <FiInfo /> },
//       { path: "/contact-us", name: "Contact", icon: <FiPhone /> },
//     ];