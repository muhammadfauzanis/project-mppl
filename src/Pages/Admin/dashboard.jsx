import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminNavbar';

function Dashboard() {

	let navigate			= useNavigate();
	const {authed} 			= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/admin/login")
		}
	},[authed])

	return (
		<>
			<AdminNavbar page={"dashboard"}>
				Hello World
			</AdminNavbar>
		</>
	);
}

export default Dashboard;
