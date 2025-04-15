import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Contacts = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-400">We’re happy to answer your questions and assist you anytime.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-300">support@dronehub.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p className="text-gray-300">+39 0123 456 789</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-gray-300">
              DroneHub HQ<br />
              Via dei Fori Imperiali 46<br />
              00184 Roma, Italia
            </p>
          </div>
        </div>

        <form className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
          />
          <textarea
            rows="5"
            placeholder="Your message"
            className="w-full bg-gray-800 px-4 py-2 rounded-md text-white placeholder-gray-400"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="text-center mt-20 text-sm text-gray-500">
        <p className="mb-4">You can also reach us via Instagram or LinkedIn.</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/daniele.guicciardi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition duration-300"
          >
            <FaInstagram className="text-2xl " />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.linkedin.com/in/daniele-guicciardi-ferrusi-b29432331/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition duration-300"
          >
            <FaLinkedin className="text-2xl" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
