import React,{useState, useEffect} from 'react'
import {getAllTasks} from '../../app/api'
import Pagination from '../../components/common/Pagination'
import {Loader} from '../../app/component'
let PageSize = 10;

const TaskList = () => {

	const [taskList, setTaskList] = useState([])
	const [loader, setLoader] = useState(false)
	useEffect(() => {

		const getData = async () => {
			setLoader(true)
			const {data} = await getAllTasks()
			console.log(data)
			if(data?.success === true){
				console.log(data?.data)
				setTaskList(data?.data)
			}
			setTimeout(() => {
				setLoader(false)
			},1000)
			
		}
		getData()
	},[])

	const [currentPage, setCurrentPage] = useState(1);
   
    let currentTableData = [];
  
    if(taskList.length !== 0) {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        currentTableData = taskList?.slice(firstPageIndex, lastPageIndex);
    }
   
	return(
		<section className="home-section">
			{loader ? <Loader /> :
			<>
      	  	<div className="text">Task List</div>
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
				    				 <tr key={id}>
								        <th scope="row">{id+1}</th>
								        <td>{user?.username}</td>
								      </tr>
					    			))
					    	}
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