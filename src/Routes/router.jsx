import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Services from "../Pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:
    [
      {
        index: true,
        Component: Home
      },
      {
        path: "services",
        Component: Services
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: "login",
            Component: Login
        },
        {
            path: "register",
            Component: Register
        }
    ]
  }
]);