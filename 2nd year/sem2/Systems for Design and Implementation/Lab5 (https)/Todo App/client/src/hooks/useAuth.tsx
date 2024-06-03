import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    const { auth } = useContext(AuthContext) as any;
    useDebugValue(auth, auth => auth?.username ? "Authenticated" : "Not authenticated");
    return useContext(AuthContext);
}

export default useAuth;