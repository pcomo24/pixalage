import React from 'react';
import CollageElement from './collage_element';
import './style/style.css';

var Collage = (props) => {
    const size = props.size;
    const pix = props.pix;
    const sizeClass = `collage-container-${size}`;
    const collagePix = pix.map((pixSrc) => {
        return <CollageElement key={pixSrc.id} pix={pixSrc} />
    });
    console.log(`imgURL: ${props.pix}`);
    console.log(`sizeProp: ${size}`);
    return (
        <div className={sizeClass}>
            {collagePix}
        </div>
    );
};

export default Collage;

