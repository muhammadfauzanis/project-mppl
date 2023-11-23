import { useEffect } from "react";
import { useAuth } from "../Helper/useAuth";

export const Layout = ({ children }) => {

    const { loginUserOnStartup } = useAuth();

    useEffect(() => {
        loginUserOnStartup();
    }, []);
    return (
        <div>
            { children }
        </div>
    );
};