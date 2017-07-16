import React from 'react';
import CollageElement from './collage_element';

var Collage = (props) => {
    /*const collagePix = props.map((pix) => {
        return <CollageElement pix={pix} />
    });*/
    console.log(`imgURL: ${props.pix}`);
    return (
        <div>
            <img src={props.pix} />
        </div>
    );
};

export default Collage;

