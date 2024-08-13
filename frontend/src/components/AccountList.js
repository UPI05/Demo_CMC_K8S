import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import env from "react-dotenv";

function AccountList() {
  const [accounts, setAccounts] = useState([]);

  const handleDelete = (id) => {

    setAccounts(accounts.filter((account) => account._id !== id));
    // Delete
  };


  useEffect(() => {
    fetch(`http://${env.API_SERVER}:3000/users`)
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

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
                <button onClick={() => handleDelete(account._id)}>Xóa</button>
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