/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookAParcel = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    
    const bookingData = { ...data, status: "pending", price: price, bookingDate: new Date().toLocaleDateString(),  };
    try {
      const res = await axiosPublic.post("/bookAParcel", bookingData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Good job!",
          text: "Parcel booked successfully!",
          icon: "success",
        });
        navigate("/dashboard/myParcel");
      } else {
        Swal.fire({
          title: "ERROR!",
          text: "Failed to book parcel.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error occurred while booking the parcel.", error);
    }
  };

  const parcelWeight = watch("parcelWeight");
  useEffect(() => {
    if (parcelWeight <= 1) {
      setPrice(50);
    } else if (parcelWeight === 2) {
      setPrice(100);
    } else if (parcelWeight > 2) {
      setPrice(150);
    }
  }, [parcelWeight]);

  return (
    <div>
      <SectionTitle
        subTitle="---How many??---"
        heading="Book A Parcel"
      ></SectionTitle>
      <div className="max-w-4xl mx-auto mt-10 md:p-5 p-3 border rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 md:gap-4 gap-2"
        >
          {/* Name */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={user?.displayName}
              readOnly
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100"
              value={user?.email}
              readOnly
              {...register("email")}
            />
          </div>

          {/* Phone Number */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Phone Number</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Parcel Type */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Parcel Type</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("parcelType", {
                required: "Parcel type is required",
              })}
            />
            {errors.parcelType && (
              <p className="text-red-500 text-sm">
                {errors.parcelType.message}
              </p>
            )}
          </div>

          {/* Parcel Weight */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Parcel Weight (kg)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("parcelWeight", {
                required: "Parcel weight is required",
                valueAsNumber: true,
                min: { value: 1, message: "Weight must be at least 1 kg" },
              })}
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-sm">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>

          {/* Receiver’s Name */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Receiver’s Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("receiverName", {
                required: "Receiver's name is required",
              })}
            />
            {errors.receiverName && (
              <p className="text-red-500 text-sm">
                {errors.receiverName.message}
              </p>
            )}
          </div>

          {/* Receiver’s Phone */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Receiver's Phone</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              {...register("receiverPhone", {
                required: "Receiver's phone number is required",
              })}
            />
            {errors.receiverPhone && (
              <p className="text-red-500 text-sm">
                {errors.receiverPhone.message}
              </p>
            )}
          </div>

          {/* Parcel Delivery Address */}
          <div className="form-control col-span-2">
            <label className="label font-medium">Parcel Delivery Address</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("deliveryAddress", {
                required: "Delivery address is required",
              })}
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-sm">
                {errors.deliveryAddress.message}
              </p>
            )}
          </div>

          {/* Requested Delivery Date */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Requested Delivery Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("deliveryDate", {
                required: "Delivery date is required",
              })}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm">
                {errors.deliveryDate.message}
              </p>
            )}
          </div>

          {/* Latitude */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Delivery Latitude</label>
            <input
              type="number"
              step="any"
              className="input input-bordered w-full"
              {...register("latitude", { required: "Latitude is required" })}
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm">{errors.latitude.message}</p>
            )}
          </div>

          {/* Longitude */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Delivery Longitude</label>
            <input
              type="number"
              step="any"
              className="input input-bordered w-full"
              {...register("longitude", { required: "Longitude is required" })}
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm">{errors.longitude.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Price</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={`${price} Tk`}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center gap-2 justify-center"
            >
              <AiOutlineSend /> Book Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAParcel;
