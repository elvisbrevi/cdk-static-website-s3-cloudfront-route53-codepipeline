import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

interface IUser {
  username: string;
  password: string;
}

const Post: React.FC = () => {
  const [user, setUser] = useState<IUser>({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e:any) => {
      if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = JSON.stringify({
        "username": user.username,
        "password": user.password
    });
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://blogapi.elvisbrevi.com/authUser',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    axios.request(config).then((response) => {
      localStorage.setItem(
        'accessToken', 
        JSON.stringify(response.data.AuthenticationResult.AccessToken)
      );
      setIsLoggedIn(true);
    }).catch((error) => {
        setError('Invalid username or password');
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Bienvenido</h2>
          <button onClick={handleLogout}>Logout</button>
          <Editor
            tinymceScriptSrc="https://cdn.tiny.cloud/1/a0yvsscea1edxhxayp09gfv025kdjav8p1jszkia5thzsq7q/tinymce/6/tinymce.min.js"
            init={{
                plugins: ['lists link image paste help wordcount'],
                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
            }}
            />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={user.username} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={user.password} onChange={handleChange} />
          </label>
          <button type="submit">Login</button>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Post;
