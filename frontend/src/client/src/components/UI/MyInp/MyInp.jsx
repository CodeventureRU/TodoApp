import React from 'react';
import cl from './MyInp.module.css';

const MyInp = ({value, setValue, name, label="", group = false, ...props}) => {
    return (
        <div className={group ? cl.myInpGroup : ""}>
            {
                label && <label className={cl.myInpLabel} htmlFor={name}>{label}</label>
            }
            <input id={name} name={name} {...props} className={cl.myInp} value={value} onChange={e => setValue(e.target.value)}/>
        </div>
    );
};

export default MyInp;