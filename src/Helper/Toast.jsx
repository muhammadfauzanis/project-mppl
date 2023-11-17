import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
	const showToastSuccess = (msg) => {
		toast.success(msg, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const showToastError = (msg) => {
		toast.error(msg, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	return {
		showToastSuccess,
		showToastError
	};
}