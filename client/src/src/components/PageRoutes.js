import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import "./navbarmedia.css";
import "../src/pages/landingpage/mediastyle.css";

const PageRoutes = () =>
    <ul className="nav nav-tabs">
        <li className={window.location.pathname === "/" ? "active" : ""}>
        <Link to="/">Landing Page</Link>
        </li>
        <li className={window.location.pathname === "/home" ? "active" : ""}>
        <Link to="/home">Home</Link>
        </li>

    </ul>;




export default PageRoutes;
