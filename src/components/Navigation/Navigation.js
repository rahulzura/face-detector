import React from 'react';
import './Navigation.css';
const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button onClick={() => onRouteChange('signout')} className=''>Sign Out</button>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button onClick={() => onRouteChange('signin')} className=''>Sign In</button>
          <button onClick={() => onRouteChange('register')} className=''>Register</button>
        </nav>
      );
    }
}

export default Navigation;