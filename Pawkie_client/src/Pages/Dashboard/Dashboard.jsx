import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { FaEdit, FaHistory, FaShoppingCart, FaMedal } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                const response = await fetch(`http://localhost:5000/users/${user.email}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load your profile data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchUserData();
        }
    }, [user, authLoading]);

    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const handleUpdateSuccess = (updatedData) => {
        setUserData(updatedData);
        setShowEditModal(false);
    };

    if (authLoading || loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (!user) return <div className="flex justify-center items-center h-screen">Please login to view your dashboard</div>;

    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    if (!userData) return <div className="text-center p-4">No user data found</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#49312C] text-white p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">My Dashboard</h1>
                            <button
                                onClick={handleEditProfile}
                                className="bg-[#F7B385] text-[#49312C] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e9a776] transition-all"
                            >
                                <FaEdit /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="p-6 md:flex gap-6">
                        <div className="md:w-1/3 mb-4 md:mb-0 flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-[#F7B385]">
                                <img
                                    src={userData.image || user.photoURL || "https://placehold.co/400x400?text=Profile"}
                                    alt={userData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-center">{userData.name || user.displayName}</h2>
                            <p className="text-gray-600 text-center">{userData.email}</p>
                            <p className="text-gray-600 text-center">{userData.phone}</p>

                            <div className="mt-4 bg-[#F7B385] bg-opacity-20 p-3 rounded-lg w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <FaMedal className="text-[#F7B385]" />
                                    <p className="font-semibold">Loyalty Points: {userData.loyaltyPoints || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Adoption History */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FaHistory className="text-[#49312C]" />
                                        <h3 className="font-semibold">Adoption History</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {userData.adoptions?.length ?
                                            `You have adopted ${userData.adoptions.length} pets` :
                                            "You haven't adopted any pets yet"}
                                    </p>
                                </div>

                                {/* Purchase History */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FaShoppingCart className="text-[#49312C]" />
                                        <h3 className="font-semibold">Purchase History</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {userData.purchases?.length ?
                                            `You have made ${userData.purchases.length} purchases` :
                                            "You haven't made any purchases yet"}
                                    </p>
                                </div>

                                {/* Care Center Bookings */}
                                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FaHistory className="text-[#49312C]" />
                                        <h3 className="font-semibold">Care Center Bookings</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        {userData.bookings?.length ?
                                            `You have ${userData.bookings.length} bookings` :
                                            "You don't have any care center bookings"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <EditProfileModal
                    userData={userData}
                    onClose={() => setShowEditModal(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default Dashboard;