import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Preview from "./pages/Preview/Preview";
import { LoginProvider } from "./contexts/User";
import { useEffect, useState } from "react";
import Layout from "./Layout";

interface User {
  id: string; // or number, depending on your requirements
  email: string;
  password: string;
  isLogin: boolean
  // Add other properties as needed
}

function App() {





  const [users, setUsers] = useState<User[]>([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/preview' element={<Preview />} />
      </Route>
    )
  )

  const addUser = (user) => {
    setUsers((prev: User[]) => [{ id: Date.now(), ...user }, ...prev]);
  }

  const updateUser = (user: User, id: string) => {
    setUsers((prev) => prev.map((prevUser) => (prevUser.id === id ? user : prevUser )));
  }


  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
  
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      
      if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
        setUsers(parsedUsers);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  return (
     <LoginProvider value={{users,addUser,updateUser}}>
      <RouterProvider router={router} />
     </LoginProvider>
  )
}

export default App









