import React, { Component } from 'react';
import './App.css';
import LandingPage from "./components/landingpage/LandingPage.js";
import RouteImgs from "./components/images/RouteImgs.js"


class App extends Component {
  render() {
    return (
      <div>
        <div>
          <LandingPage/>
        </div>
      </div>
    );
  }
}

export default App;
