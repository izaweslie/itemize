import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/articles";
import NoMatch from "./pages/nomatch";
import {Nav, Footer} from "./components/Nav";
import Auth from './Auth/Auth.js';


const auth = new Auth();
auth.login();


const Home = () => (
    <Router>
    <div className = 'phantom'>
        <Nav />
        <Switch>
            <Route exact path="/" component={Articles} />
            <Route component={NoMatch} />
        </Switch>

    </div>
    </Router>
);

export default Home;
