import React from 'react';
import '../style/App.css';
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";

function App() {
  const [loggedIn, setLoggedIn] = React.useState();
  return (
    <div className="main">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {!loggedIn ? <LandingPage/> : <HomePage/>}
    </div>
  );
}

export default App;
