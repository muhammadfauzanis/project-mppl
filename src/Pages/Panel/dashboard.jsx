import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';
import axios from 'axios';
import { Helper } from '../../Helper/Helper';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


function Dashboard() {

	let navigate		= useNavigate();
	const {authed} 		= useAuth();
	const {baseURLAPI} 	= Helper();
	const [totalUser,setTotalUser] = useState(0);
	const [totalMenu,setTotalMenu] = useState(0);
	const [menuFavorit,setMenuFavorit] = useState([]);
	const [chart,setChart] = useState([]);

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed]);

	const handleData = async () => {
		await axios.get(baseURLAPI('/admin/dashboard'),{withCredentials:true})
		.then((response) => {
			console.log(response.data);
			setTotalUser(response.data.total_user);
			setTotalMenu(response.data.total_menu);
			setMenuFavorit(response.data.menu_favorit);
			setChart({
				date : response.data.date_arr,
				data : response.data.chart,
			});
		})
	}

	const options = {
		title: {
			text: 'Penjualan 7 Hari Terakhir',
			align: 'center'
		},
	
		yAxis: {
			title: {
				text: 'Jumlah Pendapatan (Ro)'
			}
		},
	
		xAxis: {
			categories: chart?.date,
		},
	
		series: [{
			data: chart?.data
		}],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}	
	}
	  

	useEffect(() => {
		handleData();
	},[]);

	return (
		<>
			<PanelNavbar page={"dashboard"}>
				{/* <ul>
					<li>Box (Jumlah Menu, Jumlah User)</li>
					<li>Chart (Penjualan Berdasarkan Waktu (Perminggu/bulan/3 bulan))</li>
					<li>Table (Daftar 5 Menu Terlaris)</li>
				</ul> */}

				<div className='grid grid-cols-4 gap-2'>
					<div className='bg-white p-3 col-span-2 rounded-lg shadow flex border-gray-50 border-2'>
						<div className='text-white rounded bg-blue-500 w-16 h-16 flex items-center justify-center'>
							<svg xmlns="http://www.w3.org/2000/svg"  width="30" viewBox="0 0 640 512">
								<path fill='#ffffff' d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
							</svg>
						</div>
						<div className='ml-4'>
							<p className='text-lg'>Total User</p>
							<p className='font-bold text-xl'>{totalUser}</p>
						</div>
					</div>
					<div className='bg-white p-3 col-span-2 rounded-lg shadow flex border-gray-50 border-2'>
						<div className='text-white rounded bg-red-500 w-16 h-16 flex items-center justify-center'>
							<svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 512 512">
								<path fill='#ffffff' d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/>
							</svg>
						</div>
						<div className='ml-4'>
							<p className='text-lg'>Total Menu</p>
							<p className='font-bold text-xl'>{totalMenu}</p>
						</div>
					</div>
					<div className='bg-white p-3 col-span-3 rounded-lg shadow border-gray-50 border-2'>
						<HighchartsReact
							highcharts={Highcharts}
							options={options}
						/>
					</div>
					<div className='bg-white p-3 col-span-1 rounded-lg shadow border-gray-50 border-2'>
						<h1 className='text-xl font-bold mb-2'>Menu Favorit</h1>
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							{
								menuFavorit.map(menu => (
									<tr key={"menu_"+menu.id_menu} className='border-gray-200 border-b'>
										<td className="px-3 py-3">
											<span className=''>{menu.menu.nama_menu}</span>
											<span className="float-right bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-auto">{menu.total_beli}</span>
										</td>
									</tr>
								))
							}
						</table>
					</div>
				</div>
			</PanelNavbar>
		</>
	);
}

export default Dashboard;
