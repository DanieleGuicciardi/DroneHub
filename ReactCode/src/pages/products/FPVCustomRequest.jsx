import { useState } from "react";
import { motion } from "framer-motion";

const FpvCustomRequest = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    flightType: "",
    budget: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.flightType || !form.budget) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitted(true);

    // add EmailJS ???
    console.log("Custom build request:", form);
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 py-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        {submitted ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-blue-400">Request Sent!</h2>
            <p className="text-gray-300">Check your email to book a meeting. Stay ready to fly. 🚀</p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-12 text-center">Custom FPV Build Request</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-gray-400">Full Name*</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-gray-400">Email Address*</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="flightType" className="text-sm text-gray-400">Flight Type*</label>
                  <select
                    id="flightType"
                    name="flightType"
                    value={form.flightType}
                    onChange={handleChange}
                    className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Freestyle">Freestyle</option>
                    <option value="Cinematic">Cinematic</option>
                    <option value="Long Range">Long Range</option>
                    <option value="Racing">Racing</option>
                    <option value="Beginner">Beginner Setup</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm text-gray-400">Budget (e.g. 300€ - 800€)*</label>
                  <input
                    id="budget"
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-sm text-gray-400">Extra Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="5"
                  value={form.notes}
                  onChange={handleChange}
                  className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Optional"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition text-white"
              >
                Send Request
              </button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default FpvCustomRequest;
