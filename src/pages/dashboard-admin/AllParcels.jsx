import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const {data : allParcel = [], refetch } = useQuery({
        queryKey: ["parcels"],
        queryFn: async () => {
          const response = await axiosSecure.get("/bookAParcel");
          return response.data;
        },
  })

      const {data : allDeliveryMan = []} = useQuery({
        queryKey: ["deliveryMen"],
        queryFn: async () => {
          const res = await axiosSecure.get("/allDeliveryMan");
          return res.data;
        },
      })

   

  const handleAssignDelivery = async () => {
    try {
      const { id, deliveryMenId, approximateDeliveryDate } = selectedParcel;
      await axiosSecure.patch(`/updateParcel/${id}`, {
        Id: id,
        deliveryMenId,
        approximateDeliveryDate,
        status: "On The Way",
      });
      refetch(); // Refresh parcels
      Swal.fire({
                title: "Good job!",
                text: "Parcel assigned successfully!",
                icon: "success",
              });
      setSelectedParcel(null); // Close modal
    } catch (error) {
      console.error("Error assigning delivery:", error);
    }
  };

  const handleDateSearch = async () => {
    try {
      const response = await axiosSecure.get(`/bookAParcel?from=${dateRange.from}&to=${dateRange.to}`);
      setParcels(response.data);
    } catch (error) {
      console.error("Error fetching parcels by date:",parcels, error);
    }
  };
  return (
    <div className="max-w-7xl lg:min-h-screen mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-center">All Parcels</h2>

      {/* Date Range Filter */}
      <div className="flex md:flex-row flex-col items-center gap-3 mb-5">
        <input
          type="date"
          className="input input-bordered"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <input
          type="date"
          className="input input-bordered"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
        <button onClick={handleDateSearch} className="btn btn-primary flex items-center gap-2">
          <AiOutlineSearch /> Search
        </button>
      </div>

      {/* Parcels Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th>User Name</th>
              <th>User Phone</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {allParcel.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.name}</td>
                <td>{parcel.phone}</td>
                <td>{new Date(parcel.bookingDate).toLocaleDateString()}</td>
                <td>{new Date(parcel.deliveryDate).toLocaleDateString()}</td>
                <td>{parcel.price} Tk</td>
                <td>
                  <span className={`badge ${parcel.status === "pending"?'bg-yellow-100 border border-yellow-500 rounded-full p-3':"badge-ghost"} ${parcel.status === "On The Way" ? "bg-slate-200 md:text-nowrap border border-black rounded-full p-3" : "badge-ghost"}`}>
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      setSelectedParcel({ id: parcel._id, deliveryMenId: "", approximateDeliveryDate: "" })
                    }
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Assign Delivery</h3>
            <div className="form-control">
              <label className="label lg:mr-3">Select Delivery Man</label>
              <select
                className="select select-bordered"
                onChange={(e) =>
                  setSelectedParcel({ ...selectedParcel, deliveryMenId: e.target.value })
                }
              >
                <option value="">Choose</option>
                {allDeliveryMan.map((man) => (
                  <option key={man._id} value={man._id}>
                    {man.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-3">
              <label className="label">Approximate Delivery Date</label>
              <input
                type="date"
                className="input input-bordered"
                onChange={(e) =>
                  setSelectedParcel({ ...selectedParcel, approximateDeliveryDate: e.target.value })
                }
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" 
              onClick={() => handleAssignDelivery()}>
                Assign
              </button>
              <button className="btn" 
              onClick={() => setSelectedParcel(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
