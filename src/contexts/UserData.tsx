
import { createContext, useContext } from "react";

export const UserDataContext = createContext({

    usersData:[
        {
            id:"123",
            links:[{
                platform:"",
                link:"",
            }],
            profileImage:"",
            firstName:"",
            lastName:"",
            email:"",
        }
    ],

    indx:1,
    updateIndex: (index) => {},
    addUserData: (newLink?,userId,firstName?,lastName?,email?,profileImage?) => {},
    updateUserData: (userId, linkIndex, updatedLink) => {},
    deleteUserData: (userId, linkIndex) => {},
})



export const useUserData = () => {
    return useContext(UserDataContext)
}

export const UserDataProvider = UserDataContext.Provider



// import React, { createContext, useContext, ReactNode, FC } from "react";

// interface Link {
//     platform: string;
//     link: string;
// }

// interface UserData {
//     id: string;
//     links: Link[];
//     profileImage: string;
//     firstName: string;
//     lastName: string;
//     email: string;
// }

// interface UserDataContextType {
//     usersData: UserData[];
//     addUserData: (userData: UserData) => void;
//     updateUserData: (id: string, userData: UserData) => void;
// }

// const defaultUserData: UserDataContextType = {
//     usersData: [
//         {
//             id: "123",
//             links: [
//                 {
//                     platform: "",
//                     link: "",
//                 },
//             ],
//             profileImage: "",
//             firstName: "",
//             lastName: "",
//             email: "",
//         },
//     ],
//     addUserData: () => {},
//     updateUserData: () => {},
// };

// export const UserDataContext = createContext<UserDataContextType>(defaultUserData);

// export const useUser = () => {
//     return useContext(UserDataContext);
// };

// interface UserDataProviderProps {
//     children: ReactNode;
// }

// export const UserDataProvider: FC<UserDataProviderProps> = ({ children }) => {
//     return (
//         <UserDataContext.Provider value={defaultUserData as UserDataContextType}>
//             {children}
//         </UserDataContext.Provider>
//     );
// };
