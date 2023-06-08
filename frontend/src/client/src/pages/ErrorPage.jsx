import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import {useRouteError} from "react-router";

// Страница с заглушкой под ошибку
// Выводим сообщение об ошибке и статус
const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="ErrorPage">
            <Navbar></Navbar>
            <div className="centered-container text-center">
                <div className="centered-container-header">
                    <h1 className={"colored"}>TodoApp</h1>
                    <h2>Ошибка<br/><i>{error.statusText || error.message}</i></h2>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;