import React,{useState} from 'react'
import {register} from '../../app/api'	
import {NotificationManager} from 'react-notifications';

const UserModal = () => {
	
	const [username, setUsername] = useState()
	const [error, setError] = useState('')
	
	const registerApiCall = async () => {

		if(!username) setError('Please enter username');

		const {data} = await register({username})
		
		if(data?.success === true){
			localStorage.setItem('token', JSON.stringify(data?.token))
			localStorage.setItem('auth', JSON.stringify({username:data?.data?.username,userID:data?.data?._id, isAuth:true}))
			//navigate('/home')
			NotificationManager.success('','Login successfully!',800)
			setTimeout(() => {
				window.location.href="/home"
			},1000)
		}
	}


	return(

		<div className="modal fade in" id="myModal" role="dialog" style={{display:'block'}}>
		    <div className="modal-dialog modal-sm">
		     	<div className="modal-content">
		        	<div className="modal-header">
		          		<h4 className="modal-title">Authentication</h4>
		        	</	div>
		        	<div className="modal-body">
		          		<input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
		        		<p>{error && error}</p>
		        	</div>
		        	<div className="modal-footer">
		          		<button onClick={registerApiCall} type="button" className="btn btn-default" data-dismiss="modal">Submit</button>
		        	</div>
		      	</div>
		    </div>
		</div>
	)
}

export default UserModal