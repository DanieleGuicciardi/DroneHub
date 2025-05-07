import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg p-10 rounded-3xl shadow-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-center">
        <h1 className="text-3xl font-bold mb-6">Registration Complete</h1>
        <p className="text-lg mb-4">
          A verification email has been sent to: <br />
          <span className="text-blue-400">{email}</span>
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Please check your inbox and follow the instructions to activate your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
};

export default VerifyEmail;
