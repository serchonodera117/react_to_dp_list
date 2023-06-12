import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/app.css';
import logo from '../logo.svg';
import '../styles/home.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';

function Home({onLogout}){
    const [userData, setUserData] = useState({id_user:'', username:'', user_img:'', password:'',});
    const [visitedDate, setVisitedDate] = useState('')
    const [arrayPeticiones, setArrayPeticiones] = useState([])

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userdata'))
        if(data!==null){
            setUserData(e =>({...e, 
            id_user:data.id_user,
            username: data.username,
            user_img: data.user_img,
            password: data.password,
            }));
            setArrayPeticiones([1,2,3,4,5,6,7])
            // setTimeout(()=>{
            //     getData(data.username, data.id_nickname);
            // },500)
        } 
        setDate()
    },[])


    function getData(nickname, id_nickname){
        let url = `https://myfavnime.000webhostapp.com/todo_list/login.php?nickname=${nickname}&${id_nickname}=passwd` 
        // Axios.get(url).then((response)=>{

        // })
    }

    function closeSession() {
        localStorage.removeItem('userdata')
        onLogout();
    }

    function setDate(){
        let d = new Date();
        let month = ["junary", "febrary", "march", "april", "may", "jun", "july", "august", "september", "october", "november", "december"]
        let weekDay = ["sunday", "monday", "tuesday", "wenesday", "thursday","sunday"]
        let formatedDate = `${weekDay[d.getDay()]} ${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`
        setVisitedDate(formatedDate);
    }

    return (
        <div className="container-home">
            <div className="user-info-container  text-centered">
                <button className="exit-btn" onClick={closeSession}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                </svg>
                    Exit
                </button>
                <img className='user-img' alt="user_pic.png" src={userData.user_img}></img>
                <br></br>
                <label className='title font color-username'>{userData.username}</label>
            </div>
            <div className="card-container">
                <div className="card-header">
                    <div className="text-centered title font date-header">
                        <label className='date-header'>{visitedDate}</label>
                    </div>
                </div>
                <div className="card-body">
                    {arrayPeticiones.map((element,index)=>(
                               <div className="card-list" key={index}>
                               <div className="data-name-container">
                                   <span>Fecha</span><br></br>
                                   <span>Nombre tarea</span>
                               </div>
                               <div className='container-options'>
                                   <img  className='icon-react' src={logo}></img>
                                   
                                   <button className='btn-option'>
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                       <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                   </svg>
                                   </button>
                                   <br></br>
                                   <button className='btn-option'>
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                   <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                   </svg>
                                   </button>
                               </div> 
                           </div>
                        )
                    )}
                </div>
                <button className='btn-plus'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default  Home;