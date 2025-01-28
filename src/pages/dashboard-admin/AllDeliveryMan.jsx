import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDeliveryMan = [] } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allDeliveryMan");
      return res.data;
    },
  });
  return (
    <div className="lg:min-h-screen w-full">
      <h2 className="lg:text-5xl md:text-3xl lg:my-10 md:my-5 my-3 text-xl font-bold text-center">
        All Delivery Man
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-gray-700 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>parcels delivered</th>
              <th>Average review</th>
            </tr>
          </thead>
          <tbody>
            {allDeliveryMan.map((deliveryMan, index) => (
              <tr key={deliveryMan._id}>
                <th>{index + 1}</th>
                <td>{deliveryMan?.name}</td>
                <td>{deliveryMan?.phone}</td>
                <td>{deliveryMan?.totalDeliver} Delivered</td>
                <td>Review</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
