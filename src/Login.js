import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    
    useEffect (()=> {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            }
        } catch(err) {
            setError('Invailid login credentials');
        }
    }

    return (
        <div>
            {user ? (
            <div>
                <p>Welcome, {user.name}!</p>
            </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <label>Password: </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sing in</button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </div>
                </form>
            )
        }
        </div>
    )
};

export default Login;