import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import logo from "../assets/images-removebg-preview.png";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Dashboard = () => {
    const navigate = useNavigate()
  const { user , signOutUser} = useAuth();
  const [isAdmin] = useAdmin();
  const [isDelivery] = useDeliveryMan();

  const handleSignOut = () => {
      signOutUser()
        .then(() => {
          Swal.fire({
            title: "success!",
            text: "User Log out successfully!",
            icon: "success",
          });
          navigate('/')
        })
        .catch((error) => {
          Swal.fire({
            title: "ERROR!",
            text: `${error.message}`,
            icon: "error",
          });
        });
    };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row ">
        {/**Dashboard side bar */}
        <div className="w-full md:w-64 bg-blue-600 text-white flex flex-col justify-between">
          <div>
            <div>
              <img src={logo} className="w-full px-10" alt="" />
            </div>
            {/* Logo */}
            <div className="flex items-center p-4 text-2xl font-bold">
              <FaHome className="mr-2" /> Dashboard
            </div>
            {/* Navigation Admin */}
            <div className="lg:flex flex-col items-center justify-center">
              {isAdmin ? (
                <ul className="space-y-2 menu font-semibold">
                  <li>
                    <NavLink to="/dashboard/statistics">
                      <BiSolidFoodMenu size={18} /> Statistics Page
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allParcel">
                      <TfiMenuAlt size={18} /> All Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allUsers">
                      <CgProfile size={18} /> All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allDeliveryMan">
                      <CgProfile size={18} /> All Delivery Man
                    </NavLink>
                  </li>

                  <div className="divider"></div>

                  <li>
                    <NavLink to="/">
                      <FaHome size={18} /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 justify-center">
                    <CiLogout size={18} /> Logout
                    </button>
                    </NavLink>
                  </li>
                </ul>
              ) : isDelivery ? (
                <ul className="space-y-2 menu font-semibold">
                  <li>
                    <NavLink to="/dashboard/myDeliveryList">
                      <BiSolidFoodMenu size={18} /> My Delivery List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myReviews">
                      <TfiMenuAlt size={18} /> My Reviews
                    </NavLink>
                  </li>

                  <div className="divider"></div>

                  <li>
                    <NavLink to="/">
                      <FaHome size={18} /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 justify-center">
                    <CiLogout size={18} /> Logout
                    </button>
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 menu font-semibold">
                  <li>
                    <NavLink to="/dashboard/parcel">
                      <BiSolidFoodMenu size={18} /> Book a Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myParcel">
                      <TfiMenuAlt size={18} /> My Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myProfile">
                      <CgProfile size={18} /> My Profile
                    </NavLink>
                  </li>

                  <div className="divider"></div>

                  <li>
                    <NavLink to="/">
                      <FaHome size={18} /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 justify-center">
                    <CiLogout size={18} /> Logout
                    </button>
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 flex flex-col-reverse gap-5 lg:items-center">
            <img
              className="w-10 h-10 border rounded-full object-cover"
              src={user.photoURL}
              alt=""
            />
            <div>
              <p className="text-sm font-medium">{user.displayName}</p>
            </div>
          </div>
        </div>
        {/**Dashboard Content */}
        <div className="flex-1 lg:p-10 md:p-8 p-4 bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
