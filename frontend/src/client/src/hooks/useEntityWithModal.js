import { useState} from "react";
import {stringifyErrors} from "../utlis/stringifyErrors";

export const useEntityWithModal = (initialState, fieldsAliases={
    "name": "Название",
    "description": "Описание",
    "deadline": "Срок"
}) => {

    const [data, setData] = useState(initialState);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState([]);

    return {
        data,
        modal,
        errors,

        setData,
        setModal,
        setErrors: errors => setErrors(stringifyErrors(errors, fieldsAliases)),
        clear: () => {
            setErrors([]);
            setData(initialState);
        },
        setOnClear: (data) => {
            setData({...initialState, ...data});
        }
    }
}