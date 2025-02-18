
import { FaShieldAlt, FaRocket, FaHandsHelping } from "react-icons/fa";

const FeatureSection = () => {
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

  return (
    <section className="bg-base-200 py-12 lg:px-20 md:px-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
          Our Features
        </h2>
        <p className="text-sm md:text-lg text-center font-normal lg:mb-3 mb-1 lg:w-3/5 mx-auto">Why choose our parcel delivery service?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg rounded-lg px-6 py-12 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
