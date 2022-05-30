import { Navbar, Container, Nav, Row, Col, Card, ButtonToolbar } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { lazy, Suspense ,useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeOrder } from './store/orderSlice.js';
import { closeDaumPost, delPostCode, delPostAdr } from './store/postSlice';
import data from './Js/data.js'
import styles from './CSS/App.module.css';
import Main from './Router/Main.js';
import Detail from './Router/Detail.js'
import Cart from './Router/Cart.js';
import Error from './Router/Error.js'
import Event from './Router/Event.js'

// const Detail = lazy(() => import('./Router/Detail.js'));
// const Cart = lazy(() => import('./Router/Cart.js'));
// import axios from 'axios';

function App() {
  const [ shoes, setShoes ] = useState(data);
  const [ rending, setRending ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  let latelyList = JSON.parse(localStorage.getItem('lately'));
  
  const latelyDel = () => {
    latelyList = [];
    localStorage.setItem('lately', JSON.stringify(latelyList));
    setRending(a => !a);
  };
  // data get, post
  // const moreView = () => {
    //   axios.get('https://codingapple1.github.io/shop/data2.json')
    //     .then(result => {
      //       const copy = [...shoes, ...result.data];
  //       setShoes(copy);
  //     });
  // };
  
  useEffect(() => {
    // App.js에 useEffect는 사이트에 접속했을 때 한 번만 실행되기 때문에 localStorage가 유지된다.
    // localStorage는 문자만 저장할 수 있기 떄문에 object나 array를 json 형식으로 변환해주어야 한다.
    // 불러올때에도 다시 변환해주어야한다.
    if (localStorage.key(0) !== 'lately')
      localStorage.setItem('lately', JSON.stringify( [] ));
    }, []);

  return (
    <div>
      {
        latelyList === null || latelyList.length === 0
        ? null
        : <div className={ styles.lately }>
          <p onClick={() => navigate('/cart')}>CART<span>{ cart.length }</span></p>
          <p>최근본상품</p>
          {
             latelyList.reverse().map(id => {
                return (
                  <div onClick={()=> navigate(`/detail/${id}`)} className={ styles.img_box } key={ id }>
                    <img src={ shoes[id].img } />
                  </div>
                  );
              })
          }
          <button onClick={ latelyDel }>전체삭제</button>
          </div>
      }
      <Navbar bg="light" variant="light" id={styles.header} onClick={() => {
        dispatch(delPostCode());
        dispatch(delPostAdr());
        dispatch(closeDaumPost());
        dispatch(closeOrder());
      }}>
        <Container>
          <Navbar.Brand onClick={ () => navigate('/') } className={styles.logo}>
            <img src='https://cdn.pixabay.com/photo/2014/04/02/16/59/boot-307587_960_720.png' />
            JShoes
          </Navbar.Brand>
          <Nav className={ styles.menu }>
            <Nav.Link onClick={ () => navigate('/event') }>EVENT</Nav.Link>
            <Nav.Link onClick={ () => navigate('/cart') }>CART</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Suspense fallback={ <h1>로딩중입니다.</h1> }> */}
      <Routes>
        {/* 지정 된 경로 외의 모든 페이지. (404 Error) */}
        <Route path='*' element={<Error />} />
        
        {/* main */}
        <Route path='/' element={<Main shoes={shoes} />} />
        
        {/* detail */}
        <Route path='/detail/:id' element={<Detail shoes={ shoes } />} />
        
        {/* event (Nested Routes) */}
        <Route path='/event' element={ <Event /> }>
          <Route path='one' element={ <><br/><h3>첫 주문시 양배추즙 서비스</h3></> }/>
          <Route path='two' element={ <><br/><h3>생일기념 쿠폰 받기</h3></> }/>
        </Route>

        {/* cart */}
        <Route path='/cart' element={ <Cart /> } />
      </Routes>
      {/* </Suspense> */}

      <footer>
        <p>JShoes made by Jo June Hee</p>
        <p>junehi1015@naver.com</p>
        <a href='https://github.com/junehee1015'>https://github.com/junehee1015</a>
      </footer>
    </div>
  );
}

export default App;
