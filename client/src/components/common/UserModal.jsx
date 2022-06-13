import React,{useState, useEffect} from 'react'
import {register} from '../../app/api'
import {useNavigate} from 'react-router-dom'
const UserModal = () => {
	
	const [username, setUsername] = useState()
	const [error, setError] = useState('')
	const navigate = useNavigate()
	
	const registerApiCall = async () => {

		if(!username) setError('Please enter username');

		const {data} = await register({username})
		console.log(data)
		if(data?.success === true){
			localStorage.setItem('auth', JSON.stringify({username:data?.data?.username,userID:data?.data?._id, isAuth:true}))
			//navigate('/home')
			window.location.href="/home"
		}
		
	}


	return(

		<div class="modal fade in" id="myModal" role="dialog" style={{display:'block'}}>
		    <div class="modal-dialog modal-sm">
		     	<div class="modal-content">
		        	<div class="modal-header">
		          		<h4 class="modal-title">Authentication</h4>
		        	</div>
		        	<div class="modal-body">
		          		<input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
		        		<p>{error && error}</p>
		        	</div>
		        	<div class="modal-footer">
		          		<button onClick={registerApiCall} type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
		        	</div>
		      	</div>
		    </div>
		</div>
	)
}

export default UserModal