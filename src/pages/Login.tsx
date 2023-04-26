import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiCall from '../components/ApiCall/ApiCall';

const Login: React.FC = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate username and password
    if (username === '1' && password === '1') {
      // save authentication state to localStorage
      localStorage.setItem('token', 'true');
      setAuthenticated(true);
    }
  };

  if (authenticated) {
    navigate(-1);
  }

  return (
    <form onSubmit={handleLogin}>
        <label>
            Username:
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <ApiCall 
            url="https://blogapi.elvisbrevi.com/posts?limit=100" 
            method="GET" 
            data={{ title: 'test', content: 'test', date: '01-01-01' }} 
            render={({ response, error, loading, callApi }) => {
              if (loading) {
                return <p>Loading...</p>;
              }
              if (error) {
                return <p>{error.message}</p>;
              }
              if (response) {
                return <p>Response data: {response.data}</p>;
              }
              return <button onClick={callApi}>Call API</button>;
        }} />
    </form>
  );
};

export default Login;
