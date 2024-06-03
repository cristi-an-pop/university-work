import useAuth from '../hooks/useAuth';

const RequireRole = ({ role, children } : {
    role: number,
    children: any
} ) => {
    const { auth } = useAuth() as any;
    return auth?.roles?.includes(role) ? children : null;
}

export default RequireRole;