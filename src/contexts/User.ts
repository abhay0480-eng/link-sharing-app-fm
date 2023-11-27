import { createContext, useContext } from "react";

export const UserContext = createContext({
    users:[{
        id:"123",
        email:"abhay@gmail.com",
        password:"12345",
        isLogin: false
    }],
    addUser: (user) => {},
    updateUser: (id, todo) => {},
})

export const useUser = () => {
    return useContext(UserContext)
}

export const LoginProvider = UserContext.Provider

