import React, { useState } from 'react';
import env from "react-dotenv";

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(`http://${env.API_SERVER}:3000/login`, {method: 'POST', headers: headers, body: JSON.stringify({
      username: username,
      password: password
    })})
      .then((data) => {return data.json()})
      .then((data) => {
        if (data.status === 200) {
          alert("Login success!")
          localStorage.setItem("token", data.jwt);
          onLogin();
        } else {
          alert("Login fail!");
        }
      }).catch((err) => {
        console.log(err);
      });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Login;