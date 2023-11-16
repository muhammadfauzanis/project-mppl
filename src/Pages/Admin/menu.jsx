import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminNavbar';

function Menu() {

	let navigate			= useNavigate();
	const {authed} 			= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/admin/login")
		}
	},[authed])

	return (
		<>
			<AdminNavbar page={"menu"}>
				Halaman Menu
			</AdminNavbar>
		</>
	);
}

export default Menu;
