import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import logo from './logo.png';


function Sign() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();  // URL 변경을 위한 navigate


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호가 일치하지 않으면 경고
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 회원가입 정보 객체 생성
        const user = {
            email,
            password
        };

        try {
            // axios를 사용하여 POST 요청 보내기
            const response = await axios.post('http://localhost:8080/sign', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true  // 쿠키를 전송할 때 사용

            });

            if (response.status === 200) {
                alert('회원가입 성공');
                navigate("/main");
                // 회원가입 성공 후 다른 동작 (예: 로그인 화면으로 이동)
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('회원가입 실패');
        }
    };

    return (

        <>
            <div className='titleBox' style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <h2 className='title'><img src={logo} alt="로고" />TEMTEMU</h2>

                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <a href="/login"
                        className='login'>로그인
                    </a>
                    <span> | </span>
                    <a href="/sign"
                        className="sign">회원가입
                    </a>
                </div>
            </div>

            <div className="auth-container">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='이메일'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='비밀번호'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='비밀번호 확인'
                            required
                        />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </>
    );
}

export default Sign