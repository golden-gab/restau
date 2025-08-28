import React from 'react';
import './spinner.css'

const Spinner = () => {
    return (
        <div className='spinner'>
        </div>
    );
}

export default Spinner;

export function PageSpinner(){
    return(
        <div className='page-spinner'>
            <Spinner/>
        </div>
    )
}
