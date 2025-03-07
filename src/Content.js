import React, { useState } from 'react';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Popup from './Popup';
import axios from "axios";


export default function Content({ items, setItems, onDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState("");

  const openPopup = (item) => {
    setSelectedItem(item);
    setMode("ITEM");
    setIsPopupOpen(true);
  };

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    setMode("UPDATE");
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
    setMode("");
  };

  const toggleLike = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleUpdate = async (id, img, title, price, description) => {
    try {
      const response = await axios.put(`http://localhost:8080/updateItem/${id}`, {
        img: img,
        title: title,
        price: parseInt(price),
        description: description
      });

      // 백엔드에서 받은 데이터를 그대로 반영
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? response.data : item  // 응답 데이터를 직접 적용
        )
      );
      closePopup();
    } catch (error) {
      console.error("업데이트 오류:", error);
    }
  };

  return (
    <>
      <div className='Content'>
        {items.map((item) => (
          <div className='contentBox' key={item.id}>
            <img src={item.img} alt={item.id} onClick={() => openPopup(item)} />
            <h3 className='item-title' title={item.title} onClick={() => openPopup(item)}>{item.title}</h3>
            <h5 className='item-price'>
              {item.price}원
              <span
                onClick={() => toggleLike(item.id)}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
              >
                {item.liked ? <FaStar className="liked-icom" /> : <CiStar className="liked-icom" />}
              </span>
            </h5>
            <div style={{ float: 'right', marginRight: '6px', paddingLeft: '6px' }}>
              {item.id > 3 && <button className='update-btn' onClick={() => openUpdatePopup(item)}>수정</button>}
              {item.id > 3 && <button className='delete-btn' onClick={() => onDelete(item.id)}>삭제</button>}
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <Popup mode={mode} data={selectedItem} closePopup={closePopup} onUpdate={handleUpdate} />
      )}
    </>
  );
}
