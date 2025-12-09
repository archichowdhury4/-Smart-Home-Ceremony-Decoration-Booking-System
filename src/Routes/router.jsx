import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Services from "../Pages/Services";
import ServiceDetails from "../Componants/ServiceDetails";
import BookingForm from "../Pages/BookingForm";


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
      }, 
      {
  path: "services/:id",
  Component: ServiceDetails

      },
      {
        path: "book/:id",
        Component: BookingForm
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