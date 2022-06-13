const TaskForm = ({setDescription, setDateAndTime, setTaskName, taskName, description, dateAndTime, error, submitTask, title}) => {
	
	return(

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
  				<button className="button-tab" type="submit" onClick={submitTask}>{title}</button>
  			</div>
  			</center>
		</div>
	)
}

export default TaskForm

