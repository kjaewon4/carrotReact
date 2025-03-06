import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import './Main.css';
import Nav from './Nav';
import Content from './Content';
import Popup from './Popup';
import Like from './Like';
import logo from './logo.png';
import banner from './banner.png';
import axios from "axios";

export default function Main() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();  // URL 변경을 위한 navigate

  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then((res) => {
        console.log("items : "+ res.data); 
        setItems(res.data)
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [mode, setMode] = useState('LIST');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nextId, setNextId] = useState(5);

  const openPopup = () => {
    setIsPopupOpen(true);
    navigate('/create');  // /create로 URL 변경하여 팝업 열기
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setMode('LIST');
    navigate('/');  // 모드가 LIST일 때 메인 페이지로 돌아가기
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const handleCreate = (img, title, price, description) => {
    axios.post('/addItem', {
      img: img,
      title: title,
      price: parseInt(price),
      description: description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('상품 등록 성공', response.data);

        const newTopic = {
          id: nextId,
          img: img,
          title: title,
          price: price,
          body: description,
          like: false
        };

        const newTopics = [...items, newTopic];
        setItems(newTopics);
        setNextId(nextId + 1);
        navigate('/');  // 상품 등록 후 메인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error('상품 등록 실패', error);
      });
  };

  const onCreate = (img, title, price, description) => {
    handleCreate(img, title, price, description);

    const newTopic = {
      id: nextId,
      img: img,
      title: title,
      price: price,
      body: description,
      like: false
    };

    const newTopics = [...items, newTopic];
    setItems(newTopics);
    setMode('LIST');
    setNextId(nextId + 1);

    navigate('/main'); 
  };
  

  let content = null;

  if (mode === 'LIKE') {
    content = <Like items={items} setItems={setItems} />;
  } else if (mode === 'CREATE') {
    content = (
      <Popup
        mode="CREATE"
        onCreate={onCreate}
        closePopup={closePopup}
      />
    );
  } else if (mode === 'ITEM') { // 상세페이지
    content = (
      <Popup
        mode="ITEM"
        data={items}
        closePopup={closePopup}
      />
    );
  } else if (mode === 'LIST') {
    content = <Content items={items} setItems={setItems} onDelete={handleDelete} />;
  }

  return (
    <div className='container'>
      <div className='Main'>
        <div className='titleBox'>
          <h2 className='title'><img src={logo} alt="로고" />TEMTEMU</h2>
        </div>
        <div className='container2'>
          <img src={banner} alt="배너" className='banner' />
        </div>
        <Nav mode={mode} setMode={setMode} />
        {content}
      </div>
    </div>
  );
}
