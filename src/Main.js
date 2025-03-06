import React, { useState, useEffect } from 'react';
import './Main.css';
import Nav from './Nav';
import Content from './Content';
import Popup from './Popup';
import Like from './Like';
import logo from './logo.png';
import banner from './banner.png';
import axios from "axios";


export default function Main() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/hello")
      .then((res) => setMessage(res.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const [items, setItems] = useState([
    { id: 1, img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/da570debbdddb304fa54cdee563cb06d.jpg?imageView2/2/w/800/q/70/format/webp", title: "RC 괴산기", price: 34961, body: '설명1', like: false },
    { id: 2, img: "https://img.kwcdn.com/product/open/efe92f973b264d7a9f15009491d244cd-goods.jpeg?imageView2/2/w/800/q/70/format/webp", title: "미니 드리프트 레이싱카", price: 49934, body: '설명2', like: false },
    { id: 3, img: "https://img.kwcdn.com/product/fancy/0898bc4e-7100-46bd-859f-42984261c236.jpg?imageView2/2/w/800/q/70/format/webp", title: "크레인 블록 세트", price: 19457, body: '설명3', like: false },
  ]);

  const [newItem, setNewItem] = useState({
    id: 0,
    img: "",
    title: "",
    price: "",
    body: "",
    like: false
  });

  const [mode, setMode] = useState('LIST');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nextId, setNextId] = useState(5); // 초기 ID를 5로 설정
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setMode('LIST');
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const handleCreate = (img, title, price, description) => {
    axios.post('/addItem', {
      img: img,  // 이미지 파일 대신 URL을 문자열로 전달
      title: title,
      price: parseInt(price), // 가격을 숫자로 변환
      description: description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('상품 등록 성공', response.data);

        // 서버 응답이 성공적이면 상태 업데이트
        const newTopic = {
          id: nextId,
          img: img,  // 이미지 URL 그대로 저장
          title: title,
          price: price,
          body: description,
          like: false
        };

        // 상태 업데이트 로직이 필요하면 추가
      })
      .catch((error) => {
        console.error('상품 등록 실패', error);
      });
  };


  const onCreate = (img, title, price, description) => {
    // 서버에 상품 등록 데이터를 전송
    handleCreate(img, title, price, description);

    // 상태 업데이트 (새로운 항목을 추가)
    const newTopic = {
      id: nextId,
      img: img,
      title: title,
      price: price,
      body: description, // 'body'로 변경
      like: false
    };

    // 기존 항목에 새로운 항목을 추가
    const newTopics = [...items, newTopic];

    // 상태 업데이트
    setItems(newTopics);
    setMode('LIST');
    setNextId(nextId + 1);  // ID 증가
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
  } else if (mode === 'ITEM') {
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
        <h1>{message}</h1>
        {content}
      </div>
    </div>
  );
}
