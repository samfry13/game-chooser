import React from 'react';
import '../style/App.css';
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Routes from '../constants/paths';
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


function App() {
    let loggedIn = false;
    if (sessionStorage.UserId) {
        loggedIn = true;
    }

  return (
    <div className="main">
        <Router>
            <NavBar loggedIn={loggedIn}/>
            <Switch>
                { !loggedIn ? <Route exact path={Routes.home} render={() => <LandingPage/>}/>
                : <Route exact path={Routes.home} component={HomePage}/>}
                <Route path={Routes.profile} component={ProfilePage}/>
                <Route path={Routes.login} component={LoginPage}/>
                <Route path={Routes.register} component={RegisterPage}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
