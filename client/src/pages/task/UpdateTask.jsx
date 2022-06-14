import React, {useState, useEffect} from 'react'
import "react-datetime/css/react-datetime.css";
import {getTasks, updateTask} from '../../app/api'
import moment from 'moment'
import TaskForm from './TaskForm'
import {useParams, useNavigate} from 'react-router-dom'
import {NotificationManager} from 'react-notifications';
import { MainContextState } from '../../app/Context';

const UpdateTask = () => {

	let { taskID } = useParams();
	const navigate = useNavigate()
	const [taskName, setTaskName] = useState()
	const [description, setDescription] = useState()
	const [dateAndTime, setDateAndTime] = useState()
	const [error, setError] = useState({})
	
	const today = moment().format('YYYY-MM-DDTH:mm')
	
	const {userID} = MainContextState();
	
	const submitTask = async () => {
		if(!taskName) {
			setError((prevState) => ({ ...prevState, taskName: 'Task name is required!' }))
		} else if(!description){
			setError((prevState) => ({ ...prevState, description: 'Description is required!' }))
		} else if(!dateAndTime){
			setError((prevState) => ({ ...prevState, dateAndTime: 'Date and time is required!' }))
		} else if(dateAndTime < today){
			setError((prevState) => ({ ...prevState, dateAndTime: 'Date and time should be greater than today!' }))
		} else {
			const {data} = await updateTask({taskName,description,dateAndTime,userID,taskID})
			setTaskName('')
			setDescription('')
			setDateAndTime('')
			if(data?.success){
				NotificationManager.success('','Task updated successfully!',1500)
				setTimeout(() => {
					localStorage.setItem('classId', JSON.stringify(1))
					navigate('/home')
				},1500)
			}
		}
	}

	useEffect(()=>{
		const getTask = async () => {
			const {data} = await getTasks({userID, taskID})
			if(data?.success){
				const {taskName, description, dateAndTime} = data?.data
				setTaskName(taskName)
				setDescription(description)
				setDateAndTime(moment(dateAndTime).format("YYYY-MM-DDTH:mm"))
			}
		}
		getTask()
	},[userID, taskID])

	return(
		<section className="home-section">
      	  	<div className="text">Update Task</div>
      	  	<div className="card-body">
      	  		<TaskForm 
	      	  		setDescription={setDescription}
	      	  		setDateAndTime={setDateAndTime}
	      	  		setTaskName={setTaskName} 
	      	  		taskName={taskName}
	      	  		description={description}
	      	  		dateAndTime={moment(dateAndTime).format("YYYY-MM-DDTH:mm")}
	      	  		error={error}
	      	  		title={'Update Task'}
	      	  		submitTask={submitTask}
      	  		/>
      	  	</div>
      	</section>
	)
}

export default UpdateTask