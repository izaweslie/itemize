import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import {Nav, Footer} from "./components/Nav";
import Auth from './Auth/Auth.js';

const auth = new Auth();
auth.login();


const App = () =>
<Router>
  <div className = 'phantom'>
	<Nav />
	<Switch>
		<Route exact path="/" component={Articles} />
		<Route component={NoMatch} />
	</Switch>

  </div>
</Router>;

export default App;
