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
            <h1>itemize</h1>
          </div>
          <div className="TopContentBox">
            <h2>Finders Keepers, Losers Weepers</h2>
            <p>Itemize is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies.</p>
          </div>
        </div>
        <div className="BottomContentBox">
          <div className="Routes">
            <p>Here is where the Routes go</p>
          </div>
          <div className="CTAbuttons">
            <button>Call to Action 1</button>
            <button>Call to Action 2</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
