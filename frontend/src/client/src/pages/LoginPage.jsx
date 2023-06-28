import React, {useState} from 'react';
import MyForm from "../components/UI/MyForm/MyForm";
import MyInp from "../components/UI/MyInp/MyInp";
import MyBtn from "../components/UI/MyBtn/MyBtn";
import {NavLink, useNavigate} from "react-router-dom";
import {useGetMeQuery, useLoginMutation} from "../api/features/auth/authApiSlice";
import {stringifyErrors} from "../utlis/stringifyErrors";
import ErrorList from "../components/ErrorList/ErrorList";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const {refetch: getMeRefetch} = useGetMeQuery({}, {});

    // Обработка отправки формы авторизации
    const handleSubmit = async (_) => {

        try {
            await login({email, password}).unwrap();
            await getMeRefetch();

            setEmail("");
            setPassword("");
            navigate('/dashboard');
        } catch (err) {
            setErrors(stringifyErrors(err.data));
        }
    }

    return (
        <div className="centered-container text-center">
            <div className="centered-container-header">
                <h1 className={"colored"}>TodoApp</h1>
                <h2>Вход в аккаунт</h2>
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
                <ErrorList errors={errors} setErrors={setErrors}/>
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