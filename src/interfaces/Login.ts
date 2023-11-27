type User =  {
    id: string;
    email: string;
    password: string;
    isLogin: boolean;
  }

 export interface LoginContextProps {
    users: User[];
    addUser: (user: User) => void;
  }