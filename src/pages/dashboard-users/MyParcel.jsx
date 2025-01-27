import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFilter,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import noData from "../../assets/noData.json";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [parcels, setParcels] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  // Fetch all parcels booked by the logged-in user
  const { data: parcelsData = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookAParcel/${user?.email}`);
      setParcels(res.data);
      return res.data;
    },
  });
  console.log(parcelsData);

  // Handle Cancel Parcel
  const handleCancel = async (parcelId) => {
    const res = await axiosPublic.put(`/cancelParcel/${parcelId}`)
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
                  title: "Good job!",
                  text: "Booking Parcel Canceled successfully!",
                  icon: "success",
                });
    }
  };

  // Filter parcels by status
  const filteredParcels =
    filterStatus === "all"
      ? parcels
      : parcels.filter((parcel) => parcel.status === filterStatus);

  return (
    <div className="max-w-6xl lg:min-h-screen mx-auto p-5">
     <h2 className="lg:text-5xl md:text-3xl text-xl font-bold text-center ">My Parcels</h2>
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-secondary btn-sm gap-2">
            <AiOutlineFilter />
            Filter by Status
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={() => setFilterStatus("all")}>All</button>
            </li>
            <li>
              <button onClick={() => setFilterStatus("pending")}>
                Pending
              </button>
            </li>
            <li>
              <button onClick={() => setFilterStatus("on the way")}>
                On the Way
              </button>
            </li>
            <li>
              <button onClick={() => setFilterStatus("delivered")}>
                Delivered
              </button>
            </li>
            <li>
              <button onClick={() => setFilterStatus("returned")}>
                Returned
              </button>
            </li>
            <li>
              <button onClick={() => setFilterStatus("canceled")}>
                Canceled
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-slate-800 text-white rounded-lg">
            <tr>
              <th>Parcel Type</th>
              <th>Requested Date</th>
              <th>Approx. Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Men ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcelsData.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-bold">{parcel.parcelType}</td>
                <td className="font-bold" >{parcel.deliveryDate}</td>
                <td className="font-bold">{parcel.approximateDeliveryDate || "Not Assigned"}</td>
                <td className="font-bold">{parcel.bookingDate}</td>
                <td className="font-bold">{parcel.deliveryMenId || "Not Assigned"}</td>
                <td>
                  <span
                    className={`badge text-nowrap w-full h-full ${
                      parcel.status === "pending"
                        ? "bg-yellow-100 border border-yellow-300 rounded-full p-1"
                        : parcel.status === "on the way"
                        ? "bg-slate-300 border border-black rounded-full p-1"
                        : parcel.status === "delivered"
                        ? "bg-green-100 border border-green-500 rounded-full p-1"
                        : parcel.status === "canceled"
                        ? "bg-red-100 border border-red-500 rounded-full p-1"
                        : "badge-neutral"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="flex flex-col gap-1">
                  {/* Update Button */}
                  <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                  <button
                    className={`btn btn-sm btn-primary ${parcel.status === "canceled"?"cursor-not-allowed":''} flex items-center gap-1`}
                    disabled={parcel.status !== "pending"}
                  >
                    <AiOutlineEdit /> Update
                  </button></Link>

                  {/* Cancel Button */}
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleCancel(parcel._id)}
                    disabled={parcel.status !== "pending"}
                  >
                    <AiOutlineDelete /> Cancel
                  </button>

                  {/* Review Button */}
                  {parcel.status === "delivered" && (
                    <button
                      className="btn btn-sm btn-accent flex items-center gap-1"
                      onClick={() => navigate(`/review-parcel/${parcel._id}`)}
                    >
                      <BiCommentDetail /> Review
                    </button>
                  )}

                  {/* Pay Button */}
                  <button
                    className="btn btn-sm btn-success flex items-center gap-1"
                    onClick={() => navigate(`/pay-parcel/${parcel._id}`)}
                  >
                    <MdPayment /> Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Parcels Found */}
      {filteredParcels.length === 0 && <Lottie animationData={noData}></Lottie>}
    </div>
  );
};

export default MyParcel;
