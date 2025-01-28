import { MdLocationPin } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myDeliveryData } = useQuery({
    queryKey: ["deliveries", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDeliveryList/${user?.email}`);
      return res.data;
    },
  });
    const handleCancelDelivery = async (deliveryId) => {
        console.log(deliveryId);
        await axiosSecure.put(`/deliveryParcelCancel/${deliveryId}`, {status: "canceled"})
        .then(res => {
            console.log("Delivery has been canceled.", res.data);
        })
      
    };

    const handleMarkDelivered = async (deliveryId) => {
        console.log(deliveryId);
        await axiosSecure.patch(`/deliveryParcelDeliver/${deliveryId}`, {status: "Delivered"})
        .then(res => {
            console.log("Delivery has been canceled.", res.data);
        })
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
                  >
                    <AiOutlineCloseCircle className="mr-2" /> Cancel
                  </button>
                  <button
                    className="btn btn-success btn-sm flex items-center"
                    onClick={() => handleMarkDelivered(delivery._id)}
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
