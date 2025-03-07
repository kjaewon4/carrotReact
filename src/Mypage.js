import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용


const Mypage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // URL 변경을 위한 navigate

    useEffect(() => {
        // 백엔드에서 로그인된 사용자 정보를 가져오는 API 호출
        axios.get('http://localhost:8080/profile', { withCredentials: true })
            .then((response) => {
                // 성공적으로 사용자 정보를 받으면 상태 업데이트
                setUser(response.data);
            })
            .catch((error) => {
                setError('로그인된 사용자가 없습니다.');
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <a href="/login"
                    className='login'>로그인
                </a>
                <span> | </span>
                <a href="/sign"
                    className="sign">회원가입
                </a>
                <span> | </span>
                <a href="/mypage"
                    className="mypage">마이페이지
                </a>
            </div>
            <div className="my-page">
                <h2>마이페이지</h2>
                <div className="user-info">
                    <p><strong>이메일:</strong> {user.email}</p>
                    <p><strong>이름:</strong> {user.name}</p>
                    <p><strong>가입일:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="user-actions">
                    <button>회원 정보 수정</button>
                    <button>로그아웃</button>
                </div>
            </div>
        </>
    );
};

export default Mypage;
