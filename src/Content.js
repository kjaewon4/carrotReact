import React, { useState } from 'react';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Popup from './Popup';

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

  const handleUpdate = (id, img, title, price, description) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, img, title, price, description } : item
      )
    );
    closePopup();
  };

  return (
    <>
      <div className='Content'>
        {items.map((item) => (
          <div className='contentBox' key={item.id}>
            <img src={item.img} alt={item.title} onClick={() => openPopup(item)} />
            <h3 className='item-title' title={item.title} onClick={() => openPopup(item)}>{item.title}</h3>
            <h5 className='item-price'>
              {item.price}원
              <span 
                onClick={() => toggleLike(item.id)} 
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
              >
                {item.liked ? <FaStar className="liked-icom"/> : <CiStar className="liked-icom"/>}
            </span>
            </h5>
            <div style={{ float: 'right', marginRight: '6px', paddingLeft: '6px'}}>
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
