import "../css/Form.css";
import { useState } from 'react';

const SignInForm = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsername(username.trim());
        setPassword(password.trim());
        if (!username || !password) {
            alert('All fields are required');
            return;
        }
        onLogin(username, password);
    };

    return (
        <section className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Username:
                </label>
                <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label className="form-label">
                    Password:
                </label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="form-button" type="submit">Log In</button>
            </form>
        </section>
    );
}

export default SignInForm;