import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <div className="text-center mt-20 bg-gray-300 min-h-screen">
            <h1 className="text-4xl font-bold  text-gray-500 ">404</h1>
            <p className="text-lg mt-2">Page Not Found</p>
            <Link to="/" className="w-full block text-blue-500 underline">
                Go Back Home
            </Link>
        </div>
    );
}