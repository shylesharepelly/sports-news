import { createBrowserRouter, Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import  Home  from "../pages/Home";
import UpdatePassword from "../pages/updatePassword";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  
  {
    path: "/home",
    element: <Home />,
  },
  {
    path:"updatepassword",
    element:<UpdatePassword/>
  }
]);
export default router;