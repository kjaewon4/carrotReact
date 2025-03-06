import React from 'react';
import { BsDisplay } from 'react-icons/bs';

const Styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
    }
};

export default function Item(props) {
    return (
        <div>
            <h3>상품 상세 보기</h3>
            <div style={Styles.container}>
                <img src={props.img} alt="상품 이미지" style={{ width: "300px", height: "300px", objectFit: "contain" }} />
                <div>
                    <h1>{props.title}</h1>
                    <h3>가격: {props.price}원</h3>
                </div>
            </div>
            <h4 style={{ textAlign: 'start' }}>상품 세부 정보</h4>
            <p style={{ textAlign: 'start' }}>{props.body}</p>
        </div>
    );
}