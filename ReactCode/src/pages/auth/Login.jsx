import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    login(email);
    navigate("/products");
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg p-10 rounded-3xl shadow-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        {!user ? (
          <>
            <h1 className="text-4xl font-extrabold mb-8 text-center">
              Access <span className="text-blue-500">DroneHub</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <p className="text-center text-sm text-gray-400 mt-4">
                Don’t have an account?{" "}
              <Link to="/register" className="underline text-blue-500 hover:text-blue-600">
                Register here
              </Link>
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold text-white shadow-lg transition-all"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">
              Welcome back, <span className="text-blue-400">{user.email}</span>
            </h2>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold shadow-lg transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
