import React, { useEffect, useState } from 'react';
import { Helper } from '../../Helper/Helper';

function Dashboard() {

	const [errorMsg, setErrorMsg] 	= useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] 	= useState({
		username : '',
		password : '',
	});

	return (
		<>
			<h1>Dashboard</h1>
		</>
	);
}

export default Dashboard;
