/* eslint-disable @typescript-eslint/no-explicit-any */
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
    updateIndex: (_index: unknown) => {},
    addUserData: (_userId: unknown,_newLink?: any,_firstName?: any,_lastName?: any,_email?: any,_profileImage?: any) => {},
    updateUserData: (_userId: any, _linkIndex: any, _updatedLink: any) => {},
    deleteUserData: (_userId: any, _linkIndex: any) => {},
    // updateIndex: () => {},
    // addUserData: () => {},
    // updateUserData: () => {},
    // deleteUserData: () => {},
})



export const useUserData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = UserDataContext.Provider
