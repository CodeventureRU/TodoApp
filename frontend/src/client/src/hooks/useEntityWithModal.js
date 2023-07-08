import {useState} from "react";
import {stringifyErrors} from "../utlis/stringifyErrors";

export const useEntityWithModal = (initialState, fieldsAliases={
    "name": "Название",
    "description": "Описание",
    "deadline": "Срок"
}) => {

    const [entity, setEntity] = useState({
        data: initialState,
        modal: false,
        errors: [],
    });

    return {
        data: entity.data,
        modal: entity.modal,
        errors: entity.errors,

        setData: data => setEntity({...entity, data: data}),
        setModal: modal => setEntity({...entity, modal: modal}),
        setErrors: errors => setEntity({...entity, errors: stringifyErrors(errors, fieldsAliases)}),
        clear: () => {
            setEntity({...entity, data: initialState});
            setEntity({...entity, errors: []});
        },
    }
}