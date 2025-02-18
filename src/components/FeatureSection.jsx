import { FaShieldAlt, FaRocket, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    title: "Parcel Safety",
    description: "We ensure your parcel reaches its destination securely and without damage."
  },
  {
    icon: <FaRocket className="text-4xl text-primary" />,
    title: "Super Fast Delivery",
    description: "Experience the fastest delivery service with our dedicated team."
  },
  {
    icon: <FaHandsHelping className="text-4xl text-primary" />,
    title: "Reliable Support",
    description: "Our support team is always ready to assist you with any queries."
  }
];

const FeatureSection = () => {
  return (
    <section className="bg-base-200 py-12 lg:px-20 md:px-10">
      <div className="container mx-auto text-center">
        {/* Title Animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-neutral mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Features
        </motion.h2>
        <motion.p
          className="text-sm md:text-lg text-center font-normal lg:mb-3 mb-1 lg:w-3/5 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Why choose our parcel delivery service?
        </motion.p>

        {/* Cards with Animated Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card bg-base-100 shadow-lg rounded-lg px-6 py-12 transition-all"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {/* Icon Animation */}
              <motion.div
                className="mb-4 flex justify-center"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

              {/* Description Animation */}
              <motion.p
                className="text-neutral text-sm"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
