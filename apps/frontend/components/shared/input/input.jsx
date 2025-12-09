'use client';
import React, { forwardRef, useRef, useState } from "react";
import "./input.css";

const Input = ({ type, label, name, id = "", errors, required, max,  value,info,placeholder,disabled, ...props }) => {
        const [typeInput, setTypeInput] = useState(type);
        const iconPasswordRef = useRef(null);

        function handlePassword() {
            if (typeInput === "password") {
                setTypeInput("text");
                iconPasswordRef.current.classList.remove('fi-ss-eye')
                iconPasswordRef.current.classList.add('fi-ss-eye-crossed')
            } else {
                setTypeInput("password");
                iconPasswordRef.current.classList.remove('fi-ss-eye-crossed')
                iconPasswordRef.current.classList.add('fi-ss-eye')
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
                        ref={iconPasswordRef}
                        className="fi fi-ss-eye"
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

