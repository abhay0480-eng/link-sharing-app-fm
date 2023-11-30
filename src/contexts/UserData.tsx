/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { createContext, useContext } from "react";

interface Link {
    Platform: string;
    LinkUrl: string;
  }
  
//   interface UserData {
//     id: string;
//     links: Link[];
//     profileImage: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     indx?: number;
//   }

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
    updateIndex: (_index: number) => {},
    addUserData: (_userId: string,_newLink?: Link,_firstName?: string,_lastName?: string,_email?: string,_profileImage?: string) => {},
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
