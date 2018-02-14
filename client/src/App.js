import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import {Nav, Footer} from "./components/Nav";
import Callback from './components/Auth/Callback/Callback';
import Auth from './components/Auth/Auth';
import history from './components/Auth/History';
import AppT from "./App2";

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


const App = () =>
<Router history={history}>
  <div className = 'phantom'>
	<Nav />

		<Route path="/" render={(props) => <AppT auth={auth} {...props} />} />
		<Route path="/home" render={(props) => <Articles auth={auth} {...props} />} />
		<Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
        }}/>
		

  </div>
</Router>;

export default App;
