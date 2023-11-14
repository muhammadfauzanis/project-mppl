import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {

	let navigate 					= useNavigate();
	const {authed,logout} 			= useAuth();
	const [errorMsg, setErrorMsg] 	= useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] 	= useState({
		username : '',
		password : '',
	});

	const handleLogout = () => {
		logout();
	}

	useEffect(() => {
		if(!authed){
			return navigate("/admin/login")
		}
	},[authed])

	return (
		<>
			<h1>Dashboard</h1>
			<Link to="/admin/menu">MENU</Link>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
}

export default Dashboard;
