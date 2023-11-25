import axios from "axios";
import * as React from "react";
import { Cookies } from 'react-cookie';
import { Helper } from "./Helper";
import { useNavigate } from "react-router-dom";

export function useAuth() {
	let navigate 				= useNavigate();
	const cookie 				= new Cookies();
	const [authed, setAuthed] 	= React.useState(cookie.get("is_auth"));
	const [role, setRole] 		= React.useState(cookie.get("role"));
	const {baseURLAPI}			= Helper();

	const getAuthCookieExpiration = () => {	
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

	const setAsLogin = (user) => {
		cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		cookie.set('role', user.role, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		setAuthed(true);
		setRole(user.role);
	}

	const logout = async () => {
		await axios.post(baseURLAPI("/admin/logout"),{},{withCredentials: true})
		.then(() => {
			cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
			cookie.remove('role', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
			setAuthed(false);
			setRole('');
			navigate("/panel/login");
		})
	}

	const loginUserOnStartup = async () => {
		if(location.pathname.split('/')[1] === "panel"){

			if(authed){
				await axios.get(baseURLAPI("/admin/user"),{withCredentials: true})
				.then((response) => {
					setAsLogin(response.data)
				}) 
				.catch(() => {
					cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
					cookie.remove('role', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
					setAuthed(false);
					setRole('');
					navigate("/panel/login");
				})
			}else{
				setAuthed(false);
				setRole('');
				navigate("/panel/login");
			}
		}

	}

	return {
		authed,
		role,
		logout,
		setAsLogin,
		loginUserOnStartup
	};
}