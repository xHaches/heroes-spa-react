import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

export const PublicRoute = ({ children }: {children: ReactElement}) => {

    const { authState: { logged } } = useContext(AuthContext); 
    
    return (!logged)
    ? children
    : <Navigate to="/marvel" />
}
