import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

const initialState = {
    logged: false
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const logged = JSON.parse(localStorage.getItem('logged') || 'false');
    
    return {
        logged: !!logged,
        user
    }
}

export const AuthProvider = ({children}: {children: any}) => {
  
    const [ authState, dispatch ] = useReducer(authReducer, initialState, init)

    const login = (name = '') => {
        const action = {
            type: types.login,
            logged: true,
            user: {
                id: 'abc',
                name
            }
        }
        localStorage.setItem('user', JSON.stringify(action.user))
        localStorage.setItem('logged', JSON.stringify(action.logged))
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('logged');
        const action = {type: types.logout}
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{authState, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
