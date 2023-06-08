import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import logoutAction from "./actions/logout";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            // Вход и авторизация
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },

            // События
            {
                path: "/logout",
                action: logoutAction
            },

            // Личный кабинет
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    },
]);