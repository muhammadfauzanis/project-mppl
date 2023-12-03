import axios from "axios";
import { useEffect, useState } from "react";
import { Helper } from "../Helper/Helper";

function Datatable({config,url}) {

	
	let defaultClassNameHeader  = "px-6 py-3";
	let defaultPageLength 	 	= [10,25,50,100];
	let customConfig 	= config;

	config 	= {
		pageLength : customConfig?.pageLength || defaultPageLength,
		defaultPage : customConfig?.defaultPage || defaultPageLength[0],
		search : {
			placeholder : customConfig?.search?.placeholder || "Search"
		},
		header : customConfig?.header,
		body : customConfig?.body,
		order : customConfig?.order || [config.body[0].data,"ASC"],
	}


	const [data,setDataTable] = useState([]);
	const [isLoading,setIsLoading] = useState(true);
	const [totalPage,setTotalPage] = useState([]);
	const [currentPage,setCurrentPage] = useState(1);
	const [orderByColumn,setOrderByColumn] = useState(config.order[0]);
	const [orderByBehav,setOrderByBehav] = useState(config.order[1].toUpperCase());
	const [limitData,setLimitData] = useState(config.defaultPage);
	const [searchData,setSearchData] = useState('');
	const {baseURLAPI} = Helper();

	const handleData = async () => {
		setIsLoading(true);
		setDataTable([]);
		await axios.get(baseURLAPI(url),{
			withCredentials: true,
			params : {
				limit : limitData,
				offset : (currentPage - 1) * limitData,
				search 	: searchData,
				order : [
					orderByColumn,orderByBehav
				]
			}
		})
		.then((response) => {
			setIsLoading(false);
			setDataTable(response.data.data);

			let totalPageCount = Math.ceil(response.data.totalData / limitData);
			
			let totalPageArr 	= [];
			for(let i=0;i < totalPageCount;i++){
				totalPageArr.push(i+1);
			}

			setTotalPage(totalPageArr);
		})
	}

	useEffect(() => {
		handleData()
	},[limitData,searchData,currentPage,orderByBehav,orderByColumn]);

	return (
		<div className='px-5'>
			<div className='grid grid-cols-2 py-5'>
				<div className='flex items-center'>
					<div className="flex items-center">
						<label className="block mr-3 text-sm font-medium text-gray-900 dark:text-white">Limit</label>
						<select defaultValue={limitData} onChange={e => {setLimitData(e.target.value);setCurrentPage(1)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							{
								config.pageLength.map(e => (
									<option key={e} value={e}>{e}</option>
								))
							}
						</select>
					</div>
					<div className="flex items-center ml-5">
						<label className="block mr-3 text-sm font-medium text-gray-900 dark:text-white">Sort</label>
						<select defaultValue={orderByColumn} onChange={e => setOrderByColumn(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							{
								config.body.map((e,k) => {
									if(e.orderable !== false){
										return (
											<option key={"order_column_"+k} value={e.data}>{config.header[k].title}</option>
										)
									}
								})
							}
						</select>
						<select defaultValue={orderByBehav} onChange={e => setOrderByBehav(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option value="ASC">ASC</option>
							<option value="DESC">DESC</option>
						</select>
					</div>
				</div>
				<div className='flex items-center justify-end'>
					<label className="block mr-3 text-sm font-medium text-gray-900 dark:text-white">Search</label>
					<input value={searchData} onChange={e => setSearchData(e.target.value)} placeholder={config.search.placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				</div>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						{config?.header && (
							<tr>
								{config.header.map((e,key) => (
									<th key={e.title + key} scope="col" className={e.className ? e.className : defaultClassNameHeader}>
										{e.title}
									</th>
								))}
							</tr>
						)}
					</thead>
					<tbody>
						{
							data && (
								<>
									{
										data.map((e,k) => (
											<tr key={"row_"+k} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
												{
													config.body.map((e2,k2) => (
														<td key={"cell_"+k2} className="px-6 py-4">
															{(!e2.render && e2.data) && (
																e[e2.data]
															)
															}
															{e2.render && (
																e2.render(e)
															)}
														</td>
													))
												}
											</tr>
										))
									}
								</>
							)
						}
						
						{ isLoading && (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td colSpan={config?.header && config.header.length} className="px-6 py-4 text-center">
									Loading..
								</td>
							</tr>
						)}
						{ ((!data || data.length == 0) && !isLoading) && (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td colSpan={config?.header && config.header.length} className="px-6 py-4 text-center">
									Data Tidak Ditemukan
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className='py-5'>
				<ul className="flex justify-end items-center -space-x-px h-10 text-base">
					<li key="page_prev">
						<a href="/#" onClick={e => {e.preventDefault(); setCurrentPage(currentPage < 2 ? currentPage-1 : 1)}} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							<span className="sr-only">Previous</span>
							<svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
							</svg>
						</a>
					</li>
					{
						totalPage.map(page => (
							<>
								{page === currentPage && (
									<li key={"page_"+page}>
										<a href="/#"  onClick={e => e.preventDefault()} className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</a>
									</li>
								)}
								{page !== currentPage && (
									<li key={"page_"+page}>
										<a href="/#"  onClick={e => {e.preventDefault(); setCurrentPage(page)}} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
									</li>
								)}
							</>
						))
					}
					<li key="page_next">
						<a href="/#" onClick={e => {e.preventDefault(); setCurrentPage(currentPage < totalPage.length ? currentPage+1 : totalPage.length)}} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							<span className="sr-only">Next</span>
							<svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Datatable;
