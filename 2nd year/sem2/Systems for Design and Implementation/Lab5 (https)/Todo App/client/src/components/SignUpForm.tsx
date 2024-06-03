import "../css/Form.css";
import { useState } from 'react';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/;
const PASS_REGEX = /^.{6,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignUpForm = ({ onSignup }: { onSignup: (username: string, password: string, email: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsername(username.trim());
        setPassword(password.trim());
        setEmail(email.trim());
        if (!USER_REGEX.test(username)) {
            return;
        }
        if (!PASS_REGEX.test(password)) {
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            return;
        }
        if (!username || !password || !email) {
            alert('All fields are required');
            return;
        }
        onSignup(username, password, email);
        setUsername("");
        setPassword("");
        setEmail("");
    };

    return (
        <section className="form-container">
            <form className="form" onSubmit = {handleSubmit}>
                <label className="form-label">
                    Username:
                </label>
                <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label className="form-label">
                    Password:
                </label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <label className="form-label">
                    Email:
                </label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <button className="form-button" type="submit">Sign Up</button>
            </form>
        </section>
    );
};

export default SignUpForm;