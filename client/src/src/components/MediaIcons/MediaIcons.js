import React from "react";
import "./MediaIcons.css";


function MediaIcons(props) {
    return (         
        <img className="MediaIcons"
        src={props}
        />
    );
};


export default MediaIcons;
const LandingPage = () => (
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
              <div className="VideoIcon"></div>
              <img src="../../images/info.png"/>
              <img src="../../images/repository.png"/>
            </div>
            <div className="CTAbuttons">
              <ul className="UserButtons">
                <li id="Cta1" onClick={showAlert()}>Call to action 1</li>
                <li id="Cta2">Call to action 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default LandingPage;