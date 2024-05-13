import { useAxiosStore } from "../stores/AxiosStore";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth() as any;
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));

    const refresh = async () => {
        getAxiosInstance()
        .get('/refresh', {
            withCredentials: true
        })
        .then(response => {
            setAuth((prev: any) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken }
            })
            return response.data.accessToken;
        }
        )
    }

    return refresh;
}

export default useRefreshToken;