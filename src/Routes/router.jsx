import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Services from "../Pages/Services";
import ServiceDetails from "../Componants/ServiceDetails";
import BookingForm from "../Pages/BookingForm";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyBookings from "../Pages/Dashboard/MyBookings";
import Payment from "../Payment/Payment";
import PaymentSuccess from "../Payment/PaymentSuccess";
import PaymentCancelled from "../Payment/PaymentCancelled";
import MyProfile from "../Pages/Dashboard/MyProfile";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import About from "../Componants/About";



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
      },
      {
        path: "about",
        Component: About
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
  },
  {
    path:"dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "my-bookings",
        Component: MyBookings
        
      },
      {
        path: "my-profile",
        Component: MyProfile
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      }, 
      {
        path: 'payment-success',
        Component: PaymentSuccess
      }, 
      {
        path: 'payment-cancelled', 
        Component: PaymentCancelled
      }
    ]

  }
]);