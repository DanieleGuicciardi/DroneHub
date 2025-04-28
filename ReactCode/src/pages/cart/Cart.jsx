import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanityClient";
import { FaTrash } from "react-icons/fa";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const isLogged = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [careRefresh, setCareRefresh] = useState(false);

  //price careRefresh
  const careRefreshUnitPrice = 38;

  //total
  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // careRefresh add + discount
  let careRefreshTotal = careRefreshUnitPrice * totalItems;
  const discountUnlocked = totalItems > 3 || cartTotal > 3000;

  if (discountUnlocked) {
    careRefreshTotal *= 0.8; 
  }

  const finalTotal = careRefresh ? cartTotal + careRefreshTotal : cartTotal;

  const handleCheckout = () => {
    if (!isLogged) {
      setShowPopup(true);
    } else {
      navigate("/orderinfo");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 md:px-10 py-16">
      <div className="max-w-7xl mx-auto space-y-12">

        <h1 className="text-5xl font-extrabold text-center ">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center mt-10 space-y-6">
            <p className="text-gray-400 text-lg">
              Your cart is empty. Explore our drones and find the perfect one!
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 text-gray-400 text-sm font-semibold pb-6 border-b border-gray-800 uppercase">
              <div className="col-span-7">Item</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-1 text-center">Total</div>
            </div>

            {/* prod */}
            <div className="space-y-8">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 items-center py-8 border-b border-gray-800 gap-6"
                >
                  <div className="col-span-7 flex items-center gap-4">
                    <img
                      src={item.image?.asset ? urlFor(item.image).width(120).url() : ""}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-lg shadow-lg"
                    />
                    <Link
                      to={`/products/cine/${item.slug?.current}`}
                      className="text-2xl md:text-l ml-10 font-extrabold text-white hover:text-blue-400 transition-all"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <div className="col-span-1 text-sm text-gray-300 text-center">
                    {item.price.toFixed(2)} €
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold transition"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 text-lg font-semibold text-white bg-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 text-sm font-semibold text-center">
                    {(item.price * item.quantity).toFixed(2)} €
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* br */}
            <hr className="border-gray-700 my-10" />

            {/* price sect */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={careRefresh}
                    onChange={() => setCareRefresh(!careRefresh)}
                    className="w-5 h-5 accent-blue-600 mt-1"
                  />
                  <label className="text-gray-300 text-base">
                    Add <Link to="/help&support" className="underline text-blue-500 hover:text-blue-600">Care Refresh</Link> ({careRefreshUnitPrice}€ x item)
                  </label>
                </div>
                {discountUnlocked && careRefresh && (
                  <p className="text-gray-400 text-sm font-semibold">
                    Congrats! You've unlocked a 20% discount on Care Refresh!
                  </p>
                )}
              </div>

              <div className="text-right space-y-2">
                <p className="text-2xl font-bold">
                  Total Amount: <span className="text-green-400">{finalTotal.toFixed(2)} €</span>
                </p>
                {careRefresh && (
                  <p className="text-sm text-gray-400">
                    Care Refresh: {careRefreshTotal.toFixed(2)} €
                  </p>
                )}
                <p className="text-sm text-gray-400">Shipping: FREE</p>
              </div>
            </div>

            {/* br */}
            <hr className="border-gray-700 my-10" />

            {/* btns */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <Link
                to="/products"
                className="px-8 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold shadow-md transition"
              >
                ← Continue Shopping
              </Link>

              <button
                onClick={handleCheckout}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-md transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* alert login */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white text-black p-8 rounded-xl shadow-xl max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">You're not logged in</h2>
            <p className="text-gray-600 mb-6">
              Would you like to log in or continue your order as a guest?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/orderinfo");
                }}
                className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
