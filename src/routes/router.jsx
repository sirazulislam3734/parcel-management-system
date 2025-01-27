import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import BookAParcel from "../pages/dashboard-users/BookAParcel";
import StatisticsPage from "../pages/dashboard-admin/StatisticsPage";
import AllParcels from "../pages/dashboard-admin/AllParcels";
import UserAndDelivery from "../pages/dashboard-admin/UserAndDelivery";
import MyParcel from "../pages/dashboard-users/MyParcel";
import MyProfile from "../pages/dashboard-users/MyProfile";
import AdminRoute from "./AdminRoute";
import UpdateMyParcel from "../pages/dashboard-users/UpdateMyParcel";
import AllDeliveryMan from "../pages/dashboard-admin/AllDeliveryMan";
import DeliveryManRoute from "./DeliveryManRoute";
import MyDeliveryList from "../pages/dashboard-/MyDeliveryList";
import MyReviews from "../pages/dashboard-/MyReviews";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home> ,
        },
        {
            path: "/signin",
            element: <SignIn></SignIn> ,
        },
        {
            path: "/signup",
            element: <SignUp></SignUp>,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'parcel',
          element: <BookAParcel></BookAParcel>
        },
        {
          path: 'myParcel',
          element: <MyParcel />
        },
        {
          path: 'updateParcel/:id',
          element: <UpdateMyParcel />,
          // loader: ({params}) => fetch(`http://localhost:4000/bookAParcel/${params.id}`)
        },
        {
          path: 'myProfile',
          element: <MyProfile />
        },
        // Admin Routes
        {
          path: 'statistics',
          element: <AdminRoute><StatisticsPage /></AdminRoute>
        },
        {
          path: 'allParcel',
          element: <AdminRoute><AllParcels /></AdminRoute>
        },
        {
          path: 'allUsers',
          element: <AdminRoute><UserAndDelivery /></AdminRoute>
        },
        {
          path: 'allDeliveryMan',
          element: <AdminRoute><AllDeliveryMan /></AdminRoute>
        },
        // Delivery Routes
        {
          path: 'myDeliveryList',
          element: <DeliveryManRoute><MyDeliveryList /></DeliveryManRoute>,
        },
        {
          path: 'myReviews',
          element: <DeliveryManRoute><MyReviews /></DeliveryManRoute>,
        },
      ]
    }
  ]);