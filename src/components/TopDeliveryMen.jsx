import { useEffect, useState } from "react";
import axios from "axios";

const TopDeliveryMen = () => {
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopDeliveryMen();
  }, []);

  const fetchTopDeliveryMen = async () => {
    try {
      const response = await axios.get("/api/top-delivery-men");
      setTopDeliveryMen(response.data);
    } catch (error) {
      console.error("Error fetching top delivery men:",topDeliveryMen, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:px-20 bg-base-200 md:px-10 lg:py-10 md:py-5">
      <h2 className="md:text-3xl text-2xl font-bold text-center mb-4 lg:text-4xl">Top Delivery Men</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* {topDeliveryMen.map((man) => ( */}
            <div
            //   key={man._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                // src={man.photo || "/default-avatar.png"}
                // alt={man.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">
                {/* {man.name} */}Name
                </h3>
              <p className="text-sm text-gray-600 mt-2">
                Parcels Delivered: <span className="font-bold">
                    {/* {man.parcelsDelivered} */}
                    </span>
              </p>
              <p className="text-sm text-gray-600">
                Average Rating: <span className="font-bold">
                    {/* {man.averageRating.toFixed(1)} */}
                    </span>
              </p>
            </div>
          {/* ))} */}
        </div>
      )}
    </div>
  );
};

export default TopDeliveryMen;
