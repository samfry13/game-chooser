import React from 'react';
import '../style/App.css';
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(['SelectAGame-SessionID']);
  let loggedIn = false;
  if (cookies['SelectAGame-SessionID'] === 'SomeValidSessionID') {
      loggedIn = true;
  }
  return (
    <div className="main">
      <NavBar loggedIn={loggedIn} setCookie={setCookie}/>
      {!loggedIn ? <LandingPage/> : <HomePage/>}
    </div>
  );
}

export default App;
