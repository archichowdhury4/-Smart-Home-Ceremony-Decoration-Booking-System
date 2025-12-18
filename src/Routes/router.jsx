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
import AdminRoute from "./AdminRoute";
import TodaysSchedule from "../Pages/Dashboard/TodaysSchedule";
import DecoratorEarnings from "../Pages/Dashboard/DecoratorEarnings";
import DecoratoRoute from "./DecoratoRoute";



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
  element: (
    <AdminRoute>
      <ApproveDecorators />
    </AdminRoute>
  )
},

   {
  path: "users-management",
  element: (
    <AdminRoute>
      <UsersManagement />
    </AdminRoute>
  )
},
{
  path: "manage-services",
  element: (
    <AdminRoute>
      <ManageServices />
    </AdminRoute>
  )
},
{
  path: "manage-bookings",
  element: (
    <AdminRoute>
      <ManageBookings />
    </AdminRoute>
  )
},
{
  path: "assign-decorator",
  element: (
    <AdminRoute>
      <AssignDecorator />
    </AdminRoute>
  )
},
{
  path: "revenue",
  element: (
    <AdminRoute>
      <Revenue />
    </AdminRoute>
  )
},
{
  path: "service-chart",
  element: (
    <AdminRoute>
      <ServiceDemandChart />
    </AdminRoute>
  )
},
{
  path: 'assigned-projects',
  element: <DecoratoRoute><MyAssignedProjects/></DecoratoRoute>
},

{
  path: 'today-schedule',
 element: <DecoratoRoute><TodaysSchedule/></DecoratoRoute>
},
{
  path: "decorator-earnings",
  Component: <DecoratoRoute><DecoratorEarnings/></DecoratoRoute>
},


  ]
},
   {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);