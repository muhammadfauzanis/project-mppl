import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Helper/useAuth';
import { useNavigate } from 'react-router-dom';
import PanelNavbar from '../../Components/PanelNavbar';
import Datatable from '../../Components/Datatable';
import axios from 'axios';
import { Helper } from '../../Helper/Helper';
import PopUpAlert from '../../Components/PopUpAlert';

function CategoryMenu() {

	let navigate		= useNavigate();
	const {authed,role} 		= useAuth();

	useEffect(() => {
		if(!authed){
			return navigate("/panel/login")
		}
	},[authed])

	
	const [isSubmitForm, setIsSubmitForm] = useState(false);
	const [showModal,setShowModal]  = useState(false);
	const [error, setError] = useState('');
	const [draw, setDraw] = useState(0);
	const {baseURLAPI} = Helper();
	const {alertConfirm, alertSuccess,alertError} = PopUpAlert();
	const [formData,setFormData]    = useState({
		id : '',
		nama_kategori_menu : '',
	})

	let header 	= [];
	let body 	= [];
	if(role === "admin"){
		header 	= [
			{
				title : "Nama Kategori Menu",
			},
			{
				title : "#",
			},
		];

		body 	= [
			{
				data : "nama_kategori_menu"
			},
			{
				render : (data) => {
					return (
						<div key={"dd_"+data.id} className='relative dropdown inline-block'>
							<button onClick={handleDropdown} className="text-white dropdown-button font-semibold font-medium rounded-lg text-sm text-center inline-flex items-center" type="button">
								<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
							</button>

							<div className="z-10 hidden border-2 border-gray-200 dropdown-menu bg-white absolute right-5 top-0 rounded-lg shadow w-44 dark:bg-gray-700">
								<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
									<li>
										<a href="/#" onClick={e => {
											handleEditForm(e,data);
										}} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
											<svg xmlns="http://www.w3.org/2000/svg" className='mr-3' height="16" width="16" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
											Edit
										</a>
									</li>
									<li>
										<a href="/#" onClick={e => {
											handleDeleteForm(e,data.id);
										}} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
											<svg xmlns="http://www.w3.org/2000/svg" className='mr-3' height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
											Hapus
										</a>
									</li>
								</ul>
							</div>
						</div>
					);
				},
				orderable : false
			},
		];
	}else{
		header = [
			{
				title : "Nama Kategori Menu",
			}
		];

		body = [
			{
				data : "nama_kategori_menu",
			}
		];
	}
	const config = {
		header : header,
		body :body ,
	}

	const resetForm = () => {
		setFormData({
			id : '',
			nama_kategori_menu : ''
		});

	}

	const handleChange = e => {
		let { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleModal   = (show = null) => {
		resetForm();
		setError('');
		
		if(show !== null){
			setShowModal(show);
		}else{
			if(showModal){
				setShowModal(false);
			}else{
				setShowModal(true);
			}
		}
	}

	const handleFormModal = async () => {
		setIsSubmitForm(true);
		if(formData.id !== ''){
			await axios.post(baseURLAPI('/admin/kategori_menu/update/'+formData.id),formData,{withCredentials:true})
			.then(function (response) {
				setDraw(draw + 1);
				handleModal(false)
				setIsSubmitForm(false);
				alertSuccess(response.data.message);
			})
			.catch(function (error) {
				const data = error.response.data;
				setError(data.message);
				setIsSubmitForm(false);
			});    
		}else{
			await axios.post(baseURLAPI('/admin/kategori_menu/insert'),formData,{withCredentials:true})
			.then(function (response) {
				setDraw(draw + 1);
				handleModal(false)
				setIsSubmitForm(false);
				alertSuccess(response.data.message);
			})
			.catch(function (error) {
				const data = error.response.data;
				setError(data.message);
				setIsSubmitForm(false);
			});
		}
	}

	const handleDropdown    = (e) => {
		let parent  = e.target.closest('.dropdown');
		let drop    = parent.querySelector(".dropdown-menu");
		if(drop.classList.contains("hidden")){
			drop.classList.remove("hidden")
			document.getElementById("backdoor_dropdown").classList.remove("hidden");
		}else{
			drop.classList.add("hidden")
			document.getElementById("backdoor_dropdown").classList.add("hidden");
		}
	}

	const handleEditForm    = (e,data) =>{
		e.preventDefault();

		handleModal(true);
		setFormData({
			id : data.id,
			nama_kategori_menu : data.nama_kategori_menu,
		});

		handleDropdown(e);
	}

	const handleDeleteForm    = async (e,id) =>{
		e.preventDefault();

		alertConfirm("Apakah kamu yakin akan menghapus data ini", async () => {
			await axios.post(baseURLAPI('/admin/kategori_menu/delete/'+id),formData,{withCredentials:true})
			.then(function (response) {
				setDraw(draw + 1);
				alertSuccess(response.data.message)
			})
			.catch(function (error) {
				const data = error.response.data;
				alertError(data.message);
			});
		})
		
		handleDropdown(e);
	}

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

				{ role === "admin" && (
					<button type="button" onClick={handleModal} className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
						<svg className='mr-3' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
						Tambah Kategori Menu
					</button>
				)}

				<Datatable draw={draw} config={config} url={'/admin/kategori_menu/all'}/>
				
				{
					role === "admin" && (
						<div tabIndex="-1" className={`fixed top-0 left-0 right-0 z-50 ${!showModal && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full`}>
							<div onClick={e => handleModal(false)} className='fixed top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-50'></div>
							<div className="relative mx-auto w-full max-w-2xl max-h-full">
								<form id='formSubmit' onSubmit={handleFormModal}>
									<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
										<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
												{formData.id ? "Edit Kategori Menu" : "Tambah Kategori Menu"}
											</h3>
											<button type="button" onClick={e => handleModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
											<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
												<span className="sr-only">Close modal</span>
											</button>
										</div>
										<div className="p-6 space-y-6">
											{ error !== '' && (
												<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
													{ error }
												</div>
											)}

											<div>
												<div className="mb-6">
													<label htmlFor="nama_kategori_menu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Kategori Menu</label>
													<input name='nama_kategori_menu' onChange={handleChange} value={formData.nama_kategori_menu} type="text" id="nama_kategori_menu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Nama Kategori Menu"/>
												</div>
											</div>
										</div>
										<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
											<button onClick={e => handleModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Tutup</button>
											<button disabled={isSubmitForm} onClick={handleFormModal} type="button" className="text-white bg-blue-700 disabled:bg-blue-500 disabled:cursor-wait hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
												Submit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					)
				}
			</PanelNavbar>
		</>
	);
}

export default CategoryMenu;
