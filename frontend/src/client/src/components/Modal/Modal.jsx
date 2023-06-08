import React from 'react';
import cl from "./Modal.module.css";

const Modal = ({title, active, setActive, children}) => {
    return (
        <div className={cl.Modal + " " + (active && cl.ActiveModal)}>
            <div className={cl.ModalFade} onClick={_ => setActive(false)}></div>
            <div className={cl.ModalContent}>
                <h2 className="page-header">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;