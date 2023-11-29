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
import { UserDataProvider } from "./contexts/UserData";
import Layout from "./Layout";

interface User {
  id: string; // or number, depending on your requirements
  email: string;
  password: string;
  isLogin: boolean
  // Add other properties as needed
}

interface Link {
  Platform: string;
  LinkUrl: string;
}

interface UserData {
  id: string;
  links: Link[];
  profileImage: string;
  firstName: string;
  lastName: string;
  email: string;
  indx?: number;
}

// interface IIndex {
//   indx: number
// }



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  // const [indx, setIndx] = useState<IIndex>();
  // const [indx, setIndx] = useState()
  const [indx, setIndx] = useState<number>(-1);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/preview/:id' element={<Preview />} />
      </Route>
    )
  )

  // const addUser = (user: User) => {
  //   setUsers((prev: User[]) => [{ id: Date.now(), ...user }, ...prev]);
  // }

  const addUser = (user: User) => {
    setUsers((prev: User[]) => [{ ...user, id: Date.now().toString() }, ...prev]);
  };

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
    const storedUsersData = localStorage.getItem("usersData");
    if (storedUsersData) {
      const parsedUsersData = JSON.parse(storedUsersData);
      if (Array.isArray(parsedUsersData) && parsedUsersData.length > 0) {
        setUsersData(parsedUsersData);
      }
    }
  }, []);

  const addUserData = (userId: string, newLink?: Link,  firstName?: string, lastName?: string, email?: string, profileImage?: string ) => {
    // console.log("newLink",newLink);
    
    setUsersData((prevData: UserData[]) => {
      // Find the user with the given userId
      const userIndex = prevData.findIndex(user => user.id === userId);
  
      // If the user is found, add the new link to their links array
      if (userIndex !== -1) {
        return [
          ...prevData.slice(0, userIndex),
          {
            ...prevData[userIndex],
            links: newLink !== undefined ? [...prevData[userIndex].links, newLink] : prevData[userIndex].links,
            firstName: firstName !== undefined ? firstName : prevData[userIndex].firstName,
            lastName: lastName !== undefined ? lastName : prevData[userIndex].lastName,
            email: email !== undefined ? email : prevData[userIndex].email,
            profileImage: profileImage !== undefined ? profileImage : prevData[userIndex].profileImage,
          },
          ...prevData.slice(userIndex + 1),
        ];
      }
  
      // If the user is not found, return the original array
      return [
        ...prevData,
        {
          id: userId,
          links: newLink !== undefined ? [newLink] : [],
          firstName: firstName !== undefined ? firstName : "",
          lastName: lastName !== undefined ? lastName : "",
          email: email !== undefined ? email : "",
          profileImage: profileImage !== undefined ? profileImage : "",
        },
      ];
    });
  };
  

  const updateUserData = (userId: string, linkIndex: number, updatedLink: Link) => {
    setUsersData((prevData: UserData[]) => {
      // Find the user with the given userId
      const userIndex = prevData.findIndex(user => user.id === userId);
  
      // If the user is found, update the link at the specified index
      if (userIndex !== -1) {
        const updatedUserData = [...prevData];
        const updatedUser = { ...updatedUserData[userIndex] };
  
        // Make sure the linkIndex is within bounds
        if (linkIndex >= 0 && linkIndex < updatedUser.links.length ) {
          updatedUser.links[linkIndex] = updatedLink;
          updatedUserData[userIndex] = updatedUser;
        }
  
        return updatedUserData;
      }
  
      // If the user is not found, return the original array
      return prevData;
    });
  };

  const deleteUserData = (userId: string, linkIndex: number) => {
    setUsersData((prevData: UserData[]) => {
      // Find the user with the given userId
      const userIndex = prevData.findIndex(user => user.id === userId);
  
      // If the user is found, delete the link at the specified index
      if (userIndex !== -1) {
        const updatedUserData = [...prevData];
        const updatedUser = { ...updatedUserData[userIndex] };
  
        // Make sure the linkIndex is within bounds
        if (linkIndex >= 0 && linkIndex < updatedUser.links.length) {
          updatedUser.links.splice(linkIndex, 1);
          updatedUserData[userIndex] = updatedUser;
        }
  
        return updatedUserData;
      }
  
      // If the user is not found, return the original array
      return prevData;
    });
  };
  

  const updateIndex = (newIndex: number) => {
    setIndx(newIndex);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(usersData))
  }, [usersData])

  return (
     <LoginProvider value={{users,addUser,updateUser}}>
      <UserDataProvider value={{indx,usersData,addUserData,updateUserData,updateIndex,deleteUserData}}>
      <RouterProvider router={router} />
      </UserDataProvider>
     </LoginProvider>
  )
}

export default App
