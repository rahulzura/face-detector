import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className=''>
        {'This magic brain will detect faces in the pictures whose url you paste below. Give it a try!'}
      </p>
      <div className=''>
        <div className=''>
          <input 
            className='' 
            type='text' 
            onChange={onInputChange}
          />
          <button 
            className=''
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;