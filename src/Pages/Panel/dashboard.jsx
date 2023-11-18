import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';

function Dashboard() {

	let navigate			= useNavigate();
	const {authed} 			= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed])

	return (
		<>
			<PanelNavbar page={"dashboard"}>
				<ul>
					<li>Box (Jumlah Menu, Jumlah User)</li>
					<li>Chart (Penjualan Berdasarkan Waktu (Perminggu/bulan/3 bulan))</li>
					<li>Table (Daftar 5 Menu Terlaris)</li>
				</ul>
			</PanelNavbar>
		</>
	);
}

export default Dashboard;
