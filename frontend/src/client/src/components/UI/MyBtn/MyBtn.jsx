import React from 'react';
import cl from "./MyBtn.module.css";

const MyBtn = ({onClick, children, small=false, ...props}) => {
    return (
        <button className={cl.myBtn + ' ' + (small && cl.small)} onClick={onClick} {...props}>{children}</button>
    );
};

export default MyBtn;