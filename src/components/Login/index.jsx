import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/auction/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        if (data && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user_email", data.email);
          localStorage.setItem("user_name", data.name);
        }
        setSuccess("Login successful.");
        setTimeout(() => {
          navigate({ to: "/Market" });
        }, 2000);
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen px-2 overflow-hidden">
        <div className="w-full max-w-xl p-5 m-auto border-none rounded-sm py-28 border-1 bg-black/25 backdrop-blur-sm ">
          <h1 className="text-3xl tracking-[.30em] text-center text-white pb-5">
            Login
          </h1>
          {error && (
            <div className="mt-2 text-center text-red-600">{error}</div>
          )}
          {success && (
            <div className="mt-2 text-center text-green-600">{success}</div>
          )}
          <form className="max-w-sm m-auto mt-6" onSubmit={handleLogin}>
            <div className="py-1 mb-2">
              <input
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-1.5 mt-2 text-white bg-black/40 border-gray-800 rounded-sm focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-3 mb-2">
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-1.5 mt-2 text-white border-gray-800	  bg-black/40 rounded-sm hover:border-gray-800 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-black rounded-sm hover:scale-105 focus:outline-none focus:"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm font-light tracking-wide text-center text-gray-400 ">
            Don´t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
