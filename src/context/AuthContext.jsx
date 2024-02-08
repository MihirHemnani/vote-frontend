import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext();

// creating global state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            };
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // if already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('socket_user'));
        if (user) dispatch({ type: "LOGIN", payload: user })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}