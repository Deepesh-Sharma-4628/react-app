import React, { useContext, useState } from 'react';
import Logo from '../assets/logobukabuku.png';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { ContextProvider } from '../helpers/context';
import notInterceptor from 'axios';
import { getInitials } from '../helpers/constant';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
	const { setIsLogin } = useContext(ContextProvider);
	const navigateTo = useNavigate();
	const { isLogin } = useContext(ContextProvider);
	const [menu, setMenu] = useState(false);
	const { loginWithRedirect } = useAuth0();
    const { logout,isAuthenticated } = useAuth0();
	const menuHandler = () => {
		setMenu(!menu);
	};

	const logOutHandler = async () => {
		try {
			await notInterceptor.delete('https://hms-backend-recreate.herokuapp.com/logout');
			setIsLogin({ nama: '', id: null, status: false });
			localStorage.removeItem('isLogin');
			navigateTo('/');
		} catch (error) {
			console.log(error);
		}
	};
	const EditUserHandler = async () => {
		navigateTo('/EditUser');
	};

	return (
		<div className="flex my-4  tablet:justify-between w-full tablet:my-4 desktop:z-20">
			<div className="w-1/2">
				
			</div>
			{!isAuthenticated ? (
				<div className="flex gap-2 justify-end w-1/2">
						<button className="bg-merahTua text-white px-2 py-1 rounded-md" onClick={() => loginWithRedirect()}>Log In</button>
					
				</div>
			) : (
				<div className="flex gap-2 justify-end w-1/2">
					<Link to="/home">
						<button className="bg-merahTua text-white px-3 py-2 rounded-md" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Log Out</button>
					</Link>
					<div className="w-10 h-10 bg-yellow-300 rounded-full">
						<p onClick={menuHandler} className="w-full h-full relative hover:cursor-pointer flex justify-center items-center text-lg text-white font-medium">
							{getInitials(isLogin.nama)}
						</p>
						{menu && (
							<div className="bg-blue-400 z-20 mt-1 rounded-md w-[180px] py-2 absolute right-0 top-11">
								<ul className="flex flex-col gap-2">
									<Link to="/">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Book List</li>
									</Link>
									<Link to="/pinjambuku">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Borrow Books</li>
									</Link>
									<Link to="/kembalikanbuku">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Return Book</li>
									</Link>
									<Link to="/history_peminjaman">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Loan History</li>
									</Link>
									
								</ul>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
