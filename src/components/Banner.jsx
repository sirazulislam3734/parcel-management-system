import BannerImg from "../assets/banner2.jpg";

const Banner = () => {
  return (
    <div className="">
      <section
        className="bg-cover mx-auto bg-center h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${BannerImg})` }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Parcel Manager
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Book, Deliver, and Track Your Parcels Seamlessly
          </p>
          <div className="flex justify-center items-center max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for a service..."
              className="input input-bordered w-full rounded-l-lg"
            />
            <button className="btn btn-primary rounded-r-lg">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
