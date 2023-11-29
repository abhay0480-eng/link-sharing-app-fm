// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { createContext, useContext } from "react";

// export const UserContext = createContext({

//     users:[{
//         id:"123",
//         email:"abhay@gmail.com",
//         password:"12345",
//         isLogin: false
//     }],
//     addUser: (user) => {},
//     updateUser: (id, todo) => {},
// })

// export const useUser = () => {
//     return useContext(UserContext)
// }

// export const LoginProvider = UserContext.Provider

import { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  password: string;
  isLogin: boolean;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: User) => void;
}

const initialUserContext: UserContextType = {
  users: [
    {
      id: "123",
      email: "abhay@gmail.com",
      password: "12345",
      isLogin: false,
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUser: (_user) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: (_id, _user) => {},
};

export const UserContext = createContext<UserContextType>(initialUserContext);

export const useUser = (): UserContextType => {
  return useContext(UserContext);
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  return <UserContext.Provider value={initialUserContext}>{children}</UserContext.Provider>;
};

