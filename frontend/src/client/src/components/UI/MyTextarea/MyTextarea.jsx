import React from 'react';
import cl from "./MyTextarea.module.css";

const MyTextarea = ({value, setValue, name, label="", ...props}) => {
    return (
        <div>
            {
                label && <label className={cl.myTextareaInput} htmlFor={name}>{label}</label>
            }
            <textarea id={name} name={name} {...props} className={cl.myTextarea} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
};

export default MyTextarea;