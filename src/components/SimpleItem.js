import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import styles from './SimpleItem.less';
import {Card, Tooltip} from 'antd';
import { hashHistory } from 'react-router';

import {host, timeAgo} from '../utils/filters';


const SimpleItem = ({item}) => {

  const {
    customerId,
    orderCnt
  } = item;

  const goto = () => {
    hashHistory.push(`customer/${customerId}`);
  }

  return (
    <div className={styles.normal}>
      <Tooltip placement="bottom" title={customerId}>
      <Card title={customerId} bordered={false} onClick={goto}>
        {orderCnt?`${orderCnt} ${orderCnt === 1?'orders':'order'}.`:'no order.'}</Card>
      </Tooltip>
    </div>
  );
};

SimpleItem.propTypes = {
};

export default SimpleItem;
