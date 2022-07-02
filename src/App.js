import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onInputchange = (event) => {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputchange={this.onInputchange} />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
