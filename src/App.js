import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main'; // 메인 페이지 컴포넌트
import Popup from './Popup'; // 팝업 컴포넌트 (상품 등록 등)
import Content from './Content'; // 콘텐츠 컴포넌트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path='/main' element={<Main />}></Route>
        <Route path="/create" element={<Popup mode="CREATE" />} /> {/* 상품 등록 팝업 */}
        <Route path="/like" element={<Content />} /> {/* 좋아요 목록 */}
        <Route path="/item/:id" element={<Popup mode="ITEM" />} /> {/* 상품 상세 페이지 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
