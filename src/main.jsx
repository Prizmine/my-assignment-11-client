import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Home from "./Pages/HomePage/Home";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Pages/Auth/Login";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Register from "./Pages/Auth/Register";
import HomePage from "./Pages/HomePage/HomePage";
// import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: () => fetch("/Hero.json").then((res) => res.json()),
      },
      {
        path: "/auth",
        Component: AuthLayout,
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/register",
            Component: Register,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
