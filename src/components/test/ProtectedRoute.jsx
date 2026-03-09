import { useContext } from "react"
import { createdContext } from "../context/authContext"
import Login from '../../pages/auth/login/Login';
import { Link, Navigate } from "react-router";
//import { FaLock } from "react-icons/fa";

export default function ProtactedRoute({ children }) {
    const { userToken } = useContext(createdContext)
    if (!userToken)
        return (
            // <div className="flex items-center justify-center min-h-[70vh]">
            //     <div className="bg-gradient-to-tr from-blue-100 to-blue-700  rounded-2xl p-10 text-center max-w-md w-full">

            //         <div className="text-5xl mb-4 flex justify-center">
            //             <FaLock className="text-blue-100"/>
            //         </div>

            //         <h1 className="text-2xl font-bold text-blue-100 mb-3">
            //             Unauthorized
            //         </h1>

            //         <p className="text-blue-900 mb-6">
            //             You are not authorized to view this page.
            //             Please login first.
            //         </p>

            //         <Link
            //             to="/login"
            //             className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            //         >
            //             Go to Login
            //         </Link>

            //     </div>
            // </div>
         <Navigate to="/login" />
        )

    return (
        <div>
            {children}
        </div>)
}