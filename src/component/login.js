import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const history = useHistory();

    const handleLogin = () => {
        // Perform authentication logic here (e.g., check credentials against a database)
        if (username === 'admin' && password === 'password') {
            // Redirect to the dashboard on successful login
            // history.push('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
