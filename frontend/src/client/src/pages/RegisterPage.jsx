import React, {useState} from 'react';
import MyForm from "../components/UI/MyForm/MyForm";
import MyInp from "../components/UI/MyInp/MyInp";
import MyBtn from "../components/UI/MyBtn/MyBtn";
import {NavLink} from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <div className="centered-container text-center">
            <div className="centered-container-header">
                <h1 className={"colored"}>TodoApp</h1>
                <h2>Регистрация</h2>
            </div>
            <MyForm >
                <MyInp
                    name={"email"}
                    type={"email"}
                    label={"Email"}
                    value={email}
                    group={true}
                    setValue={setEmail}
                />
                <MyInp
                    name={"password"}
                    type={"password"}
                    label={"Пароль"}
                    value={password}
                    group={true}
                    setValue={setPassword}
                />
                <MyInp
                    name={"password_confirm"}
                    type={"password"}
                    label={"Пароль (подтверждение)"}
                    value={passwordConfirm}
                    group={true}
                    setValue={setPasswordConfirm}
                />
                <MyBtn
                    onClick={_=>{}}
                >Зарегистрироваться</MyBtn>
                <br/>
                <p className={"small"}>Уже есть аккаунт? <NavLink to={"/login"} className={"colored small"}>Войти</NavLink></p>
            </MyForm>
        </div>
    );
};

export default RegisterPage;