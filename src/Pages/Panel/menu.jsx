import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';

function Menu() {

	let navigate			= useNavigate();
	const {authed,role} 			= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed])

	return (
		<>
			<PanelNavbar page={"menu"}>
				<ul>
					<li>GET DATA MENU</li>
					<li>INSERT DATA MENU</li>
					<li>UPDATE DATA MENU</li>
					<li>DELETE DATA MENU</li>
					<li>KASIR HANYA GET SAJA</li>
				</ul>
			</PanelNavbar>
		</>
	);
}

export default Menu;
