import React from "react";
import "./Panel.css";

export const PanelTitle = ({children}) =>
  <div className="panel-heading gray">
    {children}
  </div>;