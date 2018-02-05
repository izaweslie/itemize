import React from "react";
import "./Card.css";

const Card = props => (
	<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
		{props.children}
	</div>
);

export default Card;