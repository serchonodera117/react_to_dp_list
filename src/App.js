import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import logo from './logo.svg';
import Home from './components/Home'

import './styles/app.css';

function App() {
  const [isLoged, setIsLogged] = useState(false);
  const [message, setMessage] = useState('Login');
  const [isToastActive, setToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [dateToast, setDateToast] = useState('');

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

  function displayToast(recivedMessage){
    let date = new Date();
  
    let formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`; 

    setDateToast(formatDate)
    setMessageToast(recivedMessage)
    setToast(true)
  }
  function closeToast(){
    setMessageToast("")
    setToast(false)
  }

  return (
    <div className="bodyContainer backgroundContainer">
      { (isLoged == true) ? <Home onLogout={changeState}/> :
       <Login onLogin={changeState} onToast={displayToast}/>}


       
  {isToastActive?
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
              <img src={logo} className="rounded me-2 img-toast" alt="..."></img>
              <strong className="me-auto">Message: </strong>
              <small>{dateToast}</small>
              <button type="button" className="btn-close" onClick={closeToast}></button>
          </div>
          <div className="toast-body">
            {messageToast}
          </div>
          </div>
        : <div></div>
      }
      </div>
  );
}


export default App;
