/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import { HiUserGroup } from "react-icons/hi2";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserAndDelivery = () => {
    const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUser");
      return res.data;
    },
  });

  const handleMakeDeliveryMan = (user) => {
    axiosSecure.patch(`/users/deliveryMan/${user._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                title: "Good job!",
                text: `${user.name} is an Delivery Man Now!`,
                icon: "success"
              });
        }
    })
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.put(`/users/AdminRole/${user._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                title: "Good job!",
                text: `${user.name} is an Admin Now!`,
                icon: "success"
              });
        }
    })
  };

  return (
    <div className="lg:min-h-screen">
      <h2 className="lg:text-5xl md:text-3xl lg:my-10 md:my-5 my-3 text-xl font-bold text-center">All Users</h2>
      <div className="overflow-x-auto ">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Name</th>
              <th className="text-left">Phone Number</th>
              <th className="text-left">parcels Booked</th>
              <th className="text-left">Total Amount</th>
              <th className="text-left">Delivery Man Role</th>
              <th className="text-left">Admin Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>5</td>
                <td>205 TK</td>
                <td>
                  {user.role === "Delivery Man" ? (
                    <span className="bg-green-100 text-nowrap px-2 border border-green-400 py-1 rounded-full">
                      Delivery Man
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeDeliveryMan(user)}
                      className="p-3 rounded-xl"
                    //   disabled={}
                    >
                      <HiUserGroup size={25} />
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "Admin" ? (
                    <span className="bg-green-100 border px-2 border-green-400 py-1 rounded-full">
                      Admin
                    </span>
                  ) : (
                    <button
                    onClick={() => handleMakeAdmin(user)}
                      className="p-3 rounded-xl"
                    //   disabled={}
                    >
                      <HiUserGroup size={25} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAndDelivery;
