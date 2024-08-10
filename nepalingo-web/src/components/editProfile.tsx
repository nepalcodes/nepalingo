import React, { useState } from 'react';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // Handle save logic, like updating the profile data via an API call
        console.log('Updated profile:', { username, email, password });
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 focus:outline-none"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
