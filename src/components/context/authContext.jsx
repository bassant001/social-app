import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const createdContext = createContext();

export default function AuthContextProvider({ children }) {


    const [userToken, setUserToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("tkn");

        if (token) {
            setUserToken(token);
        }

        setIsLoading(false);
    }, []);

    function resetUserToken() {
        localStorage.removeItem("tkn");
        setUserToken(null);
        setUserID(null);
    }

      function setAuthUserToken(tk) {
        if (tk) {
            localStorage.setItem("tkn", tk);
            setUserToken(tk);
        } else {
            resetUserToken();
        }
    }

    function decodeUserToken() {
        try {
            const decodedToken = jwtDecode(userToken);
            setUserID(decodedToken.user);
        } catch (err) {
            console.log("Invalid token");
            resetUserToken(); 
        }
    }
    //deadmoure => works in initial render so u ve to handle it
    useEffect(() => {
        if (userToken)
            decodeUserToken();
    }, [userToken]); //lw user token change nafz tany




    return (
        <createdContext.Provider
            value={{ userToken, resetUserToken, setAuthUserToken, userID, isLoading }}
        >
            {children}
        </createdContext.Provider>
    );
}
