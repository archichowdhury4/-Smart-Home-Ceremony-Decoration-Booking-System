import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://smart-home-ceremony-deccoration-boo.vercel.app'
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
            if (user) {
                const idToken = await user.getIdToken();
                config.headers.Authorization = `Bearer ${idToken}`;
            }
            return config;
        });

        const resInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            error => {
                const statusCode = error.response?.status;
                if (statusCode === 401 || statusCode === 403) {
                    logOut().then(() => navigate('/login'));
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
