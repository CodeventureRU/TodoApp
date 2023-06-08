import React from 'react';
import cl from './MyForm.module.css';

const MyForm = ({children, onSubmit}) => {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(e);
        }}
            className={cl.MyForm}
        >
            {children}
        </form>
    );
};

export default MyForm;