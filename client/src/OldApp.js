import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import {Nav, Footer} from "./components/Nav";
import Callback from './components/Auth/Callback';
import Auth from './components/Auth/Auth';
import history from './components/Auth/history';
import AppT from "./App2";

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


const App = () =>
<Router  history={history}>
  <div className = 'phantom'>
	<Nav />
	<Switch>
		<Route exact path="/" component={Articles} />
		<Route component={NoMatch} />
	</Switch>

  </div>
</Router>;

export default App;
