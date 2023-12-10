import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {login} from "../util/api";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const {setAuth} = useAuth();
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .required('Username is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required')
        }),
        onSubmit: async (values) => {
            try{
                const response = await login(values.username, values.password);
                const accessToken = response.data;
                const username = values.username;
                const password = values.password;
                setAuth({username, password, accessToken});
                setLoginError(null);
                navigate(from, {replace: true});
            }catch (error){
                setLoginError("Invalid username or password");
            }
        },

    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Logowanie</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block font-semibold">Nazwa użytkownika:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            required
                            className="w-full border rounded-full py-2 px-3 mt-1"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500 mt-2">{formik.errors.username}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-semibold">Hasło:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            required
                            className="w-full border rounded-full py-2 px-3 mt-1"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-2">{formik.errors.password}</div>
                        )}
                    </div>
                    <div>
                        <button type="submit" disabled={formik.isSubmitting} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600">
                            Zaloguj się
                        </button>
                        {loginError && (
                            <div className="text-red-500 mt-2">{loginError}</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
