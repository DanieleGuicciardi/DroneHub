import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/useCartStore";

const Checkout = () => {
  const location = useLocation();
  const guestEmail = location.state?.guestEmail;
  const [completed, setCompleted] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(true);
      clearCart();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-16 text-center">
      {!completed ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Processing your payment...</h1>
          <p className="text-gray-400">Please wait a moment.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Thank you for your purchase!</h1>
          <p className="text-lg text-gray-300 max-w-xl">
            An invoice will be sent to {guestEmail || "your email"} shortly.
            <br />
            As soon as your product is shipped, you’ll receive your tracking code.
          </p>
        </>
      )}
    </section>
  );
};

export default Checkout;
