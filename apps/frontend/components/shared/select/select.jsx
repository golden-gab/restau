import React from "react";
import "./select.css";
const Select = ({
    options,
    label,
    id = "",
    name,
    errors,
    required,
    onChange,
    value,
    defaultValue = "choisir",
    info,
    disabled,
}) => {
    return (
        <div className="form-group">
            {label && (
                <label className={"form-label"} htmlFor={id}>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            <select
                id={id}
                className="form-input"
                onChange={(e) => onChange(e)}
                value={value}
                name={name}
                required={required}
                disabled={disabled}
            >
                <option value={""}>{!disabled && defaultValue}</option>
                {options &&
                    options.map((option) => (
                        <option value={option.id} key={option.id}>
                            {option.designation}{" "}
                        </option>
                    ))}
            </select>

            {info && (
                <p className="form-info">
                    <i className="main-color fa-solid fa-circle-info"></i>
                    {info}
                </p>
            )}
            {errors && <div className="form-error">{errors}</div>}
        </div>
    );
};

export default Select;
