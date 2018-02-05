import React from "react";
export const MediaBody = props =>
  <div className="media-body">
  	<a href = {props.article.web_url} target="_blank">
    	<h4 className = "media-heading">{props.article.headline.main}</h4>
    	<div className = "date">{props.article.pub_date ? (props.article.pub_date.slice(0,10)) : ("")}</div>
    	{props.article.snippet}
    </a>
  </div>;