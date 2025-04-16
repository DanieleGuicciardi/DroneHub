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
  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    if (!isLogged) {
      const loginFirst = window.confirm("You need to log in to complete your order. Proceed to login?");
      if (loginFirst) {
        navigate("/login");
      } else {
        const guestEmail = window.prompt("Enter your email to proceed as a guest:");
        if (guestEmail) {
          navigate("/checkout", { state: { guestEmail } });
        }
      }
    } else {
      navigate("/checkout");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white text-black p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-blue-600">{item.price} €</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <p className="text-xl font-bold">Total: {total.toFixed(2)} €</p>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>

          <div className="text-center pt-10">
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default Cart;
