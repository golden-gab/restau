import React from 'react';
import './textarea.css'

const Textarea = ({label, name, id = "",required, children,value , cols=10 , rows=5,...props }) => {
    return (
        <div className="form-group">
        {label && (
            <label className="form-label" htmlFor={id}>
            {label}{required && <span>*</span>}
            </label>
        )}
            <textarea 
                name={name} 
                className='form-area' 
                cols={cols} 
                rows={rows}
                value={value}
                required={required}
                {...props} 
            >
        </textarea>
        </div>
    );
}

export default Textarea;
