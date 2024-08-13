import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import env from "react-dotenv";

function AccountForm() {
  const { uname } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });

  useEffect(() => {
    // Nếu có id, fetch dữ liệu tài khoản từ database để hiển thị lên form
    if (uname) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      };
      fetch(`http://${env.API_SERVER}:3000/getUserByUsername`, {method: 'POST', headers: headers, body: JSON.stringify({ username: uname })})
        .then((res) => {return res.json()})
        .then((data) => {
          setAccount(data.data);
        }).catch((err) => {
          console.log(err);
        });
      
    }
  }, [uname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (uname) {}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    await fetch(`http://${env.API_SERVER}:3000/createUser`, {method: 'POST', headers: headers, body: JSON.stringify({ username: account.username, password: account.password, email: account.email, name: account.name, role: "user" })})
      .then((res) => {return res.json()})
      .then((res) => {
        alert("Register/update success!");
      }).catch((err) => {
        console.log(err);
      });
    navigate('/quan-ly');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{uname ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h1>
      <div>
        <label htmlFor="name">Họ & Tên:</label>
        <input
          type="text"
          id="name"
          value={account.name}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="username">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          value={account.username}
          disabled={uname ? true : false}
          onChange={(e) => setAccount({ ...account, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
        />
      </div>
      <button type="submit">Lưu</button>
    </form>
  );
}

export default AccountForm;