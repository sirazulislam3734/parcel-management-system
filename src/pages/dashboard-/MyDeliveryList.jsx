
import { MdLocationPin } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
  const {data } = useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
        const res = await axiosSecure.get("/myDeliveries");
        console.log('res', res.data);
    }
  })
console.log(data, 'params');
//   const handleCancelDelivery = async (deliveryId) => {
//     const confirm = window.confirm(
//       "Are you sure you want to cancel this delivery?"
//     );
//     if (!confirm) return;

//     try {
//       await axios.put(`/api/deliveries/${deliveryId}/cancel`);
//       console.log("Delivery has been canceled.");
//       fetchDeliveries();
//     } catch (error) {
//       console.error("Error canceling delivery:", error);
//       console.log("Failed to cancel the delivery.");
//     }
//   };

//   const handleMarkDelivered = async (deliveryId) => {
//     const confirm = window.confirm(
//       "Are you sure you want to mark this as delivered?"
//     );
//     if (!confirm) return;

//     try {
//       await axios.put(`/api/deliveries/${deliveryId}/deliver`);
//       console.log("Delivery marked as delivered.");
//       fetchDeliveries();
//     } catch (error) {
//       console.error("Error marking delivery as delivered:", error);
//       console.log("Failed to update the delivery status.");
//     }
//   };


  return (
    <div className="space-y-6 lg:min-h-screen mx-auto">
      <h2 className="lg:text-5xl md:text-3xl text-xl text-center lg:my-10 md:my-5 my-2 font-bold">My Delivery List</h2>
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
            {/* {deliveries.map((delivery) => ( */}
              <tr 
            //   key={delivery._id}
              >
                <td>
                    {/* {delivery.bookedUserName} */}
                    </td>
                <td>
                    {/* {delivery.receiverName} */}
                    </td>
                <td>
                    {/* {delivery.bookedUserPhone} */}
                    </td>
                <td>
                    {/* {delivery.receiverPhone} */}
                    </td>
                <td>
                    {/* {delivery.requestedDeliveryDate} */}
                    </td>
                <td>
                    {/* {delivery.approximateDeliveryDate} */}
                    </td>
                <td className="space-x-2 space-y-1">
                  <button
                    className="btn btn-info btn-sm flex items-center"
                    onClick={() => console.log("View location clicked")}
                  >
                    <MdLocationPin className="mr-2" /> View Location
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    // onClick={() => handleCancelDelivery(delivery._id)}
                  >
                    <AiOutlineCloseCircle className="mr-2" /> Cancel
                  </button>
                  <button
                    className="btn btn-success btn-sm flex items-center"
                    // onClick={() => handleMarkDelivered(delivery._id)}
                  >
                    <AiOutlineCheckCircle className="mr-2" /> Deliver
                  </button>
                </td>
              </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
