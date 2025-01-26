import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";
import img from "../assets/download (2).jpeg";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";

const Navbar = () => {
  const [isAdmin] = useAdmin();
  const [isDelivery] = useDeliveryMan();
  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "success!",
          text: "User Log out successfully!",
          icon: "success",
        });
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
    <nav className="bg-base-200 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-primary">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 inline-block mr-2"
            />
            Parcel Manager
          </Link>
        </div>

        {/* Notification Icon and Profile/Login */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button className="btn btn-ghost btn-circle">
            <FiBell className="text-2xl text-neutral" />
          </button>

          {user ? (
            <div className="relative">
              {/* Dropdown Menu */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                  <button>
                    <img
                      className="w-10 h-10 border rounded-full object-cover"
                      src={user.photoURL}
                      alt=""
                    />
                  </button>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content menu z-[1] md:w-96 p-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900"
                >
                  <div className="rounded-t-lg h-32 overflow-hidden">
                    <img
                      className="object-cover object-top w-full"
                      src={img}
                      alt="Mountain"
                    />
                  </div>
                  <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img
                      className="object-cover object-center h-32"
                      src={user.photoURL}
                      alt="Woman looking front"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-semibold md:text-2xl text-sm">
                      Name: {user.displayName}
                    </h2>
                    <p className="text-gray-500 md:text-lg text-sm">
                      Email: {user.email}
                    </p>
                  </div>
                  <div className="divider"></div>
                  { user && isAdmin && (<li className="text-xl"><Link to='/dashboard/statistics'><MdDashboardCustomize /> Dashboard</Link></li>)}
                  { user && !isAdmin && !isDelivery && (<li className="text-xl"><Link to='/dashboard/parcel'><MdDashboardCustomize /> Dashboard</Link></li>)}
                  { isDelivery && !isAdmin && (<li className="text-xl"><Link to='/dashboard/myDeliveryList'><MdDashboardCustomize /> Dashboard</Link></li>)}
                  <div className="lg:p-4 md:p-2 p-1 md:mx-8 mt-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="btn btn-primary">
            Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
