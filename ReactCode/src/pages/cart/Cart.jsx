import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const isLogged = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    if (!isLogged) {
      setShowPopup(true);
    } else {
      navigate("/orderinfo");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12">🛒 Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">Your cart is empty. Go grab a drone!</p>
        ) : (
          <div className="space-y-8">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white text-black p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-blue-600 text-lg mt-1">{item.price} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 font-semibold hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700">
              <p className="text-2xl font-semibold">
                Total: <span className="text-green-400">{total.toFixed(2)} €</span>
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold shadow transition"
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white shadow-lg transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* POPUP */}
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
