import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";


const UpdateProfile = () => {
    const {user} = useAuth()
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = async (data) => {
        console.log(data);
      }
    return (
        <div>
            <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src=''
                alt="Profile"
                defaultValue={user?.photoURL}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Name and Email */}
            <input
              type="text"
              className="text-xl border-none text-center font-medium"
              defaultValue={user?.displayName}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This Name is required</span>
            )}
            <input
              type="email"
              className="text-xl border-none text-center font-medium"
              defaultValue={user?.email}
              {...register("email", { required: true })}
            />
          </div>

          {/* Image Upload Section */}
          <div className="mt-6">
            <label className="label text-sm font-medium text-gray-700">
              Upload Profile Picture
            </label>
            <input
              className="file-input file-input-bordered file-input-primary w-full mt-2"
              type="file"
              id="file"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">This Image is required</span>
            )}
          </div>

          {/* Update Button */}
          <button
            className="btn btn-primary mt-6 w-full"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default UpdateProfile;