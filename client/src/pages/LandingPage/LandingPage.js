import React, { Component } from 'react';
import "./LandingPage.css";
import Nav from "../../components/Nav";

class LandingPage extends Component {

  goTo(route) {
	this.props.history.replace(`/${route}`)
  }

  // login() {
  //   this.props.auth.login();
  // }

  logout() {
	this.props.auth.logout();
  }

  render() {
	const { isAuthenticated } = this.props.auth;

	return (
	  <div>
		<Nav />
			{
			  !isAuthenticated() && (
				<div>
				  <div className="MainContainer Clearfix">
					<div className="Image Clearfix">
					</div>
					<div className="Container Clearfix">
					  <div className="InnerContainer">
						<div className="InfoBox">
						  <div className="LogoBox">
							<h1 className="Logo"></h1>
						  </div>
						  <div className="TopContentBox">
							<h2 className="Description">Finders Keepers, Losers Weepers</h2>
							<p className="P">Itemizr is an inventory application to support the cataloging of items in your home, condo, apartment, storage, etc. for purposes such as, but not limited to: organization, item location search-ability, and insurance claims using barcode and QR technologies.</p>
						  </div>
						</div>
						<div className="BottomContentBox">
						  
						</div>
					  </div>
					</div>
				  </div>
				</div>
				)
			}
	  </div>
	);
  }
}

export default LandingPage;
