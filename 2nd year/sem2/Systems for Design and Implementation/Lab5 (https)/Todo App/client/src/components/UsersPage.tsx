import { useEffect, useState } from "react";
import { User } from "../types/UserType";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const axios = useAxiosPrivate();
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/auth/users');
            setUsers(response.data as User[]);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handlePromote = (id: string) => async () => {
        try {
            await axios.patch(`/auth/users/${id}/promote`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDemote = (id: string) => async () => {
        try {
            await axios.patch(`/auth/users/${id}/demote`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div>
        <h1>Users</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                <p>{user.username}</p>
                {user.role === 3033 && <span>Admin</span>}
                {user.role === 2022 &&
                 <>
                    <span>Manager</span>
                    <button onClick={handleDemote(user.id)}>Demote</button>
                 </>
                 }
                {user.role === 1011 && 
                 <>
                    <span>User</span>
                    <button onClick={handlePromote(user.id)}>Promote</button>
                 </>
                 }
            </li>
            ))}
        </ul>
        </div>
    );
}

export default UsersPage;
