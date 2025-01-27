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
// import MyDeliveryList from "../pages/dashboard-Delivery-man/MyDeliveryList";
// import MyReviews from "../pages/dashboard-Delivery-man/MyReviews";
import MyParcel from "../pages/dashboard-users/MyParcel";
import MyProfile from "../pages/dashboard-users/MyProfile";
import AdminRoute from "./AdminRoute";
import UpdateMyParcel from "../pages/dashboard-users/UpdateMyParcel";

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
          path: 'usersAndDelivery',
          element: <AdminRoute><UserAndDelivery /></AdminRoute>
        },
        // Delivery Routes
        // {
        //   path: 'myDeliveryList',
        //   element: <MyDeliveryList />
        // },
        // {
        //   path: 'myReviews',
        //   element: <MyReviews />
        // },
      ]
    }
  ]);