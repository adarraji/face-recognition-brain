import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Rigister/Register';

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onRouteChnage = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: height * clarifaiFace.top_row,
      leftcol: width * clarifaiFace.left_col,
      bottmRow: height - (height * clarifaiFace.bottom_row),
      rightCol: width - (width * clarifaiFace.right_col),
    }
  }

  displayfaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch(`${process.env.REACT_APP_SERVER}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${process.env.REACT_APP_SERVER}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(response => response.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log);
        }
        this.displayfaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    const { imageURL, box, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChnage={this.onRouteChnage} isSignedIn={isSignedIn} />
        {
          route === "home"
            ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm onInputchange={this.onInputchange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={imageURL} box={box} />
            </div>
            : (
              route === "signin"
                ? <SignIn onRouteChnage={this.onRouteChnage} isSignedIn={isSignedIn} loadUser={this.loadUser} />
                : <Register onRouteChnage={this.onRouteChnage} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
