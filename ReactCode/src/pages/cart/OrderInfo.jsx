import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

const OrderInfo = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: user?.email || "",
    cardNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.email || !form.cardNumber) {
      return alert("Please fill in all fields.");
    }

    navigate("/checkout", { state: { guestEmail: form.email } });
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center">Order Summary</h1>

        <form onSubmit={handleOrder} className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />

          <div className="text-right text-lg font-semibold">
            Total: <span className="text-blue-400">{total.toFixed(2)} €</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderInfo;
