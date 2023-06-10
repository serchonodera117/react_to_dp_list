import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Home from './components/Home'
import './styles/app.css';

function App() {
  const [isLoged, setIsLogged] = useState(false);
  const [message, setMessage] = useState('Login');

//avoid resetting the session Log
  useEffect(() => {             
    let session = JSON.parse(localStorage.getItem('usersession'));
    let savedSession = (session==null) ? false : session;

    setIsLogged(savedSession)
  }, []);

  function changeState(){
    let logSatus = !isLoged;

    setIsLogged(logSatus);
    localStorage.setItem('usersession', logSatus)
  }

  return (
    <div className="bodyContainer backgroundContainer">
      { (isLoged == true) ? <Home onLogout={changeState}/> :
       <Login onLogin={changeState}/>}
    </div>
  );
}


export default App;
