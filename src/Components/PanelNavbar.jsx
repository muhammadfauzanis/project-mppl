import { Link } from "react-router-dom";
import { useAuth } from "../Helper/useAuth";

function PanelNavbar({children,page}) {	

	const {logout,role} 			= useAuth();
	
	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	}

	return (
		<>
			<nav className="ml-0 lg:ml-64 bg-red-300 border-gray-200 dark:bg-gray-900">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
					</a>
					<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center text-sm text-white rounded-lg lg:hidden">
						<span className="sr-only">Open sidebar</span>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
						</svg>
					</button>
				</div>
			</nav>

			<aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0" aria-label="Sidebar">
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<h2 className='mb-3 font-bold text-gray-500 ml-2'>Menu</h2>
					<ul className="space-y-2 font-medium" style={{lineHeight:2}}>
						<li>
							<Link to="/panel/dashboard" className={`flex items-center p-2 group rounded-lg ${page === "dashboard" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
								<svg className={`w-5 h-5 ${page === "dashboard" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/panel/orders" className={`flex items-center p-2 group rounded-lg ${page === "orders" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
								<svg className={`w-5 h-5 ${page === "orders" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Riwayat Order</span>
							</Link>
						</li>
						<li>
							<Link to="/panel/menu" className={`flex items-center p-2 group rounded-lg ${page === "menu" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
								<svg className={`w-5 h-5 ${page === "menu" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Daftar Menu</span>
							</Link>
						</li>
						<li>
							<Link to="/panel/kategori_menu" className={`flex items-center p-2 group rounded-lg ${page === "kategori_menu" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
								<svg className={`w-5 h-5 ${page === "kategori_menu" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
								</svg>
								<span className="ms-3">Kategori Menu</span>
							</Link>
						</li>
						{
							role === "admin" && (
								<>
									<li>
										<Link to="/panel/users" className={`flex items-center p-2 group rounded-lg ${page === "users" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
											<svg className={`w-5 h-5 ${page === "users" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
												<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
												<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
											</svg>
											<span className="ms-3">User</span>
										</Link>
									</li>
								</>
							)
						}
						<li>
							<a href="/#" onClick={handleLogout} className={`flex items-center p-2 group rounded-lg ${page === "logout" ? "text-white bg-red-300 dark:text-white hover:bg-red-400 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
								<svg className={`w-5 h-5 ${page === "" ? "text-white" : "text-gray-500"} transition duration-75 dark:text-gray-400 dark:group-hover:text-white`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
									<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
								</svg>
								<span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>

			<div className="p-4 sm:ml-64">
				{children}
			</div>
		</>
	);
}

export default PanelNavbar;
