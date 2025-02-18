import { FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import myImage from "../assets/banner.jpg"

const AboutSection = () => {
  return (
    <motion.div
      className="bg-base-200"
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="py-12 lg:px-20 container md:px-10 rounded-lg shadow-lg mx-auto flex flex-col md:flex-row gap-10 items-center justify-between">
      {/* Left Side Content */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-4">About Us</h2>
        <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
          <FaBoxOpen className="text-primary text-4xl" />
          <h3 className="text-2xl md:text-3xl font-bold text-primary">Our Mission</h3>
        </div>
        <p className="text-sm md:text-lg text-gray-600 px-4 md:px-0">
          Welcome to Parcel Management! We simplify logistics by providing a seamless experience for parcel tracking and management. Our platform ensures efficiency, security, and real-time updates to keep your deliveries on track.
        </p>
        <motion.button
          className="btn btn-primary mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Learn More
        </motion.button>
      </div>
      
      {/* Right Side Image */}
      <div className="w-full flex-end md:w-1/2 flex justify-center">
        <img src={myImage} alt="About Us" className="rounded-lg shadow-lg w-60 md:w-full h-60 md:h-96" />
      </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;