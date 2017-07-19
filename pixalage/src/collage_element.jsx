import React from 'react';
import './style/style.css';
const collageElement = (props) => {
    const theImage = props.pix;
    return (
        <div className="image-container">
            <a href={theImage.pageURL} target="_blank" rel="noopener noreferrer">
                <img  alt={theImage.user_id} src={theImage.webformatURL} />
            </a>
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