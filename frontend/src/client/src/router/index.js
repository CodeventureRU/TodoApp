import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import logoutAction from "./actions/logout";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import {AuthProvider} from "../providers/AuthProvider";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            // Главная
            {
                index: true,
                element: <HomePage />
            },

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
                element: <AuthProvider /> ,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            }

        ]
    },
]);