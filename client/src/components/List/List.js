import React from "react";
import "./List.css";

export const List = props => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
      	{props.children}
      </ul>
    </div>
  );
};
