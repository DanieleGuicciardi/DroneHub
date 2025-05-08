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
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    city: "",
    province: "",
    zip: "",
    phone: "",
    email: user?.email || "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState({});

  const months = [...Array(12)].map((_, i) => String(i + 1).padStart(2, "0"));
  const years = [...Array(20)].map((_, i) => String(new Date().getFullYear() + i).slice(-2));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //create a separate compontent for validate
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.address.trim()) errs.address = "Address is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.state.trim()) errs.state = "State is required.";
    if (!form.province.trim()) errs.province = "Province is required.";
    if (!form.zip.trim()) errs.zip = "ZIP code is required.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address.";
    if (!/^\d{16}$/.test(form.cardNumber)) errs.cardNumber = "Card number must be 16 digits.";
    if (!form.expiryMonth) errs.expiryMonth = "Expiry month is required.";
    if (!form.expiryYear) errs.expiryYear = "Expiry year is required.";
    if (!/^\d{3}$/.test(form.cvv)) errs.cvv = "CVV must be 3 digits.";
    if (!form.cardName.trim()) errs.cardName = "Cardholder name is required.";
    return errs;
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    navigate("/checkout", { state: { guestEmail: form.email } });
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* left part*/}
        <form className="space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div className="col-span-2">
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div>
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <input name="province" placeholder="Province" value={form.province} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
              </div>
              <div>
                <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
              </div>
              <div>
                <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="col-span-2">
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div>
                <input name="cardNumber" placeholder="Card Number (16 digits)" value={form.cardNumber} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <select name="expiryMonth" value={form.expiryMonth} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full">
                    <option value="">MM</option>
                    {months.map((m) => (<option key={m} value={m}>{m}</option>))}
                  </select>
                  {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>}
                </div>
                <div className="w-1/2">
                  <select name="expiryYear" value={form.expiryYear} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full">
                    <option value="">YY</option>
                    {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                  </select>
                  {errors.expiryYear && <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>}
                </div>
              </div>
              <div>
                <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
              <div>
                <input name="cardName" placeholder="Cardholder Name" value={form.cardName} onChange={handleChange} className="bg-gray-800 p-3 rounded-lg w-full" />
                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
              </div>
            </div>
          </div>
        </form>

        {/* right part*/}
        <div className="border-l border-gray-700 pl-10 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm mb-4">
                <span>{item.title} x{item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <hr className="my-6 border-gray-700" />
            <p className="text-lg font-bold text-right mb-4">Total: <span className="text-green-400">{total.toFixed(2)} €</span></p>
          <button
            onClick={handleOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full py-3 rounded-full mt-6"
          >
            Place Order
          </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderInfo;