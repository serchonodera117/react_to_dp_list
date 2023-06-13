import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/app.css';
import logo from '../logo.svg';
import '../styles/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button } from 'bootstrap';

function Home({onLogout, onToast}){
    const [userData, setUserData] = useState({id_user:'', username:'', user_img:'', password:'',});
    const [visitedDate, setVisitedDate] = useState('')
    const [arrayPeticiones, setArrayPeticiones] = useState([])
    const [modalTitle, setModalTitle] = useState('')
    const [httpRequestCode, setHttpRequestCode] = useState('')
    const [textbutton, setTextButton] = useState('')
    const [id_task, setIdTask] = useState('x')
    const [taskInfo, setTaskInfo] = useState({
        task_name:'',
        description:'',
        current_date:'',
        limit_date:''})

    useEffect(()=>{
        setModalTitle("Add new task")
        setHttpRequestCode('add')
        setTextButton('Add')
        setIdTask('x')
        let data = JSON.parse(localStorage.getItem('userdata'))
        if(data!==null){
            setUserData(e =>({...e, 
            id_user:data.id_user,
            username: data.username,
            user_img: data.user_img,
            password: data.password,
            }));
             getData(data.id_user);
        } 
        setDate()
    },[])


    function getData(id_nickname){
        let url = `https://myfavnime.000webhostapp.com/todo_list/task_list.php?id_user=${id_nickname}` 
        Axios.get(url).then((response)=>{
            if(response.data.status == 200){
                let tasks = response.data.tasks.reverse();
                setArrayPeticiones(tasks)
                if(tasks.length <1){
                    setOnToast(response.data.message)
                }
            }
            
        })
    }

    function closeSession() {
        localStorage.removeItem('userdata')
        onLogout();
    }
    function setOnToast(message) {
        onToast(message)
    }
    function setDate(){
        let d = new Date();
        let month = ["junary", "febrary", "march", "april", "may", "jun", "july", "august", "september", "october", "november", "december"]
        let weekDay = ["sunday", "monday", "tuesday", "wenesday", "thursday","sunday"]
        let formatedDate = `${weekDay[d.getDay()]} ${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`
        setVisitedDate(formatedDate);
    }

    //CHANGE INFO
    function addName(e) {
        let {name, value} = e.target;
        setTaskInfo(task =>({...task, task_name: value}))
    }
    function addDescription(e) {
        let {descrpition, value} = e.target;
        setTaskInfo(task =>({...task, description: value}))
    }
    function addLimitDate(e) {
        let {lDate, value} = e.target;
        setTaskInfo(task =>({...task, limit_date: value}))
    }

    function changeModalTitle(Title, obj){
        if(obj.type == "add"){
            setHttpRequestCode('add')
            setModalTitle(Title)
            setTextButton('Add')
            setTaskInfo(task =>({...task, 
                task_name: '',
                description: '',
                limit_date:''
            }))
        }else if(obj.type=="edit"){
            setModalTitle(Title)
            setTextButton('Edit')
            setIdTask(obj.id_task)
            setHttpRequestCode('edit')

            setTaskInfo(task =>({...task, 
                task_name: obj.task_name,
                description: obj.description,
                limit_date: obj.limit_date
            }))
        }else if(obj.type='delete'){
            setHttpRequestCode('delete')
        }
    }
    // HTTP REQUESTS
     function addTask(){
        let url = `https://myfavnime.000webhostapp.com/todo_list/tasks.php`
        let current_date = new Date();
        let close_button = document.getElementById('close_btn')
        let data = {
            code: httpRequestCode,
            id_task: id_task,
            id_usuario: userData.id_user,
            task_name: taskInfo.task_name,
            description: taskInfo.description,
            current_date: current_date.getFullYear()+'-'+(current_date.getMonth()+1)+'-'+current_date.getDate()  +" "+current_date.getHours() +":"+ current_date.getMinutes(),
            limit_date: taskInfo.limit_date,
        }

        Axios.post(url, JSON.stringify(data)).then((response) =>{
            if(response.data.status == 200){
                close_button.click()
                setTimeout(()=>{
                    setOnToast(response.data.message)
                    setTaskInfo(obj =>({
                        ...obj,
                        task_name:'',
                        description:'',
                        current_date:'',
                        limit_date:''
                    }))
                },500)
                setTimeout(()=>{
                    getData(userData.id_user)
                },700)
            }
        })
     }

     function deleteTask(id){
        let url = `https://myfavnime.000webhostapp.com/todo_list/tasks.php`
        let data ={
            code: httpRequestCode,
            id_task: id
        }
       Axios.post(url, JSON.stringify(data)).then((response) =>{
          if(response.data.status == 200){
            setOnToast(response.data.message)
            setTimeout(()=>{
                getData(userData.id_user)
            },700)
          }
       })

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
                <label className='title font color-username'>{userData.username}</label> <br></br>
                <small className='number-tasks'>{arrayPeticiones.length} tasks</small>
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
                                   <span>{element.date_published}</span><br></br>
                                   <span className="task-name">{element.task_name}</span>
                               </div>
                               <div className="description-container">
                                   <span>Limit: {element.limit_date}</span><br></br>
                                   <span className="description">{element.description}</span>
                               </div>
                               <div className='container-options'>
                                   <img  className='icon-react' src={logo}></img>
                                   
                                   <label htmlFor="check-modal" onClick={() => (changeModalTitle("Edit task", {
                                    type: 'edit', 
                                    id_task: element.id_task,
                                    task_name: element.task_name,
                                    description: element.description,
                                    limit_date: element.limit_date
                                    }))} className='btn-option'>
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                       <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                   </svg>
                                   </label>
                                   <br></br>
                                   <label htmlFor={"task-"+element.id_task} onClick={()=>(changeModalTitle("delete",{type:"delete"}))} className='btn-option btn-delete'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                        </svg>
                                   </label>
                                   <label htmlFor={"task-"+element.id_task} className='confirm-deletion' onClick={() =>(deleteTask(element.id_task))}>
                                        Confirm Delete
                                   </label>
                                   <input id={"task-"+element.id_task} className='hidden-checkbox check-delete' type="checkbox"></input>
                               </div> 
                           </div>
                        )
                    )}
                </div>
            </div>

            <div className="modal-container">
                <label htmlFor="check-modal" onClick={()=> changeModalTitle("Add new task", {type:'add'})} className='btn-plus'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </label>
                <input id="check-modal" type="checkbox" className="hidden-checkbox"></input>

                <div className="modal" id="modal-add" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className=" modal-dialog">
                    <div className="modal-content modal-color">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{modalTitle}</h1>
                            <label type="button" id="close_btn" htmlFor='check-modal' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></label>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="input_taskname" className="font" >Task Name</label>
                            <input id="input_taskname" onChange={addName} maxlength="50" type="text" className="form-control" 
                            placeholder="Task one" value={taskInfo.task_name}></input>
                            <label className="indicator-char">{taskInfo.task_name.length}/50  {
                            taskInfo.task_name.length>=50? <small className="alert">You can't write more than 50 characters</small>:""
                            }
                            </label>
                            <br></br>
                            <label htmlFor="input_description" className=" font" >Description</label>
                            <textarea id="input_description"  type="text" maxlength="500" value={taskInfo.description}
                            className="form-control" onChange={addDescription}  placeholder="This is the task one">
                            </textarea>
                                <label className="indicator-char">{taskInfo.description.length}/500
                                   {
                                    taskInfo.description.length>=500 ? <small className="alert">You can't write more than 500 characters</small>:""
                                     }
                                </label>
                            <br></br>
                            <label htmlFor="input_date" className=" font">Set limit date</label>
                            <input id="input_date" onChange={addLimitDate} value={taskInfo.limit_date} type="datetime-local" className="form-control" placeholder="Task one"></input>
                            <br></br>
                        </div>
                        <div className="modal-footer">
                            <label htmlFor='check-modal' className='btn-cancel'>Cancel </label>
                            <button  className='btn-add' onClick={addTask}  disabled={
                                    (!taskInfo.task_name.trim() || !taskInfo.description.trim() || !taskInfo.limit_date.trim())?true:false
                            }>{
                                    (!taskInfo.task_name.trim() || !taskInfo.description.trim() || !taskInfo.limit_date.trim())?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cursor-fill" viewBox="0 0 16 16">
                                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                                    </svg>

                            }
                                {textbutton}
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    );
}

export default  Home;