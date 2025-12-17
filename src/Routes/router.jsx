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
import ContactPage from "../Componants/ContactPage";
import ApplyDecorator from "../Pages/ApplyDecorator";
import ApproveDecorators from "../Pages/Dashboard/ApproveDecorators";
import UsersManagement from "../Pages/Dashboard/UsersManagement";
import ManageServices from "../Pages/Dashboard/ManageServices";
import ManageBookings from "../Pages/Dashboard/ManageBookings";
import AssignDecorator from "../Pages/Dashboard/AssignDecorator";
import Revenue from "../Pages/Dashboard/Revenue";
import ServiceDemandChart from "../Pages/Dashboard/ServiceDemandChart";
import MyAssignedProjects from "../Pages/Dashboard/MyAssignedProjects";
import ErrorPage from "../Pages/ErrorPage";
import Coverage from "../Componants/Coverage";



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
      },
      {
        path: "contact",
        Component: ContactPage
      },
      {
        path: "coverage",
        loader: async () => {
        const res = await fetch("/ServiceCenters.json");
         return res.json();
  },
  Component: Coverage
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
  path: "dashboard",
  Component: () => (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
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
      path: "apply-decorator",
      Component: ApplyDecorator
    },
    {
      path: "payment/:parcelId",
      Component: Payment
    },
    {
      path: "payment-history",
      Component: PaymentHistory
    },
    {
      path: "payment-success",
      Component: PaymentSuccess
    },
    {
      path: "payment-cancelled",
      Component: PaymentCancelled
    },
    {
      path: "approve-decorators",
      Component: ApproveDecorators
    },
    {
      path: "users-management",
      Component: UsersManagement
    },
    {
      path: "manage-services",
      Component: ManageServices
    },
    {
      path: "manage-bookings",
      Component: ManageBookings
    },
    {
      path: "assign-decorator",
      Component: AssignDecorator
    },
    {
  path: 'revenue',
  Component: Revenue
},
 {
  path: 'service-chart',
  Component: ServiceDemandChart
},
{
  path: 'my-assigned-projects',
  Component: MyAssignedProjects
}

  ]
},
   {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);