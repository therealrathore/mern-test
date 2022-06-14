import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {NotificationManager} from 'react-notifications';
import { MainContextState } from '../../app/Context';

const Sidebar = () => {

	const [sidebarClass, setSidebarClass] = useState('sidebar')
	const [menuClass, setMenuClass] = useState('bx bx-menu')
	const [menu, setMenu] = useState(false)
	// const navigate = useNavigate()

	var classId = JSON.parse(localStorage.getItem('classId'));

    var [activeLink, setActiveLink] = useState(classId ? classId : 1)
	const {username} = MainContextState();
	
	const sidebarFnc = () => {

		if(!menu){
			setMenuClass('bx bx-menu-alt-right')
			setSidebarClass('sidebar open')
			setMenu(true)
		} else {
			setMenuClass('bx bx-menu')
			setSidebarClass('sidebar')
			setMenu(false)
		}
		
	}

	const logout = () => {
		localStorage.clear()
		NotificationManager.success('',`You've been logged out! `,800)
		setTimeout(() => {
			window.location.href="/"
		},1000)
	}


	const routes = [
		{
			id:1,
			name:'User List',
			icon:'bx bx-user',
			url:'/home'
		},
		{
			id:2,
			name:'Create Task',
			icon:'bx bx-add-to-queue',
			url:'/create/task'
		},
		{
			id:3,
			name:'My Task List',
			icon:'bx bx-list-ul',
			url:'/task/list'
		}
	]

	var handleClick = id => {
	    localStorage.setItem('classId', JSON.stringify(id));
	    setActiveLink(id);
	};

	useEffect(() => {
		setActiveLink(classId)
	},[classId])

	return(
		<div className={sidebarClass}>
		    <div className="logo-details">
		        <i className='bx bx-task icon'></i>
		        <div className="logo_name">Task Manage</div>
		        <i onClick={sidebarFnc} className={menuClass} id="btn" ></i>
		    </div>
		    <ul className="nav-list">
		    	{
		    		routes?.map(route => (
		    			<li key={route.id} onClick={ () => handleClick(route.id)}>
				            <Link to={route.url} className={route.id === activeLink ? "active-tab" : ""}>
				            	<i className={route.icon}></i>
				            	<span className="links_name">{route.name}</span>
				            </Link>
				            <span className="tooltip">{route.name}</span>
				        </li>
		    		))
		    	}
		        <li className="profile">
		            <div className="profile-details">
		                <img src="../logo192.png" alt="profileImg" />
		                <div className="name_job">
		                    <div className="name">{username ? username : ''}</div>
		                </div>
		            </div>
		            <i className='bx bx-log-out' style={{cursor:'pointer'}} onClick={logout} id="log_out" ></i>
		        </li>
		    </ul>
		</div>
	)

}

export default Sidebar