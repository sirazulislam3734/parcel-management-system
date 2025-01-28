import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFilter,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link} from "react-router-dom";
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


  // Fetch all parcels booked by the logged-in user
  const { data: parcelsData = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookAParcel/${user?.email}`);
      setParcels(res.data);
      return res.data;
    },
  });

  // Handle Cancel Parcel
  const handleCancel = async (parcelId) => {
    const res = await axiosPublic.put(`/cancelParcel/${parcelId}`);
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

  
    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target;
        const rating = form.rating.value; 
        const feedback = form.feedback.value; 
        const review = {feedback : feedback, rating : parseInt(rating) ,clientName: user?.displayName, clientPhoto: user?.photoURL, id: parcels.deliveryMenId }
        axiosPublic.post('/reviewPost', review)
        .then(res => {
            console.log(res.data);
            if(res.data?.insertedId){
                refetch()
                e.target.reset()
                Swal.fire({
                    title: "Good job!",
                    text: "Review Send successfully!",
                    icon: "success",
                  });
                  e.target.reset()
            }
        })
    }

  // Filter parcels by status
  const filteredParcels =
    filterStatus === "all"
      ? parcels
      : parcels.filter((parcel) => parcel.status === filterStatus);

  return (
    <div className="max-w-6xl lg:min-h-screen mx-auto p-5">
      <h2 className="lg:text-5xl md:text-3xl text-xl font-bold text-center ">
        My Parcels
      </h2>
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
                <td className="font-bold">{parcel.deliveryDate}</td>
                <td className="font-bold">
                  {parcel.approximateDeliveryDate || "Not Assigned"}
                </td>
                <td className="font-bold">{parcel.bookingDate}</td>
                <td className="font-bold">
                  {parcel.deliveryMenId || "Not Assigned"}
                </td>
                <td>
                  <span
                    className={`badge text-nowrap w-full h-full ${
                      parcel.status === "pending"
                        ? "bg-yellow-100 border border-yellow-300 rounded-full p-1"
                        : parcel.status === "on the way"
                        ? "bg-slate-300 border border-black rounded-full p-1"
                        : parcel.status === "Delivered"
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
                      className={`btn btn-sm btn-primary ${
                        parcel.status === "canceled" ? "cursor-not-allowed" : ""
                      } flex items-center gap-1`}
                      disabled={parcel.status !== "pending"}
                    >
                      <AiOutlineEdit /> Update
                    </button>
                  </Link>

                  {/* Cancel Button */}
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleCancel(parcel._id)}
                    disabled={parcel.status !== "pending"}
                  >
                    <AiOutlineDelete /> Cancel
                  </button>

                  {/* Review Button */}
                  {parcel.status === "Delivered" && (
                    <button
                      className="btn btn-sm btn-accent flex items-center gap-1"
                      onClick={() =>
                      {
                        document.getElementById("my_modal_2").showModal()

                      }
                      }
                    >
                      <BiCommentDetail /> Review
                    </button>
                  )}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <dialog id="my_modal_2" className="modal">
                  <div className="modal-box mx-auto">
                     <h2 className="text-center lg:text-3xl md:text-2xl text-xl font-bold">Review Now</h2>
                    <form 
                    onSubmit={() =>  handleSubmit(parcel)} 
                    className="flex flex-col gap-5">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Rating Now?
                        </legend>
                        <input
                          type="number"
                          className="input w-full"
                          placeholder="Type here"
                          name="rating"
                        />
                        
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Feedback</legend>
                        <textarea
                          className="textarea w-full h-24"
                          placeholder="Bio"
                          name="feedback"
                        ></textarea>
                        
                      </fieldset>
                      <button className="text-center btn btn-primary">Submit</button>
                    </form>
                    </div>
                  </dialog>

                  {/* Pay Button */}
                  <Link to={`/dashboard/paymentCreate/${parcel._id}`}>
                  <button
                    className="btn btn-sm btn-success flex items-center gap-1"
                  >
                    <MdPayment /> Pay
                  </button>
                  </Link>
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
