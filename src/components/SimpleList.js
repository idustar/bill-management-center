import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'dva/router';
import {Breadcrumb} from 'antd';
import styles from './SimpleList.less';
import Spinner from './Spinner';
import SimpleItem from './SimpleItem';
import {Row, Col, Tag} from 'antd';
import Masonry from 'react-masonry-component';


class SimpleList extends React.Component {
  render() {
    const {loading, items, location, dispatch} = this.props;
    return (
      <div className={styles.normal}>
        <Spinner loading={loading}/>
        <div className={styles.nav}>
          <div className={styles['nav-container']}>
            <div className={styles.route}>Search Result</div>
            <div>
              Count: {items.length || 0}
            </div>
            <div className={styles.right}>Customers</div>
          </div>
        </div>


        <div className={styles.results}>
          {items && items.length ?
            <Row gutter={0}>
              <Masonry
                className={styles.gallery} // default ''
                elementType={'div'} // default 'div'
                options={{transitionDuration: 0, transitionProperty: ''}} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                {
                  items.map((item, index) => <Col xs={{span: 8}} lg={{span: 6}} key={index}>
                    <SimpleItem className={styles.item} item={item}/></Col>)
                }
              </Masonry></Row> : (loading ?
              <div className={styles.tip}>Searching...</div> :
              <div className={styles.tip}>Not Found</div>)
          }
        </div>
      </div>
    );
  };
};

export default SimpleList;
