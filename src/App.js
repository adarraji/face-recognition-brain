import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Rigister/Register';
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: `${process.env.REACT_APP_API_KEY}`
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  onRouteChnage = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
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
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .then(box => this.displayfaceBox(box))
      .catch(err => console.log(err));
  }

  render() {
    const { imageURL, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChnage={this.onRouteChnage} isSignedIn={isSignedIn} />
        {
          route === "home"
            ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputchange={this.onInputchange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={imageURL} box={box} />
            </div>
            : (
              route === "signin"
                ? <SignIn onRouteChnage={this.onRouteChnage} isSignedIn={isSignedIn} />
                : <Register onRouteChnage={this.onRouteChnage} />
            )
        }
      </div>
    );
  }
}

export default App;
