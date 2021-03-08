import React from 'react';
import {apiUrl} from '../../constants';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = async (event) => {
    event.preventDefault();
    const res = await fetch(`${apiUrl}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    });

    const user = await res.json();
    console.log(user)
    if (user.email) {
      console.log("logged in")
      this.props.loadUser(user);
      this.props.showMessage("")
      this.props.onRouteChange('home');
    } else {
      this.props.showMessage("Invalid Login/Password")
    }
  }

  render() {
    const { onRouteChange } = this.props;
    return (
    <main>
      <form>
        <legend>Sign In</legend>
        <div>
          <label htmlFor="email-address">Email</label>
          <input 
            onChange={this.onEmailChange} 
            type="email" 
            name="email-address"  
            id="email-address" 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            onChange={this.onPasswordChange} 
            type="password" 
            name="password"  
            id="password" 
          />
        </div>
        <div>
          <input 
            onClick={this.onSubmitSignIn}
            type="submit" 
            value="Sign in" 
          />
        </div>
      </form>
    </main>

    );
  }
}

export default SignIn;