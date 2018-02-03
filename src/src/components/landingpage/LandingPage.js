import React from "react";
import "./LandingPage.css";
import "./mediastyle.css";
import "./navbarmedia.css";

// showAlert() {
//   document.getElementById("Cta1").innerHTML = swal("This is where the sign up form goes!");
// }

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
            <p className="P">Itemizer is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies.</p>
          </div>
        </div>
        <div className="BottomContentBox">
          <div class="Routes">
            <img src="../../images/video.png"/>
            <img src="../../images/info.png"/>
            <img src="../../images/repository.png"/>
          </div>
          <div className="CTAbuttons">
            <ul className="UserButtons">
              <li id="Cta1" onClick={this.showAlert}>Call to action 1</li>
              <li id="Cta2">Call to action 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
