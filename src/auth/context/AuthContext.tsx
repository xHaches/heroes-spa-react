import { createContext } from "react";



export const AuthContext = createContext<{
    authState: {
        logged: boolean,
        user?: {
            id: string, 
            name: string
        }
    }
    login?: (name: string) => void
    logout?: () => void
}>({
    authState: {
        logged: false,
    }
});