import React, {useState} from 'react'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Popup from './Popup';


export default function Like({ items, setItems }) {
     const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);
    
      const openPopup = (item) => {
        console.log("openPopup 실행 - 선택된 아이템:", item);
        setSelectedItem(item);
        setIsPopupOpen(true);
      };
    
      const closePopup = () => {
        console.log("closePopup 실행"); // 디버깅용 로그 추가
        setIsPopupOpen(false);
        setSelectedItem(null);
      };

    const toggleLike = (id) => {
        setItems((prevItem) =>
            prevItem.map((item) =>
                item.id === id ? { ...item, like: !item.like } : item));
    };

    return (
        <>
        <div className='Content'>
          {items
          .filter((item) => item.like)
          .map((item) => (
            <div
              className='contentBox'
              key={item.id}
            >
              <img src={item.img} alt={item.title} onClick={() => openPopup(item)}></img>
              <h3 className='item-title' title={item.title} onClick={() => openPopup(item)}>{item.title}
              </h3>
              <h5 className='item-price'>
                {item.price}원
                <span onClick={() => toggleLike(item.id)}>{item.like ? <FaStar /> : <CiStar />}</span>
              </h5>
            </div>
          ))}
        </div>
  
        {isPopupOpen && (
          <Popup mode='ITEM' data={selectedItem} closePopup={closePopup} />
        )}
      </>
    )
}
