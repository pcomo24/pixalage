import React from 'react';
import './style/style.css';
const collageElement = (props) => {
    const theImage = props.pix;
    console.log(`colElement: ${theImage}`)
    return (
        <div className="image-container">
            <img  alt={theImage.user_id} src={theImage.webformatURL} />
        </div>
    )
};

export const EmptycollageElement = (props) => {
    return (
        <div className="empty image-container">

        </div>
    )
};

export default collageElement;