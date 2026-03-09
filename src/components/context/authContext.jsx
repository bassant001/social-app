import { createContext, useState } from "react";

export const createdContext = createContext();

export default function AuthContextProvider({ children }) {

    const [userToken, setUserToken] = useState(function () {
        return localStorage.getItem('tkn');
    });

    function resetUserToken() {
        setUserToken(null);
    }

    function setAuthUserToken(tk) {
        setUserToken(tk);
        console.log("tk", tk);
    }

    return (
        <createdContext.Provider
            value={{ userToken, resetUserToken, setAuthUserToken }}
        >
            {children}
        </createdContext.Provider>
    );
}