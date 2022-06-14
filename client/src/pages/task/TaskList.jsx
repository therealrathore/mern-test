import React,{useState, useEffect} from 'react'
import {getUsersTasks} from '../../app/api'
import Pagination from '../../components/common/Pagination'
import {Loader, TaskModal} from '../../app/component'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { MainContextState } from '../../app/Context';
let PageSize = 10;

const TaskList = () => {

	const [taskList, setTaskList] = useState([])
	const [loader, setLoader] = useState(false)
	const [show, setShow] = useState(false)
	const [taskData, setTaskData] = useState()

	const {userID} = MainContextState();
	
	const navigate = useNavigate();

	const getData = async (userID) => {
		setLoader(true)
		const {data} = await getUsersTasks({userID:userID})

		if(data?.success === true){
			setTaskList(data?.data)
		}
		setTimeout(() => {
			setLoader(false)
		},1000)
		
	}

	useEffect(() => {
		getData(userID)
	},[userID])

	const [currentPage, setCurrentPage] = useState(1);
   
    let currentTableData = [];
  
    if(taskList.length !== 0) {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        currentTableData = taskList?.slice(firstPageIndex, lastPageIndex);
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
      	  	<div className="text">List of task</div>
      	  	<div className="card-body">
      	  		<div className="table-body">
					<table className="table">
					    <thead>
					      <tr>
					        <th scope="col">#</th>
					        <th scope="col">Task Name</th>
					        <th scope="col">Date and Time</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{currentTableData?.map((task, id) => (
			    				<tr key={id+1}>
							        <th scope="row">{id+1}</th>
							        <td><p>{task?.taskName}</p></td>
							        <td><p>{moment(task?.dateAndTime)
							        		.format('DD-MM-YYYY h:mm A')}</p></td>
							 		<td>
							        	<p>
							        		<i className='bx bx-show bx-md'
							        			style={{cursor:'pointer', paddingRight:10}} 
							        			onClick={showModal.bind(this,task)}></i> 

							        		<i className='bx bx-edit-alt bx-md' 
							        			style={{cursor:'pointer'}} onClick={()=>navigate(`/task/update/${task?._id}`)}></i>
							        	
							        	</p>
							        </td>
							    </tr>
					    	))}
					    </tbody>
					</table>
					<Pagination 
						currentPage={currentPage}
                        totalCount={taskList.length}
                        pageSize={PageSize}
                        
                        onPageChange={page => setCurrentPage(page)}
					/>
      	  		</div>
      	  	</div>
      	  	</>
      	  	}
  		</section>
	)
}

export default TaskList