import * as React from "react";
import { Cookies } from 'react-cookie';
import { Navigate, useNavigate } from "react-router-dom";

const authContext = React.createContext();

export function useAuth() {
	let navigate 				= useNavigate();
	const cookie 				= new Cookies();
	const [authed, setAuthed] 	= React.useState(cookie.get("is_auth"));
	const [role, setRole] 		= React.useState(cookie.get("role"));

	const getAuthCookieExpiration = () => {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

	const setAsLogin = (role) => {
		cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		cookie.set('role', role, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		setAuthed(true);
		setRole(role);
	}

	const logout = () => {
		cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		cookie.remove('role', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
		setAuthed(false);
		setRole('');
	}

	return {
		authed,
		role,
		logout,
		setAsLogin,
	};
}

export function AuthProvider({ children }) {
	const auth = useAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
	return React.useContext(authContext);
}