import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
      box: {}
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      topRow: clarifaiFace.top_row,
      leftcol: clarifaiFace.left_col,
      bottmRow: clarifaiFace.bottom_row,
      right_col: clarifaiFace.right_col,
    }
  }

  onInputchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => console.log(this.calculateFaceLocation(response)))
      .then(box => console.log(box))
      .catch(err => console.log(err));
  }

  render() {
    const { imageURL } = this.state;
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputchange={this.onInputchange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={imageURL} />
      </div>
    );
  }
}

export default App;
