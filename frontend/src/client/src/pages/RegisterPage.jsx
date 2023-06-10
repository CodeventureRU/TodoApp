import React, {useState} from 'react';
import MyForm from "../components/UI/MyForm/MyForm";
import MyInp from "../components/UI/MyInp/MyInp";
import MyBtn from "../components/UI/MyBtn/MyBtn";
import {NavLink, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../api/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {setToken} from "../store/features/auth/authSlice";
import {stringifyErrors} from "../utlis/stringifyErrors";
import ErrorList from "../components/ErrorList/ErrorList";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [register, ] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    // Обработка отправки формы авторизации
    const handleSubmit = async (_) => {

        try {
            const token = await register({email, password, confirm_password: passwordConfirm}).unwrap();

            dispatch(setToken(token));

            setEmail("");
            setPassword("");
            navigate('/dashboard');
        } catch (err) {
            setErrors(stringifyErrors(err.data, {"password": "Пароль", "email": "Email"}));
        }
    }

    return (
        <div className="centered-container text-center">
            <div className="centered-container-header">
                <h1 className={"colored"}>TodoApp</h1>
                <h2>Регистрация</h2>
            </div>
            <MyForm
                onSubmit={handleSubmit}
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
                <MyInp
                    name={"password_confirm"}
                    type={"password"}
                    label={"Пароль (подтверждение)"}
                    value={passwordConfirm}
                    group={true}
                    setValue={setPasswordConfirm}
                />
                <ErrorList errors={errors} setErrors={setErrors}/>
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