import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth() as any;

    const logout = () => {
        setAuth({});
        navigate('/');
    }

    return (
        <section>
            <h1>Home</h1>
            <Link to="/signin">Go to sign in</Link>
            <br />
            <Link to="/lists">Go to lists</Link>
            <br />
            <Link to="/users">Go to users</Link>
            <br />
            <button onClick={logout}>Sign Out</button>
        </section>
    )
}

export default Home;