import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7B385] px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:flex md:items-center md:justify-between">
                <div className="hidden md:block w-1/2">
                    <h1 className="text-4xl font-bold text-[#49312C]">Welcome Back!</h1>
                    <p className="mt-4 text-gray-600">
                        Login to your account and continue exploring our services.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-[#49312C] hover:underline">Forgot password?</a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-[#F7B385] font-bold bg-[#49312C] rounded-lg hover:bg-[#F7B385] transition-all">
                            Login
                        </button>
                    </form>
                    <SocialLogin />
                    <p className="mt-4 text-center text-gray-600">
                        New Here? <Link to="/register" className="text-[#F7B385] hover:underline">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;