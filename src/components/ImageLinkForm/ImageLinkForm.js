import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className=''>
        {'Paste a url of an image to detect all the human faces in it.'}
      </p>
      <div className='input-group image-link-form-group'>
          <input 
            className='' 
            type='text' 
            onChange={onInputChange}
          />
          <button 
            className='image-link-form-btn'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
    </div>
  );
}

export default ImageLinkForm;