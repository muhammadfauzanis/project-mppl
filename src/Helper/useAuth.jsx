import axios from "axios";
import * as React from "react";
import { Cookies } from 'react-cookie';
import { Helper } from "./Helper";
import { useNavigate } from "react-router-dom";

export function useAuth() {
	let navigate 				= useNavigate();
	const cookie 				= new Cookies();
	const [authed, setAuthed] 	= React.useState(cookie.get("is_auth"));
	const [role, setRole] 		= React.useState('');
	const [user, setUser] 		= React.useState([]);
	const {baseURLAPI}			= Helper();

	const getAuthCookieExpiration = () => {	
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

	const setAsLogin = (data_user) => {
		cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		setAuthed(true);
		if(data_user.id !== user.id){
			setUser(data_user);
			setRole(data_user.role);
		}
	}

	const logout = async () => {
		await axios.post(baseURLAPI("/admin/logout"),{},{withCredentials: true})
		.then(() => {
			cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
			setAuthed(false);
			setRole('');
			setUser([]);
			navigate("/panel/login");
		})
	}

	const checkIsLogin = async () => {
		if(authed){
			await axios.get(baseURLAPI("/admin/user"),{withCredentials: true})
			.then((response) => {
				setAsLogin(response.data)
			}) 
			.catch(() => {
				cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
				setAuthed(false);
				setRole('');
			})
		}else{
			setAuthed(false);
			setRole('');
		}
	}

	React.useEffect(() => {
		checkIsLogin();
	},[user])

	return {
		authed,
		role,
		user,
		logout,
		setAsLogin,
	};
}