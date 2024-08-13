import React, { useEffect, useState } from 'react';
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
    window.location.href = '/';
  };

  const handleLogout = () => {
    alert("Logout success!");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const style = {
    width: '800px',
    margin: '0 auto',
    border: '1px groove green' // Optional: Just to see the boundaries of the component
  };

  return (
    <Router>
      <div style={style}>
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
            <Route path="/quan-ly" element={<AccountList isLoggedIn={isLoggedIn}/>} />
          )}
          <Route path="/dang-nhap" element={<Login onLogin={handleLogin} />} />
          <Route path="/quan-ly/them" element={<AccountForm />} />
          <Route path="/quan-ly/sua/:uname" element={<AccountForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;