import React,{useState, useEffect} from 'react'
import {getAllUsers} from '../../app/api'
import Pagination from '../../components/common/Pagination'
import {Loader, TaskModal} from '../../app/component'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { MainContextState } from '../../app/Context';
let PageSize = 10;

const UserList = () => {

	const [userList, setUserList] = useState([])
	const [loader, setLoader] = useState(false)
	const [tID, setTID] = useState()
	const [show, setShow] = useState(false)
	const [taskData, setTaskData] = useState()

	const {userID} = MainContextState();

	const navigate = useNavigate()
	useEffect(() => {

		const getData = async () => {
			setLoader(true)
			const {data} = await getAllUsers()
			if(data?.success === true){
				setUserList(data?.data)
			}
			setTimeout(() => {
				setLoader(false)
			},1000)
			
		}
		getData()
	},[])

	const [currentPage, setCurrentPage] = useState(1);
   
    let currentTableData = [];
  
    if(userList.length !== 0) {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        currentTableData = userList?.slice(firstPageIndex, lastPageIndex);
    }

   	const hideShow = (id, data) => {
   		if(id === tID){
   			setTID('')
   		} else {
   			data ? setTID(id) : alert('No task found!')
   		}
		
   	}

   	const showModal = (data) => {
   		setShow(true)
   		setTaskData(data)
   	}
	return(
		<section className="home-section">
			<TaskModal setShow={setShow} show={show} data={taskData}/>
			{loader ? <Loader /> :
			<>
      	  	<div className="text">List of users task</div>
      	  	<div className="card-body">
      	  		<div className="table-body">
					<table className="table">
					    <thead>
					      <tr>
					        <th scope="col">#</th>
					        <th scope="col">User Name</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{currentTableData?.map((user, id) => (
			    				<tr key={id+1}>
							        <th scope="row">{id+1}</th>
							        <td><p style={{cursor:'pointer'}} onClick={hideShow.bind(this, id, user?.task_info)}>{user?.username}</p></td>
							        <td><p style={{display:tID === id ? '' : 'none'}}>{user?.task_info?.taskName}</p></td>
							        <td>
							        	<p style={{display:tID === id ? '' : 'none'}}>
							        		{user?.task_info?.dateAndTime && 
							        			moment(user?.task_info?.dateAndTime)
							        			.format('DD-MM-YYYY h:mm A')
							        		}
							        	</p>
							        </td>
							        <td>
							        	<p style={{display:tID === id && user?.task_info ? '' : 'none'}}>
							        		<i className='bx bx-show bx-md'
							        			style={{cursor:'pointer', paddingRight:10}} 
							        			onClick={showModal.bind(this,user?.task_info)}></i> 
							        		{
							        			user?.task_info?.userID === userID &&
							        			<i className='bx bx-edit-alt bx-md' 
							        			style={{cursor:'pointer'}} onClick={()=>navigate(`/task/update/${user?.task_info?._id}`)}></i>
							        		}
							        	</p>
							        </td>
							    </tr>
					    	))}
					    </tbody>
					</table>
					<Pagination 
						currentPage={currentPage}
                        totalCount={userList.length}
                        pageSize={PageSize}
                        setTID={setTID}
                        onPageChange={page => setCurrentPage(page)}
					/>
      	  		</div>
      	  	</div>
      	  	</>
      	  	}
  		</section>
	)
}

export default UserList