import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import env from "react-dotenv";

function AccountList({ isLoggedIn }) {
  const [accounts, setAccounts] = useState([]);

  const handleDelete = (username) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    fetch(`https://${env.API_SERVER}/deleteUser`, {method: 'DELETE', headers: headers, body: JSON.stringify({ username: username })})
      .then((res) => res.json())
      .then((data) => {
        alert("Delete account success!");
      }).catch((err) => {
        console.log(err);
      });
    setAccounts(accounts.filter((account) => account.username !== username));
    
  };

 

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    fetch(`https://${env.API_SERVER}/getUsers`, {method: 'GET', headers: headers})
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.data);
      }).catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Quản lý tài khoản</h1>
      <Link to="/quan-ly/them">Thêm tài khoản</Link>
      <table>
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
          {accounts && accounts.map((account) => (
            <tr key={account._id}>
              <td>{account.username}</td>
              <td>{account.name}</td>
              <td>{account.email}</td>
              <td>
                <Link to={`/quan-ly/sua/${account.username}`}>Sửa</Link> |{' '}
                <button onClick={() => handleDelete(account.username)}>Xóa</button>
              </td>
            </tr>
          ))}
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;