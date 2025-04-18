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
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.address.trim()) errs.address = "Address required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!/^\d{16}$/.test(form.cardNumber)) errs.cardNumber = "Invalid card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = "Use MM/YY";
    if (!/^\d{3}$/.test(form.cvv)) errs.cvv = "Invalid CVV";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    navigate("/checkout", { state: { guestEmail: form.email } });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center mb-4">🧾 Checkout</h1>

        <form onSubmit={handleOrder} className="space-y-6 bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="Card Number (16 digits)"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 pt-4">
            <p className="text-xl font-semibold">
              Total: <span className="text-green-400">{total.toFixed(2)} €</span>
            </p>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-6 py-3 rounded-full font-bold text-white transition-all shadow-lg"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderInfo;
