/* eslint-disable react/prop-types */
import { createContext} from "react";



export const AuthProvider = ({
    
    children,
    values
}) => {
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


const AuthContext = createContext()

AuthContext.displayName = 'AuthContext'

export default AuthContext
