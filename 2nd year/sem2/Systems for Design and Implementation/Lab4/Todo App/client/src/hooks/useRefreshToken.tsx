import { useAxiosStore } from "../stores/AxiosStore";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth() as any;
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));

    const refresh = async () => {
        try {
            const response = await getAxiosInstance().get('/refresh', {
                withCredentials: true
            });

            setAuth((prev: any) => {
                console.log(prev)
                console.log(response.data.accessToken)
                return { ...prev, accessToken: response.data.accessToken }
            });

            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return Promise.reject(error);
        }
    }

    return refresh;
}

export default useRefreshToken;