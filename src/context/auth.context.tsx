import { createContext } from "react";


const AuthContext = createContext({loggedInUser: null} as any);

export default AuthContext