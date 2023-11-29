/* eslint-disable @typescript-eslint/no-unused-vars */


import { createContext, useContext } from "react";

export const UserDataContext = createContext({

    usersData:[
        {
            id:"123",
            links:[{
                Platform:"",
                LinkUrl:"",
            }],
            profileImage:"",
            firstName:"",
            lastName:"",
            email:"",
        }
    ],

    indx:1,
    updateIndex: (index) => {},
    addUserData: (userId,newLink?,firstName?,lastName?,email?,profileImage?) => {},
    updateUserData: (userId, linkIndex, updatedLink) => {},
    deleteUserData: (userId, linkIndex) => {},
})



export const useUserData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = UserDataContext.Provider
