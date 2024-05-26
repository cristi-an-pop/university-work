import "../css/FormPage.css";
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import SignInForm from './SignInForm';
import { useAxiosStore } from "../stores/AxiosStore";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SignInPage = () => {
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));

    const { setAuth } = useAuth() as any;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [errMsg, setErrMsg] = useState('');

    const handleSignin = async (username: string, password: string) => {
        getAxiosInstance()
        .post('/auth/signin', { username, password })
        .then(response => {
            const userid = response.data.userid;
            const accessToken = response.data.accessToken;
            const roles = response.data.roles;
            setAuth({ userid, username, password, accessToken, roles });
            navigate(from, { replace: true });
        })
        .catch((error) => {
            if(!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 401) {
                setErrMsg('Invalid Credentials');
            } else {
                setErrMsg('Sign In Failed');
            }
        });
    };

    return (
        <section>
            <h1>Sign In</h1>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <SignInForm onLogin={handleSignin} />
            <p>
                Need an Account?<br />
                <span>
                    <Link to="/signup">Sign Up</Link>
                </span>
            </p>
        </section>
    );
}

export default SignInPage;