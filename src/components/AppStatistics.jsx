
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AppStatistics = () => {
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setLoading(false)
      return res.data;
    },
  });

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allParcelBook");
      setLoading(false)
      return res.data;
    },
  });

  const { data: deliveries = [] } = useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/deliveryMan");
      setLoading(false)
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:px-20 bg-base-200 md:px-10 md:py-5">
        <h2 className="md:text-3xl text-2xl font-bold text-center mb-4 lg:text-4xl">Our Statistics</h2>
        <p className="text-sm md:text-lg text-center font-normal lg:mb-3 mb-1 lg:w-3/5 mx-auto">Our Statistics In this section you will see all the booked parcels and along with that you will see the number of parcels delivered by the delivery man and those who are running our app.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading ? (
        <p className="text-center col-span-3">Loading statistics...</p>
      ) : (
        <>
          {/* Total Booked Parcels */}
          <div className=" shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Booked Parcels</h3>
            <CountUp
              className="text-3xl font-bold text-blue-500"
              start={0}
              end={parcels.length}
              duration={2}
              separator=","
            />
          </div>

          {/* Total Delivered Parcels */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Delivered Parcels</h3>
            <CountUp
              className="text-3xl font-bold text-green-500"
              start={0}
              end={deliveries?.length}
              duration={2}
              separator=","
            />
          </div>

          {/* Total Registered Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Total Registered Users</h3>
            <CountUp
              className="text-3xl font-bold text-purple-500"
              start={0}
              end={users.length}
              duration={2}
              separator=","
            />
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default AppStatistics;
