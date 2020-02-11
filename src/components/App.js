import React from 'react';
import '../style/App.css';
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Routes from '../constants/paths';


function App() {
  const [cookies, setCookie] = useCookies(['SessionID']);
  let loggedIn = false;
  if (cookies['SessionID'] === 'SomeValidSessionID') {
      loggedIn = true;
  }
  return (
    <div className="main">
        <Router>
            <NavBar loggedIn={loggedIn} setCookie={setCookie}/>
            <Switch>
                { !loggedIn ? <Route exact path={Routes.home} component={LandingPage}/> : <Route exact path={Routes.home} component={HomePage}/>}
                <Route path={Routes.profile} component={ProfilePage}/>
            </Switch>
        </Router>

    </div>
  );
}

export default App;
