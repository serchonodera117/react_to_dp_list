import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import defaultUserImage from '../images/default_userimg.png';
import '../styles/app.css';
import '../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

function Login({onLogin, onToast}){
    const [savePass, setPassSaved] = useState(false);
    const [logData, setLogData] = useState("");
    const [objSingIn, setSingIn] = useState({username: "", password: "", image: ""});
    const [objLogIn, setLogIn] = useState({username: "", password: ""});
    const [messageLogin, setMessageLogin] = useState("");
    const [nameFile, setNameFile] = useState("");
    const [btn_status, setBtnStatus] = useState({input1: true, input2: true});
    const [isLoading, setIsLoading] = useState(false);
    const [btnLoginStatus, setBtnLoginStatus] = useState(true);

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
            setLogIn(dataLogin!==null? obj =>({
                ...obj,
                 username:dataLogin.username,
                  password:dataLogin.paswd
                }) : obj=>({...obj,
                username:dataLogin.username,
                 password:dataLogin.paswd
               }))
            setPassSaved(mypass!==null? mypass : false)
        }
        setSingIn({
            username:'',
            password:'',
            image: defaultUserImage
        })

        setNameFile("Photo.(jpg/png/webp/gif)")
    },[])
//LOGIN
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
    
    function requestLogin(){
        let user= objLogIn.username;
        let password= objLogIn.password;
        let url = `https://myfavnime.000webhostapp.com/todo_list/login.php?nickname=${user}&passwd=${password}` 
      
        Axios.get(url).then(resp=>{
            if(resp.data.status == 200 && resp.data.query == 'success'){
                let userData = resp.data.userdata[0]
                activateToast(resp.data.message)
                
                localStorage.setItem('userdata', JSON.stringify(userData));
                startLogin();

            }else if(resp.data.status == 200 && resp.data.query == 'no'){
                activateToast(resp.data.message)
            }
            else{
                activateToast("Un error inesperado ha ocurrido, lo sentimos, estamos trabajando en ello :(")
            }
        })
    }
    function activateToast(responseMessage){
        onToast(responseMessage);
    }
    function checkForSavePass(){
        let state = !savePass
        setPassSaved(state)

    }

    function onPhotoSelected(event){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () =>{
            let resltedImg = reader.result;
            setSingIn(obj =>({...obj ,image: resltedImg}))
             let photoName = event.target.files[0].name
            setNameFile(photoName)
        }
    }

//POST--------------------------------------------------------------------------------------------------------------
    function addUser(){
        setIsLoading(true)
        let url = "https://myfavnime.000webhostapp.com/todo_list/register.php"
        let data ={
            'userName': objSingIn.username,
            'password': objSingIn.password,
            'imgURL': objSingIn.image
        }
        
        Axios.post(url, JSON.stringify(data)).then(resp=>{
            if(resp.data.status == 200){
            let mesage  = resp.data.message
            setSingIn(obj =>({...obj , 
                username: '',
                password: '',
                image: defaultUserImage
            }))
             closeModal()
              setIsLoading(false)
              activateToast(mesage)
            }
        })
    }
    
//VALIDATIONS-----------------------------------------------------------------------------
    function closeModal(){
        let myModal =document.getElementById("close_modal")
        myModal.click()
    }
    function checkButton(thestring){
        let uN = thestring.trim(" ")
        if(uN.length > 0 ) setBtnStatus({input1:false})
        else setBtnStatus({input1:false})
    }
    function checkButton2(thestring){
        let uN = thestring.trim(" ")
        if(uN.length > 0 ) setBtnStatus({input2:false})
        else setBtnStatus({input2:false})
    }

     function changeUsername(e){
        const {username, value} = e.target;
        setSingIn(obj =>({...obj , username: value}))
        checkButton(value)
     }
     function changePass(e){
        const {password, value} = e.target;
        setSingIn((prev)=>({
            ...prev,
            password: value
        }))
        checkButton2(value)
     }

     function validateUsername(e){
        const {username, value} = e.target
        setLogIn(data => ({
            ...data,
            username: value
        }))
     }
     function validatePassword(e){
        const {password, value} = e.target
        setLogIn(data => ({
            ...data,
            password: value
        }))
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
                        <input id="input_username" type="text" onChange={validateUsername} className="form-control" placeholder="userName117" value={objLogIn.username}></input>
                        
                        <br></br>
                        
                        <label htmlFor="input_password" className="label-text font">Pasword</label>
                        <input id="input_password" onChange={validatePassword} type="password" className="form-control" placeholder="*******" value={objLogIn.password}></input>
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
                        <button className='btn btn-primary' onClick={requestLogin} disabled={(!objLogIn.password.toString().trim() || !objLogIn.username.toString().trim()) ?true:false}>
                        {
                            (!objLogIn.password.toString().trim() || !objLogIn.username.toString().trim())?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                            </svg>

                        }
                            Log in
                        </button>
                    </div>
                </div>
            </div>

  {/* MODAL REGISTRO DE USUARIOS  */}
            <div className="modal fade" id="modal-login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className=" modal-dialog">
                <div className="modal-content modal-color">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Sign in</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className='container-profile-img-signin'>
                                <img className='user-login-image' src={objSingIn.image} alt="userImage"></img>
                                <label htmlFor="input_userimg" className="btn-choseimg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                     <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                                     <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                    </svg>
                                </label>
                                <input id="input_userimg" onChange={onPhotoSelected} accept=".png, .jpg, .jpeg, .gif, .webp" className="hidden-checkbox" type='file'></input>
                                <br></br>
                                <label className='name-file'>{nameFile}</label>

                                <br></br>
                                <label htmlFor="input_set_username" className=" font">Username</label>
                                <input id="input__set_username" onChange={changeUsername} type="text" className="form-control" placeholder="userexample117" value={objSingIn.username}></input>
                                <br></br>
                                <label htmlFor="input_set_password" className=" font">Pasword</label>
                                <input id="input__set_password" onChange={changePass} type="password" className="form-control" placeholder="*******" value={objSingIn.password}></input>
                                <br></br>
                                    {isLoading? 
                                        <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: 100 +'%'}}></div>
                                      </div>
                                      : <div></div>
                                    }
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button id="close_modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addUser} disabled={btn_status.input1 && btn_status.input2} >
                            {(btn_status.input1 == true && btn_status.input2 == true)?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>:
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                          </svg>
                            }
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
            </div>     
        </div>
    );
}

export default  Login;