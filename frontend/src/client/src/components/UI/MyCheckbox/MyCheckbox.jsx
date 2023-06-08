import React from 'react';
import cl from './MyCheckbox.module.css';

const MyCheckbox = ({checked, setChecked, name, label="", group = false, ...props}) => {
    return (
        <div className={group ? cl.myCheckboxGroup : ""}>
            <input type="checkbox" id={name} name={name} {...props} className={cl.myCheckbox} checked={checked} onChange={e => setChecked(e.target.checked)}/>
            {
                label && <label className={cl.myCheckboxLabel} htmlFor={name}>{label}</label>
            }
        </div>
    );
};

export default MyCheckbox;