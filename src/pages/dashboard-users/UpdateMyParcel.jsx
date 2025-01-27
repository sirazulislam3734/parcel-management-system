/* eslint-disable react/no-unescaped-entities */
import { AiOutlineEdit } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateMyParcel = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const { data: updateData } = useQuery({
    queryKey: ["parcels", params.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookAParcelGet/${params.id}`);
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const updatedData = { ...data, price: price };
   const res = await axiosPublic.patch(`/updateAParcel/${updateData._id}`, updatedData)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            reset();
            Swal.fire({
                title: "Good job!",
                text: "Parcel updated successfully!",
                icon: "success",
            });
            navigate("/dashboard/myParcel");
        } else {
            Swal.fire({
                title: "ERROR!",
                text: "Failed to update parcel.",
                icon: "error",
            });
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
        heading="Update A Parcel"
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
              {...register("name", { required: true })}
            />
          </div>

          {/* Email */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100"
              value={user?.email}
              {...register("email", { required: true })}
            />
          </div>

          {/* Phone Number */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Phone Number</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              defaultValue={updateData?.phone}
              {...register("phone", { required: true })}
            />
          </div>

          {/* Parcel Type */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Parcel Type</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={updateData?.parcelType}
              {...register("parcelType", { required: true })}
            />
          </div>

          {/* Parcel Weight */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Parcel Weight (kg)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              defaultValue={updateData?.parcelWeight}
              {...register("parcelWeight", {
                required: true,
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
              defaultValue={updateData?.receiverName}
              {...register("receiverName", { required: true })}
            />
          </div>

          {/* Receiver’s Phone */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Receiver's Phone</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              defaultValue={updateData?.receiverPhone}
              {...register("receiverPhone", { required: true })}
            />
          </div>

          {/* Parcel Delivery Address */}
          <div className="form-control col-span-2">
            <label className="label font-medium">Parcel Delivery Address</label>
            <input
              type="text"
              className="input input-bordered w-full"
              defaultValue={updateData?.deliveryAddress}
              {...register("deliveryAddress", { required: true })}
            />
          </div>

          {/* Requested Delivery Date */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Requested Delivery Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              defaultValue={updateData?.deliveryDate}
              {...register("deliveryDate", { required: true })}
            />
          </div>

          {/* Latitude */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Delivery Latitude</label>
            <input
              type="number"
              step="any"
              className="input input-bordered w-full"
              defaultValue={updateData?.latitude}
              {...register("latitude", { required: true })}
            />
          </div>

          {/* Longitude */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Delivery Longitude</label>
            <input
              type="number"
              step="any"
              className="input input-bordered w-full"
              defaultValue={updateData?.longitude}
              {...register("longitude", { required: true })}
            />
          </div>

          {/* Price */}
          <div className="form-control col-span-1">
            <label className="label font-medium">Price</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={price}
              {...register("price")}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center gap-2 justify-center"
            >
              <AiOutlineEdit /> Update Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMyParcel;
