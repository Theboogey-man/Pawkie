import React, { useContext } from 'react';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { useForm } from 'react-hook-form';

const Registration = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            image: data.image,
                        };
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userInfo),
                        })
                            .then((res) => res.json())
                            .then(() => {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully Signed Up!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                navigate('/');
                            });
                    })
                    .catch((error) => console.log(error));
            });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7B385] px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:flex md:items-center md:justify-between">
                <div className="hidden md:block w-1/2">
                    <h1 className="text-4xl font-bold text-[#49312C]">Join Us Today!</h1>
                    <p className="mt-4 text-gray-600">Create an account to explore our platform.</p>
                </div>
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Phone</label>
                            <input
                                type="text"
                                {...register("phone", { required: true })}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Profile Image URL</label>
                            <input
                                type="text"
                                {...register("image", { required: true })}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter image URL (imgbb preferred)"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#49312C] focus:outline-none"
                                placeholder="Enter a strong password"
                            />
                            {errors.password && (
                                <p className='text-red-600 text-sm mt-1'>
                                    Password must be 6-20 characters, include a capital letter, a number, and a special character.
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-[#F7B385] bg-[#49312C] rounded-lg hover:bg-[#F7B385] transition-all">
                            Sign Up
                        </button>
                    </form>
                    <SocialLogin />
                    <p className="mt-4 text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-[#F7B385] hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;