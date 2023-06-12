import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/app.css';
import '../styles/home.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({onLogout}){
    const [userData, setUserData] = useState({id_user:'', username:'', user_img:'', password:'',});
    const [visitedDate, setVisitedDate] = useState('')
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userdata'))
        if(data!==null){
            setUserData(e =>({...e, 
            id_user:data.id_user,
            username: data.username,
            user_img: data.user_img,
            password: data.password,
            }));

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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
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
                    <div className="card-list">
                        assasaa
                    </div>
                </div>
            </div>
        </div>
    );
}

export default  Home;