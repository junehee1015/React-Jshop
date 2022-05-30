import styles from './../CSS/App.module.css';
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { delPostCode, delPostAdr, getPostCode, getPostAdr, closeDaumPost } from './../store/postSlice.js';


function DaumPost_component() {
  const dispatch = useDispatch();

  const complete = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    dispatch(getPostCode(data.zonecode));
    dispatch(getPostAdr(fullAddr));
    dispatch(closeDaumPost());
  };
  const postStyle = {
    position: 'absolute',
    height: '100%',
  }
  return (
    <div className={ styles.daumPost_box }>
      <button onClick={() => {
        dispatch(closeDaumPost());
      }}>❌</button>
      <DaumPostcode style={ postStyle } autoClose onComplete={ complete } />
    </div>
  );
}

export default DaumPost_component;