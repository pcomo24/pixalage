import React from 'react';
import CollageElement from './collage_element';
import './style/style.css';

var Collage = (props) => {
    const collagePix = props.pix.map((pixSrc) => {
        return <CollageElement pix={pixSrc} />
    });
    console.log(`imgURL: ${props.pix}`);
    return (
        <div className="collage-container-3">
            {collagePix}
        </div>
    );
};

export default Collage;

