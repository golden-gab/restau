import React from 'react';
import './sectionTitre.css'

const SectionTItre = ({titre,description,label}) => {
    return (
        <div className='section-titre-container'>
            {label && <p className='section-label'>{label}</p>}
            <h2 className='section-titre'>{titre}</h2>
            {description && <p className='section-description'>{description}</p>}
        </div>
    );
} 

export default SectionTItre;
