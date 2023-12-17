import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./root.jsx";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import App from "./App"; // Import your App component

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your entire app with the RouterProvider */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
