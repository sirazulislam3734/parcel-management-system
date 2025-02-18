
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-4 mt-2">
      <a href="https://github.com/sirazulislam3734" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-700 hover:text-black">
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/sirazul-islam-1a4893318/" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800">
        <FaLinkedin />
      </a>
      <a href="https://x.com/SirazulIsl48" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-400 hover:text-blue-600">
        <FaTwitter />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100069182026840" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-700 hover:text-blue-900">
        <FaFacebook />
      </a>
    </div>
  );
};

export default SocialLinks;
