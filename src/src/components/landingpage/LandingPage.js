import React from "react";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="MainContainer Clearfix">
    <div className="Image Clearfix">
    </div>
    <div className="Container Clearfix">
      <div className="InnerContainer">
        <div className="InfoBox">
          <div className="LogoBox">
            <h1>itemizr</h1>
          </div>
          <div className="TopContentBox">
            <h2>Finders Keepers, Losers Weepers</h2>
            <p>Itemizer is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies.</p>
          </div>
        </div>
        <div className="BottomContentBox">
          <div className="Routes">
            <img src="../../images/video.png">Demo
            <img src="../../images/info.png">About Us
            <img src="../../images/share.png">Share        
          </div>
          <div className="CTAbuttons">
            <ul className="UserButtons">
              <li>Call to action 1</li>
              <li>Call to action 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
