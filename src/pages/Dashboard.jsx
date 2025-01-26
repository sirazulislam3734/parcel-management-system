import { Outlet, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {

    const isAdmin = true;
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row h-screen">
        {/**Dashboard side bar */}
        <div className="w-full md:w-64 bg-blue-600 text-white flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center p-4 text-2xl font-bold">
              <FaHome className="mr-2" /> Dashboard
            </div>

            {/* Navigation user */}
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
            </ul>

            {/* Navigation Admin */}
            {
                isAdmin && (<ul className="space-y-2 menu font-semibold">
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
                      <NavLink to="/dashboard/usersAndDelivery">
                        <CgProfile size={18} /> All Users & Delivery Men
                      </NavLink>
                    </li>
      
                    <div className="divider"></div>
      
                    <li>
                      <NavLink to="/">
                        <FaHome size={18} /> Home
                      </NavLink>
                    </li>
                  </ul>)
            }

            {/* Navigation Delivery */}
            {/* {
                isDelivery && (
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
            </ul>
                )
            } */}
          </div>

          {/* User Profile */}
        <div className="p-4 flex items-center">
          <img src="" alt="" />
          <div>
            <p className="text-sm font-medium">Tom Cook</p>
          </div>
        </div>
        </div>
        {/**Dashboard Content */}
        <div className="flex-1 lg:p-16 md:p-8 p-4 bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
