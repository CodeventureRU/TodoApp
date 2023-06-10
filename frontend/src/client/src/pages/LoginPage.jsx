import React, {useState} from 'react';
import MyForm from "../components/UI/MyForm/MyForm";
import MyInp from "../components/UI/MyInp/MyInp";
import MyBtn from "../components/UI/MyBtn/MyBtn";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
// import {setUser} from "../store/features/userSlice";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="centered-container text-center">
            <div className="centered-container-header">
                <h1 className={"colored"}>TodoApp</h1>
                <h2>Вход в аккаунт</h2>
            </div>
            <MyForm
                // onSubmit={() => {dispatch(setUser({
                //     id: 1,
                //     auth: true,
                //     email: email
                // })); navigate("/dashboard")}}
            >
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
                <MyBtn
                    onClick={_=>{}}
                >Войти</MyBtn>
                <br/>
                <p className={"small"}>Нет аккаунта? <NavLink to={"/register"} className={"colored small"}>Зарегистрироваться</NavLink></p>
            </MyForm>
        </div>
    );
};

export default LoginPage;