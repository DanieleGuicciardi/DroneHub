import { FaTruck, FaCreditCard, FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center">
          <FaTruck className="text-3xl mb-2 text-blue-500" />
          <h3 className="font-semibold text-lg">Fast & Safe Delivery</h3>
          <p className="text-gray-400 text-sm mt-1">Your drone shipped in 24/48h</p>
        </div>

        <div className="flex flex-col items-center">
          <FaCreditCard className="text-3xl mb-2 text-blue-500" />
          <h3 className="font-semibold text-lg">We Accept All Payments</h3>
          <p className="text-gray-400 text-sm mt-1">Visa, Mastercard, PayPal and more</p>
        </div>

        <div className="flex flex-col items-center">
          <FaEnvelope className="text-3xl mb-2 text-blue-500" />
          <h3 className="font-semibold text-lg">Need Info?</h3>
          <p className="text-gray-400 text-sm mt-1">Contact us for support and questions</p>
        </div>
      </div>

      <div className="my-10 border-t border-gray-700"></div> {/* br */}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          <Link to="/help&support" className="hover:text-white transition">Help & Support</Link>
          <Link to="/contacts" className="hover:text-white transition">Contacts</Link>
          <Link to="/aboutus" className="hover:text-white transition">About Us</Link>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
          <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-red-500 transition"><FaYoutube /></a>
        </div>

        <div className="text-center md:text-right">
          © DroneHub {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
