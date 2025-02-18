import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

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
        <h2 className="md:text-3xl text-2xl font-bold text-center mb-4 lg:text-4xl">
          Top Delivery Men
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:py-5 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((man) => (
            <div
              key={man._id}
              className="bg-white shadow-lg w-full h-full rounded-lg px-4 py-6 flex flex-col items-center text-center"
            >
              <img
                src={man?.photo || "/default-avatar.png"}
                alt={man?.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{man.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Parcels Delivered:{" "}
                <span className="font-bold">{man?.totalDeliver}</span>
              </p>
              <div className="flex items-center my-2 justify-center">
                {Array?.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`mr-1 ${
                      index < man?.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  {man?.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMen;
