import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaBox, FaCheckCircle, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const AppStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allParcelBook");
      return res.data;
    },
  });

  const { data: deliveries = [] } = useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/deliveryMan");
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:px-20 bg-base-200 md:px-10 md:py-5">
      <div className="container mx-auto">
        <motion.h2
          className="md:text-3xl text-2xl font-bold text-center mb-4 lg:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Statistics
        </motion.h2>

        <motion.p
          className="text-sm md:text-lg text-center font-normal lg:mb-3 mb-1 lg:w-3/5 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Our Statistics In this section you will see all the booked parcels and along with that you will see the number of parcels delivered by the delivery man and those who are running our app.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Booked Parcels */}
          <motion.div
            className="shadow-lg bg-white rounded-lg p-6 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="text-4xl text-black mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaBox />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Total Booked Parcels</h3>
            <CountUp
              className="text-3xl font-bold text-primary"
              start={0}
              end={parcels.length}
              duration={2}
              separator=","
            />
          </motion.div>

          {/* Total Delivered Parcels */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="text-4xl text-black mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaCheckCircle />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Total Delivered Parcels</h3>
            <CountUp
              className="text-3xl font-bold text-primary"
              start={0}
              end={deliveries?.length}
              duration={2}
              separator=","
            />
          </motion.div>

          {/* Total Registered Users */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div
              className="text-4xl text-black mb-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaUsers />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Total Registered Users</h3>
            <CountUp
              className="text-3xl font-bold text-primary"
              start={0}
              end={users.length}
              duration={2}
              separator=","
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppStatistics;
