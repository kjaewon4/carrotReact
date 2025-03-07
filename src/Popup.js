import React, { useState, useEffect } from 'react';
import { BiX } from "react-icons/bi";
import Item from './Item';
import NoImg from "./default.png";
import axios from "axios";

const Styles = {
    wrapper: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    },
    popupContent: {
        backgroundColor: 'white',
        width: '700px',
        height: '650px',
        maxHeight: '900px',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',  // overflow가 발생하면 스크롤을 활성화
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        cursor: 'pointer',
        border: 'none',
        background: 'none'
    },
    item: {
        textAlign: 'center',  // 텍스트 중앙 정렬
        display: 'block'
    },
    inputBox: {
        padding: '10px',
        fontSize: '15px',
        border: '1px solid black',
        borderRadius: '5px',
        marginBottom: '30px',
        width: '300px',
        height: '30px'
    },
    textAreaBox: {
        padding: '10px',
        fontSize: '20px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '100%',
        minHeight: '150px',
        flexGrow: 1,  // flexbox에서 전체 공간 차지
        boxSizing: 'border-box',
        resize: 'vertical',  // 세로로 크기 조절 가능
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botton: {
        border: '0',
        float: 'right',
        borderRadius: '10px',
        boxShadow: '3px 3px 5px lightgray',
        width: '100px',
        height: '40px',
        backgroundColor: '#FF6E01'
    }
}

const Popup = ({ mode, data, closePopup, onCreate, onUpdate }) => {

    const [previewImg, setPreviewImg] = useState(NoImg);
    if (!mode) return null;

    return (
        <div style={Styles.wrapper} onClick={closePopup}>
            <div style={Styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <button style={Styles.closeButton} onClick={() => {
                    if (closePopup) closePopup(); // closePopup 함수가 있을 때만 실행
                }}>
                    <BiX />
                </button>
                {mode === "ITEM" && (
                    <Item img={data.img} price={data.price} title={data.title} body={data.description} />
                )}


                {mode === "CREATE" && (
                    <div>
                        <h3>상품 등록</h3>
                        <form onSubmit={(evt) => {
                            evt.preventDefault();
                            const title = evt.target.title.value;
                            const price = evt.target.price.value;
                            const description = evt.target.description.value;
                            const file = evt.target.img.files[0];

                            const parsedPrice = parseInt(price.replace(/,/g, ""), 10);
                            if (isNaN(parsedPrice)) {
                                alert("잘못 입력하셨습니다");
                                return;
                            }

                            if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = function () {
                                    // onCreate 호출
                                    onCreate(reader.result, title, parsedPrice, description);
                                };
                            } else {
                                // 이미지가 없으면 기본 이미지 사용
                                onCreate(NoImg, title, parsedPrice, description);
                            }
                        }}>
                            <div style={Styles.container}>
                                <div style={Styles.imgDiv}>
                                    <img
                                        src={previewImg !== NoImg ? previewImg : NoImg}
                                        alt="미리보기"
                                        style={{ width: "300px", height: "300px", objectFit: "contain" }}
                                    />
                                    <input
                                        type='file'
                                        name='img'
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => setPreviewImg(reader.result);
                                            } else {
                                                setPreviewImg(NoImg);
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <p>상품명</p>
                                    <input type='text' name="title" style={Styles.inputBox} placeholder='상품명' />
                                    <p>가격</p>
                                    <input type='text' name="price" style={Styles.inputBox} placeholder='숫자만 입력' />
                                </div>
                            </div>
                            <p>상세설명</p>
                            <textarea name="description" style={Styles.textAreaBox} />
                            <input type='submit' value="글쓰기" style={Styles.botton} />
                        </form>
                    </div>
                )}

                {data && mode === "UPDATE" && (
                    <div>
                        <h3>상품 수정</h3>
                        <form onSubmit={(evt) => {
                            evt.preventDefault();
                            const title = evt.target.title.value;
                            const price = evt.target.price.value;
                            const description = evt.target.description.value;
                            const file = evt.target.img.files[0];
                            const defaultImg = data?.img || NoImg;

                            const parsedPrice = parseInt(price.replace(/,/g, ""), 10);
                            if (isNaN(parsedPrice)) {
                                alert("잘못 입력하셨습니다");
                                return;
                            }

                            if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = function () {
                                    console.log("onUpdate 호출됨"); // 디버깅

                                    onUpdate(data.id, reader.result, title, price, description);
                                };
                            } else {
                                onUpdate(data.id, defaultImg, title, price, description);
                            }
                        }}>
                            <div style={Styles.container}>
                                <div>
                                    <img
                                        src={previewImg !== NoImg ? previewImg : data?.img}
                                        alt="미리보기"
                                        style={{ width: "300px", height: "300px", objectFit: "contain" }}
                                    />
                                    <input
                                        type='file'
                                        name='img'
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => setPreviewImg(reader.result);
                                            } else {
                                                setPreviewImg(NoImg);
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <p>상품명</p>
                                    <input
                                        type='text'
                                        name="title"
                                        style={Styles.inputBox}
                                        defaultValue={data?.title}
                                    />
                                    <p>가격</p>
                                    <input
                                        type='text'
                                        name="price"
                                        style={Styles.inputBox}
                                        defaultValue={data?.price}
                                    />
                                </div>
                            </div>
                            <p>상세설명</p>
                            <textarea
                                name="description"
                                style={Styles.textAreaBox}
                                defaultValue={data?.description}
                            />
                            <input type='submit' value="수정하기" style={Styles.botton} />
                        </form>
                    </div>
                )}

            </div>
        </div>

    );
};

export default Popup;
