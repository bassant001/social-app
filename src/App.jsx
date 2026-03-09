import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import NotFound from "./pages/notfound/NotFound";
import Home from './pages/home/Home'
import { HeroUIProvider } from '@heroui/react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./components/context/authContext";
import Profile from './pages/profile/Profile';
import ProtactedRoute from './components/test/ProtectedRoute';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:
        [
          { index: true, element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "home", element: <ProtactedRoute><Home /></ProtactedRoute> },
          { path: "profile", element: <ProtactedRoute> <Profile /></ProtactedRoute> },
          { path: "*", element: <NotFound /> }
        ],
    },
  ])

const QueryClientConfig= new QueryClient();
  return (
    <>
    <QueryClientProvider client={QueryClientConfig}>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={myRouter} />
        </HeroUIProvider>
        <ToastContainer />
      </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
