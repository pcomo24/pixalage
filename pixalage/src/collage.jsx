import React from 'react';
import CollageElement, {EmptycollageElement} from './collage_element';
import './style/style.css';

var Collage = (props) => {
    const size = props.size;
    const pix = props.pix;
    //change size of collage based on user input
    const sizeClass = `collage-container-${size}`;
    //if there is a picture available, return it, if not return a blank div (fixes bug if no image in random index requested)
    const collagePix = pix.map((pixSrc, index) => {
        if (pixSrc && pixSrc.id) {
            return <CollageElement key={index} pix={pixSrc} />
        } else {
            return <EmptycollageElement/>
        }
    });
    return (
        <div className={sizeClass}>
            {collagePix}
        </div>
    );
};

export default Collage;

