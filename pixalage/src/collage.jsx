import React from 'react';
import CollageElement from './collage_element';

var Collage = (props) => {
    const collagePix = props.pix.map((pixSrc) => {
        return <CollageElement pix={pixSrc} />
    });
    console.log(`imgURL: ${props.pix}`);
    return (
        <div>
            {collagePix}
        </div>
    );
};

export default Collage;

