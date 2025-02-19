import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from "react-confetti";

const NewsletterSection = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="p-4 lg:px-20 bg-base-200 md:px-10 md:py-10">
      {/* Confetti Animation */}
      {subscribed && <Confetti numberOfPieces={150} gravity={0.2} />}

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Stay Updated with Our Newsletter
        </motion.h2>
        <motion.p
          className="text-lg font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          Subscribe to receive the latest updates, offers, and parcel tracking news directly in your inbox.
        </motion.p>

        {/* Input Field & Button with Animation */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="w-full md:w-2/3"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:text-lg text-sm lg:pl-6 p-4 rounded-lg shadow-lg text-gray-900 focus:ring-4 focus:ring-purple-500 focus:outline-none transition"
            />
          </motion.div>

          <motion.button
            className="px-6 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSubscribe}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
