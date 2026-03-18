import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const createdContext = createContext();

export default function AuthContextProvider({ children }) {

    const [userToken, setUserToken] = useState(function () {
        return localStorage.getItem('tkn');
    });

    const [userID, setUserID] = useState(null)

    function resetUserToken() {
        localStorage.removeItem("tkn");
        setUserToken(null);
    }

    function setAuthUserToken(tk) {
        setUserToken(tk);
        console.log("tk", tk);
    }
    function decodeUserToken() {
        const decodedToken = jwtDecode(userToken)
        console.log("decoded user Token", decodedToken.user);
        setUserID(decodedToken.user);
    }

    //deadmoure => works in initial render so u ve to handle it
    useEffect(() => {
        if (userToken)
            decodeUserToken();
    }, [userToken]); //lw user token change nafz tany




    return (
        <createdContext.Provider
            value={{ userToken, resetUserToken, setAuthUserToken, userID }}
        >
            {children}
        </createdContext.Provider>
    );
}