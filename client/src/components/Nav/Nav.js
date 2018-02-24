import React, { Component } from "react";
import Auth from '../Auth/Auth';
import "./Nav.css";
import logo from './logo.png'
const auth = new Auth();

class Nav extends Component {
	// login() {
 //    	this.props.auth.login();
	// }

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light row justify-content-between">
				<div className ="col-md-4 col-6" id ="">
					<a className="navbar-brand" href="#" id ="logo-link"><img src={logo} className = 'logo d-inline-block align-top' /></a>
				</div>
				<div className ="col-4" id ="">
					<button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    		<span className="navbar-toggler-icon"></span>
			  		</button>
			  	</div>
				
			  	<div className ="col-lg-4" id ="">
			  		<div className="collapse navbar-collapse right" id="navbarSupportedContent">
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
			  	</div>
			</nav>
		)
	}
}

export default Nav;
