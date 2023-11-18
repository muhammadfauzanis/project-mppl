import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';

function Users() {

	let navigate			= useNavigate();
	const {authed,role} 	= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
		if(role !== "admin"){
			return navigate("/panel/dashboard")
		}
	},[authed])

	return (
		<>
			<PanelNavbar page={"users"}>
				<ul>
					<li>GET DATA USER</li>
					<li>INSERT DATA USER</li>
					<li>UPDATE DATA USER</li>
					<li>DELETE DATA USER</li>
					<li>HALAMAN UNTUK ADMIN SAJA</li>
				</ul>
			</PanelNavbar>
		</>
	);
}

export default Users;
