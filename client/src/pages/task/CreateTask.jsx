import Datetime from 'react-datetime';
import React, {useState} from 'react'
import "react-datetime/css/react-datetime.css";
import {createTask} from '../../app/api'
import moment from 'moment'
const CreateTask = () => {

	const [taskName, setTaskName] = useState()
	const [description, setDescription] = useState()
	const [dateAndTime, setDateAndTime] = useState()
	const [error, setError] = useState({})
	
	const today = moment().format('YYYY-MM-DDTh:mm')
	
	const {userID} = JSON.parse(localStorage.getItem('auth'));
	
	const submitTask = async () => {

		if(!taskName) {
			setError((prevState) => ({ ...prevState, ['taskName']: 'Task name is required!' }))
		} else if(!description){
			setError((prevState) => ({ ...prevState, ['description']: 'Description is required!' }))
		} else if(!dateAndTime){
			setError((prevState) => ({ ...prevState, ['dateAndTime']: 'Date and time is required!' }))
		} else if(dateAndTime < today){
			setError((prevState) => ({ ...prevState, ['dateAndTime']: 'Date and time  should be greater than today!' }))
		} else {
			const created = await createTask({taskName,description,dateAndTime, userID})
			setTaskName('')
			setDescription('')
			setDateAndTime('')
			console.log(created)
		}
	}

	return(
		<section className="home-section">
      	  	<div className="text">Create Task</div>
      	  	<div className="card-body">
      	  		<div className="form-tab">
      	  			<div>
      	  				<label>Task Name </label>
      	  				<input className="input" value={taskName} type="text" onChange={(e) => setTaskName(e.target.value)} />
      	  				<p className="errors">{!taskName && error?.taskName}</p>
      	  			</div>
      	  			<div>
      	  				<label>Description </label>
      	  				<textarea className="input" value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)}></textarea>
      	  				<p className="errors">{!description && error?.description}</p>
      	  			</div>
      	  			<div>
      	  				<label>Date and Time </label>
      	  				<input 
  	  						className="input"
  	  						type="datetime-local" 
  	  						id="meeting-time"
   							name="meeting-time"
   							value={dateAndTime}
   							onChange={(e) => setDateAndTime(e.target.value)}
       					/>
       					<p className="errors">{error?.dateAndTime}</p>
      	  			</div>
      	  			<center>
      	  			<div>
      	  				<button className="button-tab" type="submit" onClick={submitTask}>Create Task</button>
      	  			</div>
      	  			</center>
				</div>
      	  	</div>
      	</section>
	)
}

export default CreateTask