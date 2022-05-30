import { Card } from 'react-bootstrap';
import styles from './../CSS/App.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Card_component({ id, picture, title, price }) {
  const navigate = useNavigate();

  const onClick = () => {
    // json 형식의 배열 형태
    let getLately = localStorage.getItem('lately');
    // 배열로 변환
    getLately = JSON.parse(getLately);
    // 배열에 선택한 id 값 저장
    getLately.push(id);
    // 다시 localStorage에 배열을 저장
    const set = new Set(getLately);
    localStorage.setItem('lately', JSON.stringify([...set]));

    navigate(`/detail/${id}`);
  };

  return (
    <Card onClick={ onClick } className={ styles.card }>
      <Card.Img variant="top" src={ picture } />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text><strong>{ price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") } 원</strong></Card.Text>
      </Card.Body>
    </Card>
  );
}

function Empty_card() {
  return (
    <Card className={ styles.empty_card }>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}

export {Card_component, Empty_card};