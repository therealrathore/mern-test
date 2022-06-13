import React, {useState} from 'react'
import moment from 'moment'

const TaskModal = ({setShow, show, data}) => {
	return(
		<div class="modal fade in" id="myModal" role="dialog" style={{display:show ? 'block':'none'}}>
		    <div class="modal-dialog modal-sm">
		     	<div class="modal-content">
		        	<div class="modal-header">
		          		<h4 class="modal-title">Task Detail</h4>
		          		<button onClick={()=>setShow(false)} type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
		        	</div>
		        	<div class="modal-body">
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
		          			<p style={{paddingLeft:2}}>{moment(data?.dateAndTime).format('DD-MM-YYYY h:mm a')}</p>
		          		</div>
		        	</div>
		      	</div>
		    </div>
		</div>
	)
}
export default TaskModal