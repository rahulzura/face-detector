import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import './form.css';

import {apiUrl} from './constants';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  message: '',
  user: {
    name: '',
    password: '',
    email: '',
    entries: 0,
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      message: '',
      user: {
        name: '',
        password: '',
        email: '',
        entries: 0,
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        name: data.name,
        email: data.email,
        entries: data.imageCount,
      }
    })
  }

  showMessage = (message) => {
    this.setState({
      message
    })
  }

  calculateFaceBoxes = (data) => {
    const boxes = [];
    const {regions} = data.outputs[0].data;
    if (!regions) return []; // When there are no images detected
    for (let i = 0; i < regions.length; ++i) {
      const clarifaiFace = regions[i].region_info.bounding_box;
      const image = document.querySelector('#inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      const box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
      boxes.push(box);
    }
    return boxes;
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = async () => {
    this.setState({imageUrl: this.state.input});
    const reqBody = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input: this.state.input })
    };
    const res = await fetch(`${apiUrl}/imageurl`, reqBody);
    const resData = await res.json();
    if (resData) {
      const boxes = this.calculateFaceBoxes(resData);
      this.setState({boxes});
      const reqBody = {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.user.email
        })
      };
      const res = await fetch(`${apiUrl}/image`, reqBody);
      const count = await res.json();
      this.setState(Object.assign(this.state.user, {entries: count}));
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      <main className="content">
      <h3>{this.state.message}</h3>
        { route === 'home' 
          ? <div> 
              <Logo />
              <p>Your image count is {this.state.user.entries}</p>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} showMessage={this.showMessage}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
        </main>
      </div>
    );
  }
}

export default App;