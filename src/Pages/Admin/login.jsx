import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helper } from '../../Helper/Helper';
import { useAuth } from '../../Helper/useAuth';

function Login() {

	let navigate 					= useNavigate();
	const {authed,setAsLogin} 		= useAuth();
	const {baseURLAPI}				= Helper();
	const [errorMsg, setErrorMsg]	= useState('');
	const [isLoading, setIsLoading]	= useState(false);
	const [formData, setFormData] 	= useState({
		username : '',
		password : '',
	});

	const handleSubmit 	= async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMsg("");
		await axios.get(baseURLAPI('../sanctum/csrf-cookie'));
		await axios.post(baseURLAPI("/admin/login"),formData,{withCredentials : true})
		.then(response => {
			setIsLoading(false);
			setAsLogin('admin');
		}).catch(error => {
			if(error.response){
				setErrorMsg(error.response.data.message);
			}
			setIsLoading(false);
		})
	}
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	useEffect(() => {
		if(authed){
			return navigate("/admin/dashboard")
		}
	},[authed])


	return (
		<>
			<div className='flex min-h-screen items-center'>
				<div className='p-5 my-10 shadow border border-gray-200 rounded w-96 mx-auto'>
					<h3 className='my-5 text-center font-bold text-2xl'>Log In</h3>
					{
						errorMsg !== "" && (
							<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
								{errorMsg}
							</div>
						)
					}
					<form onSubmit={handleSubmit}>
						<div className="mb-6">
							<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
							<input onChange={handleChange} name='username' type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
						</div>
						<div className="mb-6">
							<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
							<input type="password" onChange={handleChange} name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
						</div>
						<button type="submit" disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-500 disabled:cursor-wait focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
