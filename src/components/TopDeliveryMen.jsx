import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const TopDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allDelivery");
      return res.data;
    },
  });

  return (
    <div className="p-4 mx-auto lg:px-20 bg-base-200 md:px-10 lg:py-10 md:py-5">
      <div className="container mx-auto">
        {/* Title Animation */}
        <motion.h2
          className="md:text-3xl text-2xl font-bold text-center mb-4 lg:text-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Top Delivery Men
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((man, index) => (
            <motion.div
              key={man._id}
              className="bg-white shadow-lg w-full h-full rounded-lg px-4 py-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Profile Image Animation */}
              <motion.img
                src={man?.photo || "/default-avatar.png"}
                alt={man?.name}
                className="w-24 h-24 rounded-full mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              />

              <h3 className="text-lg font-semibold">{man.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Parcels Delivered:{" "}
                <span className="font-bold">{man?.totalDeliver}</span>
              </p>

              {/* Star Rating Animation */}
              <motion.div
                className="flex items-center my-2 justify-center"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.3 + 0.2, type: "spring", stiffness: 200 }}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.3 }}>
                    <FaStar
                      className={`mr-1 ${
                        i < man?.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  </motion.span>
                ))}
                <span className="text-sm text-gray-500 ml-2">{man?.rating}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMen;
