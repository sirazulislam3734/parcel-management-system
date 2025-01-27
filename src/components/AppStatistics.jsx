import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";

const AppStatistics = () => {
  const [stats, setStats] = useState({
    totalParcels: 0,
    totalDelivered: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

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
              end={stats.totalParcels}
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
              end={stats.totalDelivered}
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
              end={stats.totalUsers}
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
