import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main'; // 메인 페이지 컴포넌트
import Popup from './Popup'; // 팝업 컴포넌트 (상품 등록 등)
import Content from './Content'; // 콘텐츠 컴포넌트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/create" element={<Popup mode="CREATE" />} /> {/* 상품 등록 팝업 */}
        <Route path="/like" element={<Content />} /> {/* 좋아요 목록 */}
        <Route path="/item/:id" element={<Popup mode="ITEM" />} /> {/* 상품 상세 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
