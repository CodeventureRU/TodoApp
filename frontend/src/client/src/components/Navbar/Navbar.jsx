import React from 'react';
import cl from "./Navbar.module.css";
import {Form as RouterForm, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import MyBtn from "../UI/MyBtn/MyBtn";

const Navbar = () => {
    const user = useSelector(state => state.user);

    return (
        <div className={cl.Navbar}>
            <div className="container">
                <div className={cl.NavbarWrapper}>
                    <NavLink to={"/"}><h2 className={"colored"}>TodoApp</h2></NavLink>
                    {
                        !user.auth
                        ?
                            <ul className={cl.NavbarMenu}>
                                <li><NavLink to={"/register"} className={"colored"}>Зарегистрироваться</NavLink></li>
                                <li><NavLink to={"/login"} className={"colored"}>Войти</NavLink></li>
                            </ul>
                        :
                            <ul className={cl.NavbarMenu}>
                                <li><NavLink to={"/dashboard"} className={"colored"}>{ user.email }</NavLink></li>
                                <li><RouterForm method={"post"} action={"logout"}><MyBtn small={true}>Выйти</MyBtn></RouterForm> </li>
                            </ul>
                    }

                </div>
            </div>
        </div>

    );
};

export default Navbar;