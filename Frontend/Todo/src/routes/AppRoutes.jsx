import { RouterProvider, createBrowserRouter } from "react-router-dom";
import APP_ENDPOINTS from "../constants/AppEndPoints";
import RequireAuth from "./RequireAuth";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/main/Home";

const router = createBrowserRouter([
  {
    path: APP_ENDPOINTS.AUTH,
    element: <Auth />,
    
  },
  {
    path:APP_ENDPOINTS.LOGIN,
    element:<Login />
  },
  {
    path:APP_ENDPOINTS.SIGN_UP,
    element:<Signup />
  },
  {
    path: APP_ENDPOINTS.ROOT,
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
]);


function AppRoutes(){
    return <RouterProvider router={router} />
}

export default AppRoutes