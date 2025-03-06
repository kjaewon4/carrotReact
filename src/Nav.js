import React, {useState} from 'react'

export default function Nav({ mode, setMode }) {
  const [activeLink, setActiveLink] = useState(mode); // 활성화된 링크 상태 관리

  const handleClick = (event, linkMode) => {
    event.preventDefault();
    setMode(linkMode);
    setActiveLink(linkMode); // 클릭한 링크의 상태 업데이트
  };

  return (
    <div className='Nav'>
      <a href="/create"
        className={activeLink === 'LIST' ? 'active' : ''}
        onClick={(event) => handleClick(event, 'LIST')}>전체상품
      </a>
      {/* <span> | </span>
       <a href="/create"
        className={activeLink === 'COMMU' ? 'active' : ''}
        onClick={(event) => handleClick(event, 'COMMU')}>커뮤니티
      </a> */}
      <span> | </span>
      <a href="/create"
        className={activeLink === 'CREATE' ? 'active' : ''}
        onClick={(event) => handleClick(event, 'CREATE')}>상품 등록
      </a>
      <span> | </span>
      <a href="/like"
        className={activeLink === 'LIKE' ? 'active' : ''}
        onClick={(event) => handleClick(event, 'LIKE')}>찜 목록
      </a>
    </div>
  )
}

