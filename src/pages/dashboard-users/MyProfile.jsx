import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // React Icon

import axios from "axios"; // API কল করতে // Toast notification

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy user ID (Replace with actual user ID from authentication context)
  const userId = "123456789";

  // Fetch user data
  useEffect(() => {
    axios
      .get(`/api/users/${userId}`) // Backend থেকে ইউজারের ডেটা আনবে
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateProfile = async () => {
    if (!image) {
      console.log("Please select an image to upload!");
      return;
    }
    setLoading(true);

    // Upload image to Firebase Storage
    // const storageRef = ref(storage, `profilePictures/${userId}/${image.name}`);
    // uploadBytes(storageRef, image)
    //   .then((snapshot) => getDownloadURL(snapshot.ref))
    //   .then((downloadURL) => {
    //     // Update user profile in MongoDB
    //     const updatedUser = { ...user, profilePicture: downloadURL };
    //     return axios.put(`/api/users/${userId}`, updatedUser);
    //   })
    //   .then(() => {
    //     console.log("Profile updated successfully!");
    //     setLoading(false);
    //     setImage(null);
    //   })
    //   .catch((error) => {
    //     console.error("Error updating profile:", error);
    //     console.log("Failed to update profile!");
    //     setLoading(false);
    //   });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Profile</h1>
      <div className="bg-white shadow-xl rounded-lg p-6">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-full h-full" />
            )}
          </div>

          {/* User Name and Email */}
          <h2 className="text-xl font-medium">{user.name || "User Name"}</h2>
          <p className="text-gray-600">{user.email || "user@example.com"}</p>
        </div>

        {/* Image Upload Section */}
        <div className="mt-6">
          <label className="label text-sm font-medium text-gray-700">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered file-input-primary w-full mt-2"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="btn btn-primary mt-6 w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
