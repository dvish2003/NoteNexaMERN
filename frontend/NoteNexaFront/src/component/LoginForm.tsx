import { useState } from "react";
import type {formUser} from "../models/User.ts";

export default function LoginForm() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const[userForm,setUserForm] = useState<formUser>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
    };
const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
        ...prev,
        [name]: value
    }));
}

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(
            "Registering user with details: ",
            userForm.name,
            userForm.email,
            userForm.password,
            userForm.confirmPassword
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="space-x-4">
                <button onClick={toggleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Login
                </button>
                <button onClick={toggleRegister} className="px-4 py-2 bg-green-600 text-white rounded">
                    Register
                </button>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                        <h2 className="text-xl font-semibold mb-4">Login</h2>
                        <input

                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 mb-3 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 mb-4 border rounded"
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
                        <button onClick={toggleLogin} className="mt-3 text-sm text-gray-500 hover:underline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegister && (
                <form onClick={handleRegisterSubmit}>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h2 className="text-xl font-semibold mb-4">Register</h2>
                            <input
                                value={userForm.name}
                                type="text"
                                name={"name"}
                                placeholder="Username"
                                onChange={handleUserFormChange}
                                className="w-full px-3 py-2 mb-3 border rounded"
                            />
                            <input
                                value={userForm.email}
                                type="email"
                                name={"email"}
                                placeholder="Email"
                                onChange={handleUserFormChange}
                                className="w-full px-3 py-2 mb-3 border rounded"
                            />
                            <input
                                value={userForm.password}
                                type="password"
                                name={"password"}
                                placeholder="Password"
                                onChange={handleUserFormChange}
                                className="w-full px-3 py-2 mb-4 border rounded"
                            />
                            <input
                                value={userForm.confirmPassword}
                                type="Conform password"
                               name = {"confirmPassword"}
                                placeholder="Conform Password"
                                onChange={handleUserFormChange}
                                className="w-full px-3 py-2 mb-4 border rounded"
                            />
                            <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
                            <button onClick={toggleRegister} className="mt-3 text-sm text-gray-500 hover:underline">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
