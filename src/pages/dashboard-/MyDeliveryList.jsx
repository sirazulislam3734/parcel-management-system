import { MdLocationPin } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myDeliveryData, refetch } = useQuery({
    queryKey: ["deliveries", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDeliveryList/${user?.email}`);
      return res.data;
    },
  });
  const handleCancelDelivery = async (deliveryId) => {
    console.log(deliveryId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Canceled it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .put(`/deliveryParcelCancel/${deliveryId}`, { status: "canceled"})
          .then((res) => {
            console.log("Delivery has been canceled.", res.data);
            if (res.data.modifiedCount > 0) {
                refetch()
              Swal.fire({
                title: "canceled!",
                text: "Delivery has been canceled.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleMarkDelivered = async (deliveryId) => {
    console.log(deliveryId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delivered it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .patch(`/deliveryParcelDeliver/${deliveryId?.Id}`, {
            status: "Delivered", email: user?.email , bookingUserId: deliveryId?._id
          })
          .then((res) => {
            console.log("Delivery has been Deliver.", res.data);
            if (res.data?.modifiedCount > 0) {
                refetch()
              Swal.fire({
                title: "Success!",
                text: "Delivery has been Delivered.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="space-y-6 lg:min-h-screen mx-auto">
      <h2 className="lg:text-5xl md:text-3xl text-xl text-center lg:my-10 md:my-5 my-2 font-bold">
        My Delivery List
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-slate-800 text-white rounded-lg">
            <tr>
              <th>Booked User</th>
              <th>Receiver</th>
              <th>User Phone</th>
              <th>Receiver Phone</th>
              <th>Requested Date</th>
              <th>Approx. Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myDeliveryData?.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.name}</td>
                <td>{delivery.receiverName}</td>
                <td>{delivery.phone}</td>
                <td>{delivery.receiverPhone}</td>
                <td>{delivery.deliveryDate}</td>
                <td>{delivery.approximateDeliveryDate}</td>
                <td className="space-x-2 space-y-1">
                  <button
                    className="btn btn-info text-nowrap btn-sm flex items-center"
                    onClick={() => console.log("View location clicked")}
                  >
                    <MdLocationPin className="mr-2" /> View Location
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    onClick={() => handleCancelDelivery(delivery._id)}
                    disabled={delivery.status === 'canceled' || delivery.status === 'Delivered'}
                  >
                    <AiOutlineCloseCircle className="mr-2" /> Cancel
                  </button>
                  <button
                    className="btn btn-success btn-sm flex items-center"
                    onClick={() => handleMarkDelivered(delivery)}
                    disabled={delivery.status === 'canceled' || delivery.status === 'Delivered'}
                  >
                    <AiOutlineCheckCircle className="mr-2" /> Deliver
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

export default MyDeliveryList;
