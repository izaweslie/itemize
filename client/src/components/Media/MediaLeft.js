import React from "react";
export const MediaLeft = props =>
  <div className="media-left">
  	<a href = {props.article.web_url} target="_blank">
  		<img className = "media-object" src = {props.article.multimedia.length > 3 ? ("http://www.nytimes.com/" + props.article.multimedia[2].url ) : ("http://via.placeholder.com/75x75")} />
  	</a>
  </div>;