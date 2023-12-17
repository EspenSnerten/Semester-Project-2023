import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 2000);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    setMessage("");

    if (
      !formData.email.endsWith("@noroff.no") &&
      !formData.email.endsWith("@stud.noroff.no")
    ) {
      setMessage("Email must be from @noroff.no or @stud.noroff.no");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/auction/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        setMessage("Registration successful! Welcome aboard.");
        navigateToHome();
      } else {
        setMessage("Registration failed. Please try again later.");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen p-5 overflow-hidden">
      <div className="w-full max-w-xl p-5 m-auto border-none rounded-sm bg-black/25 backdrop-blur-sm py-28">
        <h1 className="text-3xl tracking-[.30em] text-center text-white pb-5">
          Register
        </h1>
        {message && (
          <p
            className={`text-center ${
              message.includes("failed") || message.includes("Email")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <form className="max-w-sm m-auto mt-6">
          <div className="py-1 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-1.5 mt-2 text-white border-gray-800	  bg-black/40 rounded-sm hover:border-gray-800 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-1 mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-1.5 mt-2 text-white border-gray-800	  bg-black/40 rounded-sm hover:border-gray-800 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-1.5 mt-2 text-white border-gray-800	  bg-black/40 rounded-sm hover:border-gray-800 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="text"
              name="avatar"
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={handleChange}
              className="block w-full px-4 py-1.5 mt-2 text-white border-gray-800	  bg-black/40 rounded-sm hover:border-gray-800 focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full px-4 py-2 tracking-wide text-center text-white transition-all duration-200 transform bg-black rounded-sm hover:scale-105 focus:outline-none "
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-sm font-light tracking-wide text-center text-gray-400 ">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
