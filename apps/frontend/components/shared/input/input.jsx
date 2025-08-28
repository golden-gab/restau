'use client';
import React, { forwardRef, useRef, useState } from "react";
import "./input.css";

const Input = ({ type, label, name, id = "", errors, required, max,  value,info,placeholder,disabled, ...props }) => {
        const [typeInput, setTypeInput] = useState(type);

        function handlePassword() {
            if (typeInput === "password") {
                setTypeInput("text");
            } else {
                setTypeInput("password");
            }
        }
        return (
            <div className="form-group">
                {label && (
                    <label className={"form-label"} htmlFor={id}>
                        {label}
                        {required && <span>*</span>}
                    </label>
                )}

                <input
                    id={id}
                    type={typeInput}
                    name={name}
                    className="form-input"
                    // ref={ref}
                    value={value}
                    required={required}
                    maxLength={max}
                    placeholder={!disabled && placeholder}
                    disabled={disabled}
                    {...props}
                />
                {max && (
                    <span className="max-value">
                        {value.length}/{max}
                    </span>
                )}
                {type === "password" && (
                    <i
                        className="fa-solid fa-eye"
                        onClick={() => handlePassword()}
                    ></i>
                )}
                {info && (
                    <p className="form-info">
                        <i className="main-color fa-solid fa-circle-info"></i>
                        {info}
                    </p>
                )}
                {errors && <div className="form-error">{errors}</div>}
            </div>
        );
    }


export default Input;

