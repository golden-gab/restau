import React from 'react';
import './button.css'
import Spinner from '../spinner/spinner';

const Button = ({ children , role , type="full-btn" , id , onClick , disabled=false ,isLoading}) => {
    type += ' button'; 
    

    return (
        <button 
            className={type} 
            role={role} 
            id={id} 
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? <Spinner/> : children}
        </button>
        
    );
}

export default Button;
