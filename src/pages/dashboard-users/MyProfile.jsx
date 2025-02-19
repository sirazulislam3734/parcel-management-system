import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        className="max-w-3xl w-full"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Helmet>
          <title>My Profile</title>
        </Helmet>
        <h1 className="text-3xl font-semibold mb-6 text-center">My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center">
              {/* Profile Picture with Animation */}
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden mb-4"
                variants={imageVariants}
              >
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* User Name and Email */}
              <input
                type="text"
                className="text-xl border-none text-center font-medium"
                value={user?.displayName}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">This Name is required</span>
              )}
              <input
                type="email"
                className="text-xl border-none text-center font-medium"
                value={user?.email}
                {...register("email", { required: true })}
              />
            </div>

            {/* About Me Section with Animation */}
            <motion.div className="mt-6" variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-gray-700">
                Passionate software developer with 5 years of experience in web
                technologies. I love creating user-friendly applications and
                solving complex problems.
              </p>
            </motion.div>

            {/* Skills Section with Animation */}
            <motion.div className="mt-6" variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  JavaScript
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  React
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  Node.js
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  Python
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  SQL
                </span>
              </div>
            </motion.div>

            {/* Contact Information Section with Animation */}
            <motion.div className="mt-6" variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaEnvelope className="text-indigo-600 mr-2" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-indigo-600 mr-2" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-indigo-600 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Image Upload Section with Animation */}
            <motion.div className="mt-6" variants={sectionVariants}>
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
            </motion.div>

            {/* Update Button with Animation */}
            <motion.div className="mt-6" variants={sectionVariants}>
              <Link to={`/dashboard/updateProfile`}>
                <button className="btn btn-primary w-full flex items-center justify-center">
                  <FaEdit className="mr-2" />
                  Update Profile
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default MyProfile;