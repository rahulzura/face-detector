import React from 'react';
import './FaceRecognition.css';
import BoundingBox from './BoundingBox/BoundingBox';

const FaceRecognition = ({ imageUrl, boxes }) => {
  console.log("boxes", boxes);
  return (
    <div>
      <div className="img-container">
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        <br />
        {
          boxes.length ?
          boxes.map((box, i) => <BoundingBox box={box} key={++i}/>) : 
            (imageUrl).trim() ? (<i>This image has no faces</i>) : null
        }
      </div>
    </div>
  );
}

export default FaceRecognition;