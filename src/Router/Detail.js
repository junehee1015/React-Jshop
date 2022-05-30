import { Button, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, allDel } from './../store/cartSlice.js';
import { openOrder, closeOrder } from './../store/orderSlice.js';
import Order_Componenet from './../Component/Order_component.js';
import styles from './../CSS/App.module.css';

function Detail({ shoes }) {
  
  // useParams()
  // Route의 path에 id 값을 받아온다.
  const { id } = useParams();
  const [ show, setShow ] = useState(true);
  const [ amount, setAmount ] = useState(0);
  const [ tabs, setTabs ] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  // const store = useSelector(state => state);

  const onChange = (e) => {
    setAmount(e.target.value);
    if (!(/^[0-9]+$/).test(e.target.value)) e.target.value = '';
  };
  const cart = () => {
    if (window.confirm('장바구니에 추가하시겠습니까?')) {
      const input = document.querySelector('input');
      if (amount === 0) {
        alert('수량을 입력해주세요.');
        input.focus();
      } else {
        dispatch(addCart({
          id: shoes[id].id,
          img: shoes[id].img,
          title: shoes[id].title,
          price: shoes[id].price,
          amount: Number(amount)
        }));
        input.value = '';
        if (window.confirm('장바구니로 이동하시겠습니까?')) navigate('/cart');
      }
    }
  };
  const clickOrder = () => {
    const input = document.querySelector('input');
    if (amount === 0) {
      alert('수량을 입력해주세요.');
      input.focus();
    } else {
      input.value = "";
      dispatch(openOrder());
      setTimeout(() => {
        setAmount(0);
      }, 100);
    }
  };

  useEffect(() => {
    if (!(/^[0-9]+$/).test(amount) && amount !== '') {
      alert('숫자만 입력할 수 있습니다.');
      setAmount(0);
    }
  }, [ amount ]);
  
  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, []);

  return (
    <>
      { order ? <Order_Componenet
        img={ shoes[id].img }
        title={ shoes[id].title }
        price={ shoes[id].price }
        amount={ Number(amount) }/> : null
      }
      { show ? <div className={styles.suprise}>1초 이내 구매시 반값 할인!</div> : null }
      <div className={ styles.detail_container }>
        <div>
          <div className={ styles.img_box }>
            <img src={ shoes[id].img }/>
          </div>
          <div className={ styles.detail_info }>
            <h1>{ shoes[id].title }</h1>
            <div className={ styles.desc }>
              <h3>{ shoes[id].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") } 원</h3>
            </div>
            <div className={ styles.btn_box }>
              <input type="text" placeholder='수량' maxLength={ 2 } onChange={ onChange } />
              <Button variant="white" className={ styles.cart } onClick={ cart }>장바구니</Button>
              <Button variant="danger" className={ styles.order } onClick={ clickOrder }>주문하기</Button>
            </div>      
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link-1" className={ styles.tabs }>
            <Nav.Item>
              <Nav.Link onClick={ () => setTabs(1) } eventKey="link-1">상세정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={ () => setTabs(2) } eventKey="link-2">구매후기</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={ () => setTabs(3) } eventKey="link-3">QnA</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabComponent tabs={ tabs } contents={ shoes[id].content }/>
      </div>
    </>
  );
}

export default Detail;


function TabComponent({ tabs, contents }) {
  const [trans, setTrans] = useState('hide');

  useEffect(() => {
    setTimeout(() => setTrans('show'), 100);

    return () => setTrans('hide');
  }, [ tabs ]);

  if (tabs === 1) return <div className={`${styles.contents} ${trans}`}>{ contents }</div>
  else if(tabs === 2) return <div className={`${styles.contents} ${trans}`}>구매후기</div>
  else if (tabs === 3) return <div className={`${styles.contents} ${trans}`}>QnA</div>

  // if 대신 Array를 사용하여 코드를 만들 수도 있다. (tabs를 0부터 시작)
  // return [<div>상세정보</div>, <div>구매후기</div>, <div>QnA</div>][tabs];
}