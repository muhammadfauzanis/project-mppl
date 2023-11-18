import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';

function CategoryMenu() {

	let navigate		= useNavigate();
	const {authed} 		= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed])

	return (
		<>
			<PanelNavbar page={"kategori_menu"}>
				<ul>
					<li>GET DATA KATEGORI MENU</li>
					<li>INSERT DATA KATEGORI MENU</li>
					<li>UPDATE DATA KATEGORI MENU</li>
					<li>DELETE DATA KATEGORI MENU</li>
					<li>KASIR HANYA GET SAJA</li>
				</ul>
			</PanelNavbar>
		</>
	);
}

export default CategoryMenu;
