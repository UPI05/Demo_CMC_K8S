import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import StickyNote from './components/StickyNote';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import './App.css'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/quan-ly">Quản lý</Link>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>Đăng xuất</button>
              </li>
            ) : (
              <li>
                <Link to="/dang-nhap">Đăng nhập</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<StickyNote />} />
          {isLoggedIn && (
            <Route path="/quan-ly" element={<AccountList />} />
          )}
          <Route path="/dang-nhap" element={<Login onLogin={handleLogin} />} />
          <Route path="/quan-ly/them" element={<AccountForm />} />
          <Route path="/quan-ly/sua/:id" element={<AccountForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;