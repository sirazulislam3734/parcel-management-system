import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // For showing star rating
import axios from "axios";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  

  // Dummy logged-in delivery man ID (replace with real authentication context ID)
  const deliveryManId = "123456789";

  // Fetch reviews for the logged-in delivery man
  useEffect(() => {
    axios
      .get(`/api/reviews?deliveryManId=${deliveryManId}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [deliveryManId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">আমার পর্যালোচনা</h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">কোনো পর্যালোচনা পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-white shadow-lg rounded-lg p-4">
              {/* Reviewer Info */}
              <div className="flex items-center mb-4">
                <img
                  src={review.reviewerImage || "https://via.placeholder.com/50"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`mr-1 ${
                      index < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">{review.rating}/5</span>
              </div>

              {/* Feedback */}
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
