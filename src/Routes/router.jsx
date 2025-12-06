import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);