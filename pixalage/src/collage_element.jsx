import React from 'react';
import './style/style.css';
const collageElement = (props) => {
    const theImage = props.pix;
    console.log(`colElement: ${theImage}`)
    return (
        <div className="image-container">
            <img src={theImage} />
        </div>
    )
};

export default collageElement;