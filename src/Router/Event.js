import { useNavigate, Outlet } from 'react-router-dom';
import styles from '../CSS/App.module.css';

function Event() {
  const navigate = useNavigate();

  return (
    <div className={ styles.event }>
      <h1>오늘의 이벤트</h1>
      <button onClick={ () => navigate('../event/one') }>1</button>
      <button onClick={ () => navigate('../event/two') }>2</button>
      
      {/* Outlet : Nested Routes를 사용하였을 때 element가 들어가는 자리 */}
      <Outlet />
    </div>
  );
}

export default Event;