import { useEffect, useState } from 'react';
import styles from './../CSS/App.module.css';
import { Card_component, Empty_card } from '../Component/Card_component.js';
import { useSelector } from 'react-redux';

function Main({ shoes }) {
  const emptyCard = () => {
    let num = 0;
    while (shoes.length % 5 !== 0) shoes.push({ num: num++ });
  };
  emptyCard();

  return (
    <>
      <div className={styles.main_banner}></div>
      <div className={ styles.card_container }>
        {
          shoes.map((val, i) => {
            return (
              val.num !== undefined
              ? <Empty_card key={ i } />
              : <Card_component
              key={ i }
              id={ val.id }
              picture={ val.img }
              title={ val.title }
              price={ val.price }
              />
            );
          })
        }
      </div>
      <div style={{ width: '70%', margin: '0 auto', textAlign: 'center' }}>
        {/* <button style={{ padding: '1rem 2rem' }} onClick={ fn }>더보기</button> */}
      </div>
    </>
  );
}

export default Main;