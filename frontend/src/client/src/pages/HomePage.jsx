import React from 'react';
import MyBtn from "../components/UI/MyBtn/MyBtn";
import {NavLink} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="centered-container text-center">
            <div className="centered-container-header">
                <h1 className={"colored"}>TodoApp</h1>
                <h2>Учебный веб-проект для управления личными задачами</h2>

                <div className="centered-container-buttons">
                    <NavLink to={"/login"}><MyBtn>Войти</MyBtn></NavLink>
                    <NavLink to={"/register"}><MyBtn>Зарегистрироваться</MyBtn></NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomePage;