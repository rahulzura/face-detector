import React from 'react';

import {apiUrl} from '../../constants';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  onSubmitSignIn = async (event) => {
    event.preventDefault();
    const res = await fetch(`${apiUrl}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })

    const user = await res.json();
    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    }
  }

  render() {
    return (
    <>
      <form className="form-standard">
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              name="name"  
              id="name" 
              onChange={this.onNameChange}
            />
        </div>
        <div className="input-group">
            <label htmlFor="email-address">Email</label>
            <input 
                
              type="email" 
              name="email-address"  
              id="email-address" 
              onChange={this.onEmailChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input     
              type="password" 
              name="password"  
              id="password" 
              onChange={this.onPasswordChange}
            />
          </div>
          <div>
          <input 
            className="form-submit-btn"
            onClick={this.onSubmitSignIn}
            type="submit" 
            value="Register" 
          />
        </div>
      </form>
    </>
    );
  }
}

export default Register;