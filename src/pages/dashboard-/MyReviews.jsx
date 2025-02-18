
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


const MyReviews = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
  const { data: myReviewData } = useQuery({
    queryKey: ["review", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myReviewList/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl lg:min-h-screen mx-auto p-6">
      <Helmet>
        <title>My Reviews</title>
      </Helmet>
      <h1 className="md:text-3xl lg:text-4xl text-2xl font-semibold text-center mb-6">My Review</h1>
      {myReviewData?.length === 0 ? (
        <p className="text-center text-gray-500"></p>
       ) : ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReviewData?.map((review) => (
            <div 
            key={review?._id} 
            className="card bg-white shadow-lg font-bold text-center rounded-lg p-4">
              Reviewer Info
              <div className="flex items-center my-4 mx-auto mb-4">
                <img
                  src={review?.clientPhoto || "https://via.placeholder.com/50"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium">
                    {review?.clientName}
                    </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.reviewDate)?.toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center mb-2">
                {Array?.from({ length: 5 }, (_, index) => (
                   <FaStar
                    key={index}
                    className={`mr-1 ${
                      index < review?.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  /> 
                ))}
                <span className="text-sm text-gray-500 ml-2">
                    {review?.rating}</span>
              </div>

              {/* Feedback */}
              <h2 className="text-center text-xl my-2">FeedBack</h2>
              <p className="text-gray-700">
                {review?.feedback}
                </p>
            </div>
           ))} 
        </div>
       )} 
    </div>
  );
};

export default MyReviews;
