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

    // Qui in futuro puoi fare una chiamata API
    console.log("Custom build request:", form);
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-900 rounded-xl p-8 shadow-lg"
      >
        {submitted ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-400">Request Sent!</h2>
            <p className="text-gray-300">
              We'll contact you soon with more details. Stay ready to fly. 🚀
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Request a Custom FPV Build
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="flightType"
                  value={form.flightType}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-800 text-white"
                >
                  <option value="">Select Flight Type</option>
                  <option value="Freestyle">Freestyle</option>
                  <option value="Cinematic">Cinematic</option>
                  <option value="Long Range">Long Range</option>
                  <option value="Racing">Racing</option>
                  <option value="Beginner">Beginner Setup</option>
                </select>

                <input
                  type="text"
                  name="budget"
                  placeholder="Budget (e.g. 300€ - 800€)"
                  value={form.budget}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
                />
              </div>

              <textarea
                name="notes"
                rows="4"
                placeholder="Extra notes or requests"
                value={form.notes}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
              />

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
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
