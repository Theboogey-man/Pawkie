import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import logo from "../../../assets/logo_2.png"

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to={'/'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Home</Link></li>
        <li><Link to={'/adoption'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Adoption</Link></li>
        <li><Link to={'/missingfeed'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Missing Pets</Link></li>
        <li><Link to={'/accessories'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Accessories</Link></li>
        <li><Link to={'/medical'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Medical Assistance</Link></li>
        <li><Link to={'/dashboard'} className="text-[#F5E3D9] font-semibold hover:text-white transition-colors duration-200">Dashboard</Link></li>
    </>

    return (
        <div className="navbar max-w-full mx-100 ml-10">
            <div className="navbar-start flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-15 w-auto object-contain" />
                    </Link>
                </div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F7B385]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-[#FFFFFF] rounded-box z-10 mt-3 w-52 p-2 shadow text-[#F7B385]">
                        {navOptions}
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex ml-50">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {navOptions}
                </ul>
            </div>
            <div className='navbar-end space-x-2 mr-20'>
            {user ? (
                <button onClick={handlelogout} className='btn bg-[#CD346C] text-[#F5E3D9] border-0 hover:bg-[#F6C7CF] hover:text-[#CD346C] transition'>
                Logout
                </button>
            ) : (
            <>
                <Link to="/login" className='btn bg-[#CD346C] text-[#F5E3D9] border-0 hover:bg-[#F6C7CF] hover:text-[#CD346C] transition'>
                Login
                </Link>
                <Link to="/register" className='btn bg-[#CD346C] text-[#F5E3D9] border-0 hover:bg-[#F6C7CF] hover:text-[#CD346C] transition'>
                SignUp
                </Link>
            </>
            )}
            </div>
        </div>
    );
};

export default Navbar;
