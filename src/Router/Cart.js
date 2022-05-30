import { Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { change, changeName, changeAge, increase } from './../store/userSlice.js';
import { increase, decrease, delCart, allDel } from './../store/cartSlice.js';
import styles from './../CSS/App.module.css';
import { useNavigate } from 'react-router-dom';

function Cart() {

  // 1.
  // const store = useSelector(state => state);
  // console.log("1: " + store.user);
  
  // 2.
  // const user = useSelector(state => state.user);
  // console.log("2: " + user);

  const store = useSelector(state => state);
  const cart = useSelector(state => state.cart);
  const priceArr = [];
  const navigate = useNavigate();
  // store.js로 요청을 보내주는 함수
  const dispatch = useDispatch();

  const cash = (i) => {
    const price = cart[i].price * cart[i].amount;
    priceArr.push(price);

    return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={ styles.cart_container }>
      <Table responsive>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>수량</th>
            <th>상품금액</th>
            {
              cart.length === 0
              ? <th></th>
              : <th><Button variant='white' onClick={() => dispatch(allDel())}>전체삭제</Button></th>
            }
          </tr>
        </thead>
        <tbody>
          {
            cart.length === 0
            ? <tr>
                <td colSpan={ 4 } className={ styles.empty }>상품을 추가해주세요.</td>
              </tr>
            : cart.map((val, i) => 
              <tr key={ i }>
                <td className={ styles.info }>
                  <div>
                    <div className={ styles.img_box }>
                      <img src={ val.img } />
                    </div>
                    <h4 onClick={() => navigate(`/detail/${val.id}`)}>{ val.title }</h4>
                    <span>{val.show_price }</span>
                  </div>
                </td>
                <td className={ styles.amount }>
                  <div>
                    <span>{val.amount}</span>
                    <div>
                      <button onClick={() => dispatch(increase(i))}>↑</button>
                      <span></span>
                      <button onClick={() => dispatch(decrease(i))}>↓</button>
                    </div>
                  </div>
                </td>
                <td className={ styles.cash }>{ cash(i) }원</td>
                <td className={ styles.delete }>
                  <button onClick={ () => dispatch(delCart(i))}>X</button>
                </td>
              </tr>  
            )
          }
        </tbody>
      </Table>
      {
        priceArr.length === 0
        ? null
          : (
            <>
              <h3> 총<span>{priceArr.reduce((a, b) => a + b).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>원</h3>
              <Button variant="danger" className={ styles.order } onClick={() => navigate('/order')}>주문하기</Button>
            </>
          )
      }
    </div>
  );
}

export default Cart;