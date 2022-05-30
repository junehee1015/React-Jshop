import styles from './../CSS/App.module.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeOrder } from './../store/orderSlice.js';
import { openDaumPost, closeDaumPost, delPostCode, delPostAdr } from '../store/postSlice';
import DaumPost_component from './DaumPost_component';

function Order_Componenet({ img, title, price, amount }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(amount);

  const postCode = useSelector(state => state.postCode);
  const postAdr = useSelector(state => state.postAdr);
  const openPost = useSelector(state => state.openPost);
  
  const upCount = () => {
    if (99 > count >= 1) {
      setCount(a => ++a);
    }
  };
  const downCount = () => {
    if (count > 1) {
      setCount(a => --a);
    }
  };
  const clickOrder = () => {
    if (window.confirm('주문하시겠습니까?')) {
      const postCode = document.querySelector('#postCode');
      const detailAdr = document.querySelector('#detailAdr');
      if (postCode.value === "") {
        alert('주소를 입력해주세요.');
        dispatch(openDaumPost());
      } else if (detailAdr.value === "") {
        alert('상세주소를 입력해주세요.');
        detailAdr.focus();
      }
      else {
        dispatch(delPostCode());
        dispatch(delPostAdr());
        navigate('/order');
      }
    }
  };
  const clickCancel = () => {
    dispatch(delPostCode());
    dispatch(delPostAdr());
    dispatch(closeOrder());
  };
  const findPost = () => {
    dispatch(delPostCode());
    dispatch(delPostAdr());
    dispatch(openDaumPost());
  };
  
  return (
    <div className={ styles.order_container }>
      {
        openPost ? <DaumPost_component /> : null
      }
      <div>
        <div className={ styles.img_box }>
          <img src={ img }/>
        </div>
        <div className={ styles.info }>
          <h5>{ title }</h5>
          <div>
            <span>{ price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") } 원</span>
            <div>
              <span>수량<strong>{ count }</strong></span>
              <button onClick={ upCount }>↑</button>
              <span></span>
              <button onClick={ downCount }>↓</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h5>주소</h5>
          <Button onClick={ findPost }>주소찾기</Button>
          <input type='text' maxLength={ 5 } id='postCode' value={ postCode } readOnly />
        </div>
        <input type='text' readOnly value={ postAdr } id='postAdr' />
        <input type='text' placeholder='상세주소를 입력해주세요.' id='detailAdr' />
      </div>
      <div>
        <h5>총 결제금액 <span>{ (price * count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") } 원</span></h5>
      </div>
      <div>
        <Button variant='danger' className={styles.orderBtn} onClick={ clickOrder }>주문하기</Button>
        <Button variant='white' className={ styles.cancelBtn } onClick={ clickCancel }>취소</Button>
      </div>
    </div>
  );
}

export default Order_Componenet;