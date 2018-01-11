import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import {hashHistory} from 'react-router';
import styles from './ProductItem.less';
import {Card, Tag} from 'antd';
import movieDefaultImg from '../assets/images/movie.jpg'


import {host, timeAgo} from '../utils/filters';

const {Meta} = Card;

const MovieItem = ({item}) => {
  const {
    productId,
    imageUrl,
    category,
    rating,
    price,
    soldCnt,
    title,
  } = item;

  const gotoProduct = () => {
    hashHistory.push(`/product/${productId}`)
  }

  return (
    <div className={styles.normal}>
      <div className={styles.container}>
        <div className={styles.poster} onClick={gotoProduct}>
          <img alt="example" className={styles.inner} src={item.imageUrl || movieDefaultImg}/>
        </div>
        <div className={styles.background}>
          <div onClick={gotoProduct} className={styles.title}>{item.title}
            <span className={styles.score}> ({parseInt(item.rating * 10) / 10})</span></div>
          <div className={styles.meta}>
            <span>Category: </span><Tag>{item.category}</Tag>
          </div>
          <div className={styles.meta}>
            <span><Link to={`/product/${item.productId}`}>{item.soldCnt}</Link> sold.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MovieItem;
