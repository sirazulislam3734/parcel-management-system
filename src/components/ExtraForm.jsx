import { FaUser, FaUniversity, FaBriefcase } from "react-icons/fa";


const ExtraForm = () => {
    return (
        <div>
            <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Lawyer Registration Form</h2>
      <div className="bg-base-100 shadow-xl rounded-lg p-6">
        
        {/* Personal Details */}
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <FaUser /> Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="Full Name" className="input input-bordered w-full" defaultValue="John Doe" />
          <input type="date" className="input input-bordered w-full" defaultValue="1990-05-15" />
          <input type="email" placeholder="Email" className="input input-bordered w-full" defaultValue="johndoe@example.com" />
          <input type="tel" placeholder="Phone" className="input input-bordered w-full" defaultValue="+1 234 567 890" />
          <input type="text" placeholder="Street" className="input input-bordered w-full" defaultValue="123 Main Street" />
          <input type="text" placeholder="City" className="input input-bordered w-full" defaultValue="New York" />
          <input type="text" placeholder="State" className="input input-bordered w-full" defaultValue="NY" />
          <input type="text" placeholder="ZIP" className="input input-bordered w-full" defaultValue="10001" />
        </div>
        
        {/* Education Details */}
        <h3 className="text-2xl font-semibold flex items-center gap-2 mt-6">
          <FaUniversity /> Education Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="Law School" className="input input-bordered w-full" defaultValue="Harvard Law School" />
          <input type="text" placeholder="Degree" className="input input-bordered w-full" defaultValue="Juris Doctor (JD)" />
          <input type="number" placeholder="Graduation Year" className="input input-bordered w-full" defaultValue="2015" />
          <input type="text" placeholder="Bar Council" className="input input-bordered w-full" defaultValue="New York State Bar Association" />
          <input type="text" placeholder="Bar Registration Number" className="input input-bordered w-full" defaultValue="NY123456" />
          <input type="number" placeholder="Exam Passed Year" className="input input-bordered w-full" defaultValue="2016" />
        </div>
        
        {/* Professional Details */}
        <h3 className="text-2xl font-semibold flex items-center gap-2 mt-6">
          <FaBriefcase /> Professional Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="Law Firm" className="input input-bordered w-full" defaultValue="Doe & Associates" />
          <input type="text" placeholder="Practice Area" className="input input-bordered w-full" defaultValue="Corporate Law" />
          <input type="number" placeholder="Years of Experience" className="input input-bordered w-full" defaultValue="8" />
          <input type="text" placeholder="License Status" className="input input-bordered w-full" defaultValue="Active" />
        </div>
        
        {/* Declaration */}
        <h3 className="text-2xl font-semibold flex items-center gap-2 mt-6">Declaration</h3>
        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
          <label>I agree to the terms and conditions</label>
        </div>
        <div className="text-center mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default ExtraForm;