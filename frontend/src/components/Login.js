import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("okokok")
    // Xử lý đăng nhập, ví dụ: kiểm tra username/password với database
    // Nếu đăng nhập thành công, gọi hàm onLogin()
    if (password == "hieuvo") {
      onLogin();
    }
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