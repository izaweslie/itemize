import React from "react";
import "./Nav.css";

export const Nav = () =>
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
				<li className="nav-item">
					<a className="nav-link" href="#">Join </a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#"><span className="glyphicon glyphicon-log-out"></span>Logout </a>
				</li>
			</ul>
  		</div>
	</nav>;
