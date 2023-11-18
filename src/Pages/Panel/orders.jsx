import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';

function Orders() {

	let navigate			= useNavigate();
	const {authed} 			= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed])

	return (
		<>
			<PanelNavbar page={"orders"}>
				<ul>
					<li>GET DATA ORDERS</li>
					<li>UPDATE STATUS PEMBAYARAN</li>
					<li>HALAMAN UNTUK ADMIN DAN KASIR</li>
				</ul>
			</PanelNavbar>
		</>
	);
}

export default Orders;
