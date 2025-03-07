import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'; 
import Main from './Main'; // 메인 페이지 컴포넌트
import Popup from './Popup'; // 팝업 컴포넌트 (상품 등록 등)
import Content from './Content'; // 콘텐츠 컴포넌트
import Login from "./Login";
import Sign from "./Sign";
import axios from "axios";

// Main 페이지 접근 시 로그인 여부를 확인하고, 로그인하지 않았다면 로그인 페이지로 리다이렉트
function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    axios.get('http://localhost:8080/checkSession', { withCredentials: true })
      .then((response) => {
        if (response.data.includes("Logged in as")) {
          setIsLoggedIn(true);
        } else {
          navigate('/login');  // 로그인 안 된 경우 로그인 페이지로 리다이렉트
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        navigate('/login');  // 에러 발생 시 로그인 페이지로 리다이렉트
      });
  }, [navigate]);

  if (!isLoggedIn) {
    return null;  // 로그인 상태가 아니면 아무 것도 렌더링하지 않음
  }

  return children;  // 로그인 상태이면 자식 컴포넌트를 렌더링
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  {/* 기본 페이지로 로그인 페이지 설정 */}
      <Route path="/main" element={
        <ProtectedRoute>
          <Main />  {/* 로그인된 사용자만 접근할 수 있는 Main 페이지 */}
        </ProtectedRoute>
      } />
      <Route path="/create" element={<Popup mode="CREATE" />} /> {/* 상품 등록 팝업 */}
      <Route path="/like" element={<Content />} /> {/* 좋아요 목록 */}
      <Route path="/item/:id" element={<Popup mode="ITEM" />} /> {/* 상품 상세 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
    </Routes>
  );
}

// 최상위에서 BrowserRouter로 앱을 감싸줘야 useNavigate 훅이 제대로 동작
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
