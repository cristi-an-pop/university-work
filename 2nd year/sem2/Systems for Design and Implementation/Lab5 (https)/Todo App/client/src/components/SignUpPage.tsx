import "../css/FormPage.css";
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAxiosStore } from '../stores/AxiosStore';

const SignUpPage = () => {
    const { getAxiosInstance } = useAxiosStore(state => ({ getAxiosInstance: state.getAxiosInstance }));
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSignup = async (username: string, password: string, email: string) => {
        getAxiosInstance()
        .post('/auth/signup', { username, password, email })
        .then(() => {
            setSuccess(true);
        })
        .catch((error) => {
            console.error('Error on Signup:', error);
            if(!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrMsg('Username is already taken');
            } else {
                setErrMsg('Sign Up Failed');
            }
        });
    };

    return (
        <>
            { success ? (
                <section>
                    <h1>Success!</h1>
                    <p>Your account has been created. You can now <Link to='/signin'> sign in</Link>. </p>
                </section>
            ) : (
                <section>
                    <h1 className="header-title">Sign Up</h1>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <SignUpForm onSignup={handleSignup} />
                </section> 
            )}
        </>
    );
};

export default SignUpPage;