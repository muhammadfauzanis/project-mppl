import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';
import Datatable from '../../Components/Datatable';
import axios from 'axios';
import { Helper } from '../../Helper/Helper';

function Users() {

	let navigate		= useNavigate();
	const {authed,role} = useAuth();

	const config = {
		pageLength : [1,10,100],
		defaultPage : 10,
		header : [
			{
				title : "Username",
			},
			{
				title : "Role",
			},
			{
				title : "#",
			},
		],
		body : [
			{
				data : "username"
			},
			{
				data : "role"
			},
			{
				render : (data) => {
					return 'ini nanti menu dropdown ';
				},
				orderable : false
			},
		],
		// order : ["role","DESC"]
	}

	

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

				<Datatable config={config} url={'/admin/users/all'}/>
			</PanelNavbar>
		</>
	);
}

export default Users;
