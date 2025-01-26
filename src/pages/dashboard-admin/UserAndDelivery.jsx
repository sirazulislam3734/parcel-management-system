/* eslint-disable no-undef */
import SectionTitle from "../../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { HiUserGroup } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserAndDelivery = () => {
    const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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

  const handleRemoveUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        subTitle="---How many??---"
        heading="MANAGE ALL USERS"
      ></SectionTitle>
      <div className="overflow-x-auto ">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "Admin" ? (
                    <span className="bg-green-100 border px-2 border-green-400 py-1 rounded-full">
                      Admin
                    </span>
                  ) : user.role === "Delivery Man" ? (
                    <span className="bg-green-100 text-nowrap px-2 border border-green-400 py-1 rounded-full">
                      Delivery Man
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeDeliveryMan(user)}
                      className="p-3 rounded-xl text-white bg-yellow-500"
                    >
                      <HiUserGroup size={25} />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveUser(user)}
                    className="text-red-600"
                  >
                    <MdDeleteForever size={35} />
                  </button>
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
