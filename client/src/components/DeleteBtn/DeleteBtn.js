import React from "react";
import "./DeleteBtn.css";

const DeleteBtn = props => (
  <span className="delete-btn col-md-1 col-sm-2 col-xs-3 text-center" {...props}>
    ✗
  </span>
);

export default DeleteBtn;
