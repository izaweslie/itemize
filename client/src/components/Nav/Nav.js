import React, { Component } from "react";
import Auth from '../Auth/Auth';
import "./Nav.css";
const auth = new Auth();

class Nav extends Component {
	// login() {
 //    	this.props.auth.login();
	// }

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#"><h1>ITEMIZE</h1></a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    		<span className="navbar-toggler-icon"></span>
		  		</button>

		  		<div className="collapse navbar-collapse" id="navbarSupportedContent">
		  			<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="#">About </a>
						</li>
						{
							(auth.isAuthenticated()) ? (
								<li className="nav-item">
									<a className="nav-link" href="#"  onClick={ ()=> auth.logout()}><span className="glyphicon glyphicon-log-out"></span>Logout </a>
								</li>
							) : (
								<li className="nav-item">
									<a className="nav-link" href="#" onClick={ ()=> auth.login()}>Join </a>
								</li>

							)
						}
						
						
					</ul>
		  		</div>
			</nav>
		)
	}
}

export default Nav;
