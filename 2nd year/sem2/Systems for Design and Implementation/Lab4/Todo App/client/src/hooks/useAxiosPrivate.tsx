import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
//import useAuth from './useAuth';
import { useAxiosStore } from '../stores/AxiosStore';
import { parseCookies, setCookie } from 'nookies';

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    //const { auth } = useAuth() as any;
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
    const instance = getAxiosInstance();

    useEffect(() => {
        const requestIntercept = instance.interceptors.request.use(
            (config) => {
                const cookies = parseCookies();
                const token = cookies['accessToken'];
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?._retry) {
                    prevRequest._retry = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        setCookie(null, 'accessToken', newAccessToken, {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                        })
                        return instance(prevRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            instance.interceptors.request.eject(requestIntercept);
            instance.interceptors.response.eject(responseIntercept);
        }
    }, [refresh, getAxiosInstance]);

    return instance;
}

export default useAxiosPrivate;