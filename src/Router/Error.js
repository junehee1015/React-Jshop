import styles from '../CSS/App.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeOrder } from './../store/orderSlice.js';

function Error() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={ styles.error }>
      <h1> 404 </h1>
      <h3>page not found</h3>
      <br/>
      <p>페이지를 찾을 수 없습니다.</p>
      <h5 onClick={() => {
        navigate(-1);
        dispatch(closeOrder());
      }}>뒤로가기</h5>
    </div>
  );
}

export default Error;