import React from 'react';

const collageElement = (props) => {
    const theImage = props.pix;
    console.log(`colElement: ${theImage}`)
    return <img src={theImage} />
};

export default collageElement;