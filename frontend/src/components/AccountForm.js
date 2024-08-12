import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AccountForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    // Nếu có id, fetch dữ liệu tài khoản từ database để hiển thị lên form
    if (id) {
      // fetch(`/api/accounts/${id}`)
      //   .then((res) => res.json())
      //   .then((data) => setAccount(data));
      // Ví dụ:
      const account = { id: 1, username: 'user1', email: 'user1@example.com' };
      setAccount(account);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm/sửa tài khoản, ví dụ: gửi dữ liệu lên API
    if (id) {
      // PUT /api/accounts/:id
    } else {
      
        
    }
    navigate('/quan-ly');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h1>
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