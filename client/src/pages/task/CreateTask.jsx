import React, {useState} from 'react'
import "react-datetime/css/react-datetime.css";
import {createTask} from '../../app/api'
import moment from 'moment'
import TaskForm from './TaskForm'
import {useNavigate} from 'react-router-dom'
import {NotificationManager} from 'react-notifications';
import { MainContextState } from '../../app/Context';

const CreateTask = () => {

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
			const {data} = await createTask({taskName,description,dateAndTime, userID})
			setTaskName('')
			setDescription('')
			setDateAndTime('')
			if(data?.success){
				
				NotificationManager.success('','Task created successfully!',1500)
				setTimeout(() => {
					localStorage.setItem('classId', JSON.stringify(1))
					navigate('/home')
				},2000)
			}
		}
	}

	return(
		<section className="home-section">
      	  	<div className="text">Create Task</div>
      	  	<div className="card-body">
      	  		<TaskForm 
	      	  		setDescription={setDescription}
	      	  		setDateAndTime={setDateAndTime}
	      	  		setTaskName={setTaskName} 
	      	  		taskName={taskName}
	      	  		description={description}
	      	  		dateAndTime={dateAndTime}
	      	  		error={error}
	      	  		title={'Create Task'}
	      	  		submitTask={submitTask}
      	  		/>
      	  	</div>
      	</section>
	)
}

export default CreateTask