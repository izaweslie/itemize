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


    // <div className="CTAbuttons">
    //     <ul className="UserButtons">
    //         <li id="Cta1">Call to action 1</li>
    //         <li id="Cta2"><Route exact path="/home" component={Home}/></li>
    //     </ul>
    // </div>

export default PageRoutes;
