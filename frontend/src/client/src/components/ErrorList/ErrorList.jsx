import React from 'react';
import cl from "./ErrorList.module.css";

const ErrorList = ({errors, setErrors}) => {
    if (errors.length === 0) {
        return (<></>);
    }

    const removeError = err => {
        setErrors(errors.filter(e => e !== err));
    }

    return (
        <ul className={cl.ErrorList}>
            {
                errors.map((err, index) =>
                    <li key={index}>{err} <span onClick={_ => removeError(err)}>×</span></li>
                )
            }
        </ul>
    );
};

export default ErrorList;