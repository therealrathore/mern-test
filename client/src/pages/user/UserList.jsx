import React,{useState, useEffect} from 'react'
import {getAllUsers} from '../../app/api'
import Pagination from '../../components/common/Pagination'
import {Loader, TaskModal} from '../../app/component'
import moment from 'moment'

let PageSize = 10;

const UserList = () => {

	const [userList, setUserList] = useState([])
	const [loader, setLoader] = useState(false)
	const [tID, setTID] = useState()
	const [showTask, setShowTask] = useState()
	const [show, setShow] = useState(false)
	const [taskData, setTaskData] = useState()
	useEffect(() => {

		const getData = async () => {
			setLoader(true)
			const {data} = await getAllUsers()
			console.log(data)
			if(data?.success === true){
				console.log(data?.data)
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
   
   	const hideShow = (id) => {
   		setTID(id)
   	}

   	const showModal = (data) => {
   		console.log(data)
   		setShow(true)
   		setTaskData(data)
   	}
	return(
		<section className="home-section">
			<TaskModal setShow={setShow} show={show} data={taskData}/>
			{loader ? <Loader /> :
			<>
      	  	<div className="text">User List</div>
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
					    	{
					    		currentTableData?.map((user, id) => (
					    			<>
				    				 <tr key={id}>
								        <th scope="row">{id+1}</th>
								        <td><p style={{cursor:'pointer'}} onClick={hideShow.bind(this, id)}>{user?.username}</p></td>
								        <td><p style={{display:tID === id ? '' : 'none'}}>{user?.task_info?.taskName}</p></td>
								        <td><p style={{display:tID === id ? '' : 'none'}}>{moment(user?.task_info?.dateAndTime).format('DD-MM-YYYY h:mm a')}</p></td>
								        <td><p style={{display:tID === id ? '' : 'none'}}><i className='bx bx-show bx-md' onClick={showModal.bind(this,user?.task_info)}></i> <i className='bx bx-edit-alt bx-md'></i></p></td>
								      </tr>

								      </>
					    			))
					    	}
					    </tbody>
					</table>
					<Pagination 
						currentPage={currentPage}
                        totalCount={userList.length}
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

export default UserList