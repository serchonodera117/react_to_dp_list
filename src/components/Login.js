import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/app.css';
import '../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

function Login({onLogin}){
    const [savePass, setPassSaved] = useState(false);
    const [logData, setLogData] = useState("");

    useEffect(()=>{
        let mypass = JSON.parse(localStorage.getItem('checkBox'))
        let dataLogin = JSON.parse(localStorage.getItem('loginUser'));

        let obj = {
            username:'',
            paswd:'',
        }
        if(dataLogin!==null && mypass!==null){
            document.getElementById('input_username').value = dataLogin.username
            document.getElementById('input_password').value = dataLogin.paswd
            document.getElementById('input_keep_logged').checked = mypass
            setLogData(dataLogin!==null? dataLogin : obj)
            setPassSaved(mypass!==null? mypass : false)
        }


    },[])

    function startLogin(){
        let obj = {
            username: document.getElementById('input_username').value,
            paswd:  document.getElementById('input_password').value,
        }
        let checkBox = document.getElementById('input_keep_logged').checked

        if(savePass){
           localStorage.setItem('loginUser', JSON.stringify(obj))
           localStorage.setItem('checkBox', checkBox)
        }else{
            obj.username = ''
            obj.paswd = ''
            checkBox = false
           localStorage.setItem('loginUser', JSON.stringify(obj))
           localStorage.setItem('checkBox', checkBox)
       }

        onLogin();
    }

    function checkForSavePass(){
        let state = !savePass
        setPassSaved(state)

    }

    return (
        <div className='bodyContainer'>
            <div className="form-container">
                <div className="col-left">
                    <img className="login-img" src={require('../images/login_column.png')} alt="LoginImage"/>
                </div>
                <div className="col-right">
                    <h1 className="title font text-centered">To do List</h1>
                    <hr></hr><br></br>
                    <form className="formulary-login">
                        <label htmlFor="input_username" className="label-text font">Username</label>
                        <input id="input_username" type="text" className="form-control" placeholder="userName117"></input>
                        
                        <br></br>
                        
                        <label htmlFor="input_password" className="label-text font">Pasword</label>
                        <input id="input_password" type="password" className="form-control" placeholder="*******"></input>
                        <br></br>
                        
                        <label className='btn-label' htmlFor="input_keep_logged" onClick={checkForSavePass}>
                            {savePass ?
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                                <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                            </svg>
                            : 
                             <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-slash" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.093 3.093c-.465 4.275.885 7.46 2.513 9.589a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.32 11.32 0 0 0 1.733-1.525l-.745-.745a10.27 10.27 0 0 1-1.578 1.392c-.346.244-.652.42-.893.533-.12.057-.218.095-.293.118a.55.55 0 0 1-.101.025.615.615 0 0 1-.1-.025 2.348 2.348 0 0 1-.294-.118 6.141 6.141 0 0 1-.893-.533 10.725 10.725 0 0 1-2.287-2.233C3.053 10.228 1.879 7.594 2.06 4.06l-.967-.967zM3.98 1.98l-.852-.852A58.935 58.935 0 0 1 5.072.559C6.157.266 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.483 3.626-.332 6.491-1.551 8.616l-.77-.77c1.042-1.915 1.72-4.469 1.29-7.702a.48.48 0 0 0-.33-.39c-.65-.213-1.75-.56-2.836-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524a49.7 49.7 0 0 0-1.357.39zm9.666 12.374-13-13 .708-.708 13 13-.707.707z"/>
                             </svg>
                            }
                        </label>
                        <p>{savePass? 'Saved  Password':'Save password?'}</p>

                        <input id="input_keep_logged" className='hidden-checkbox' type="checkbox"></input>

                    </form>
                    <hr></hr>
                    <div className="footer-btn">
                        <button className='btn btn-success'data-bs-toggle="modal" 
                        data-bs-target="#modal-login">
                            Create Account
                            </button>
                        <button className='btn btn-primary' onClick={startLogin}>Log in</button>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="modal-login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default  Login;