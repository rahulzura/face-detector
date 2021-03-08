import React from 'react';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className=''>
        <div>
          <img style={{paddintTop: '5px'}} width='100px' alt='logo' src={brain} />
        </div>
    </div>
  );
}

export default Logo;