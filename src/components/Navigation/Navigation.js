import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if(isSignedIn) {
    return (
      <nav className="nav-container sticky">
        <ul className="nav">
          <li className="nav__item">
            <a href="" onClick={() => onRouteChange('signout')} aria-label="Sign out">Sign out</a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="nav-container sticky">
        <ul className="nav">
          <li className="nav__item">
            <a href="" onClick={(event) => {
              event.preventDefault();
              onRouteChange('signin');
              }} aria-label="Sign in">Sign In</a>
          </li>
          <li className="nav__item">
            <a href="" onClick={(event) => {
              event.preventDefault();
              onRouteChange('register')
              }} aria-label="Register">Register</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;