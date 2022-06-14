import React, {useState} from 'react'
import moment from 'moment'

const TaskModal = ({setShow, show, data}) => {
	return(
		<div className="modal fade in" id="myModal" role="dialog" style={{display:show ? 'block':'none'}}>
		    <div className="modal-dialog modal-sm">
		     	<div className="modal-content">
		        	<div className="modal-header">
		          		<h4 className="modal-title">Task Detail</h4>
		          		<button onClick={()=>setShow(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
		        	</div>
		        	<div className="modal-body">
		          		<div style={{display:'flex'}}>
		          			<p style={{fontWeight:'bold'}}>Task Name : </p>
		          			<p style={{paddingLeft:2}}>{data?.taskName}</p>
		          		</div>
		          		<div style={{display:'flex'}}>
		          			<p style={{fontWeight:'bold'}}>Description : </p>
		          			<p style={{paddingLeft:2}}>{data?.description}</p>
		          		</div>
		          		<div style={{display:'flex'}}>
		          			<p style={{fontWeight:'bold'}}>Date and Time : </p>
		          			<p style={{paddingLeft:2}}>{data?.dateAndTime && moment(data?.dateAndTime).format('DD-MM-YYYY h:mm a')}</p>
		          		</div>
		        	</div>
		      	</div>
		    </div>
		</div>
	)
}

export default TaskModal