import React, { Component } from 'react';
import LandingPage from "./pages/landingpage/LandingPage.js";
import Home from "./pages/home/Home.js";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          {/* <LandingPage/> */}
        </div>
      </div>
    );
  }
}

export default App;
