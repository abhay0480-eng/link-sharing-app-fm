import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
  ]);

  return (
   <div className=''>
     <RouterProvider router={router} />/
   </div>
  )
}

export default App









