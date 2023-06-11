import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/app.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({onLogout}){
    const [userData, setUserData] = useState({id_user:'', username:'', password:'',});

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userdata'))
        if(data!==null){
            setUserData(e =>({...e, 
            id_user:data.id_user,
            username: data.username,
            password: data.password,
            }));

            // setTimeout(()=>{
            //     getData(data.username, data.id_nickname);
            // },500)
        } 
    },[])


    function getData(nickname, id_nickname){
        let url = `https://myfavnime.000webhostapp.com/todo_list/login.php?nickname=${nickname}&${id_nickname}=passwd` 
        // Axios.get(url).then((response)=>{

        // })
    }
    function closeSession() {
        onLogout();
    }
    function a (){console.log(userData)}
    return (
        <div>
            <p>home</p>
            <button onClick={a}>Log out</button>
        </div>
    );
}

export default  Home;