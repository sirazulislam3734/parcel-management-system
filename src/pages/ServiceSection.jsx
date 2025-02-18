import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaRocket } from 'react-icons/fa';

const ServiceSection = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section id='service' className="bg-base-200 py-12 lg:px-20 md:px-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="card-body items-center text-center">
              <FaCode className="text-6xl text-primary mb-4" />
              <h3 className="text-2xl font-bold">Web Development</h3>
              <p className="text-gray-600">We build modern and responsive websites tailored to your needs.</p>
            </div>
          </motion.div>

          {/* Repeat for other cards */}
          {/* Service Card 2 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="card-body items-center text-center">
              <FaPalette className="text-6xl text-primary mb-4" />
              <h3 className="text-2xl font-bold">UI/UX Design</h3>
              <p className="text-gray-600">We create beautiful and user-friendly designs for your applications.</p>
            </div>
          </motion.div>

          {/* Service Card 3 */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
            className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="card-body items-center text-center">
              <FaRocket className="text-6xl text-primary mb-4" />
              <h3 className="text-2xl font-bold">SEO Optimization</h3>
              <p className="text-gray-600">We help you rank higher on search engines and grow your business.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ServiceSection;