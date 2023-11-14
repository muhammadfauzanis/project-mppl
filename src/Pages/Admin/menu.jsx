import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {

	let navigate 					= useNavigate();
	const {authed} 					= useAuth();
	const [errorMsg, setErrorMsg] 	= useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] 	= useState({
		username : '',
		password : '',
	});

	useEffect(() => {
		if(!authed){
			return navigate("/admin/login")
		}
	},[authed])

	return (
		<>
			<h1>Menu</h1>
            <Link to="/admin/dashboard">DASHBOARD</Link>
		</>
	);
}

export default Menu;
