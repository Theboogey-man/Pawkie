import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName

                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })

            })

    }
    return (
        <div>
            <div className='divider px-6'></div>
            <div className=" ">

                <button onClick={handleGoogleSignIn} className="btn ml-8 px-[66px]">
                    <FaGoogle></FaGoogle>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;