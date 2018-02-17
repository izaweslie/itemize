import React, { Component } from 'react';
import "./LandingPage.css";

class LandingPage extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
            <button 
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </button>
            {
              !isAuthenticated() && (
                <div>
                  <button
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                  <div className="MainContainer Clearfix">
                    <div className="Image Clearfix">
                    </div>
                    <div className="Container Clearfix">
                      <div className="InnerContainer">
                        <div className="InfoBox">
                          <div className="LogoBox">
                            <h1 className="Logo">itemizr</h1>
                          </div>
                          <div className="TopContentBox">
                            <h2 className="Description">Finders Keepers, Losers Weepers</h2>
                            <p className="P">Itemizr is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies.</p>
                          </div>
                        </div>
                        <div className="BottomContentBox">
                          <div className="Routes">
                            <img src="./images/video.png" alt="demo video"/>
                            <img src="./images/info.png" alt="info"/>
                            <img src="./images/repository.png" alt="github"/>
                          </div>
                          <div className="CTAbuttons">
                            <ul className="UserButtons">
                              <li id="Cta1"><a href="/">Future Sign Up</a></li>
                              <li id="Cta2"><a href="/home">Start Itemizing</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )
            }
            {
              isAuthenticated() && (
                  <button
                    id="qsLogoutBtn"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }
      </div>
    );
  }
}

export default LandingPage;
