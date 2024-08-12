import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AccountList() {
  const [accounts, setAccounts] = useState([
    // Danh sách tài khoản mẫu
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
  ]);

  const handleDelete = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <div>
      <h1>Quản lý tài khoản</h1>
      <Link to="/quan-ly/them">Thêm tài khoản</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>
                <Link to={`/quan-ly/sua/${account.id}`}>Sửa</Link> |{' '}
                <button onClick={() => handleDelete(account.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;