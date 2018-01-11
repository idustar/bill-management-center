import React, {PropTypes} from 'react';
import Masonry from 'react-masonry-component';
import styles from './ItemList.less';
import Spinner from './Spinner';
import MovieItem from './ProductItem';
import {Row, Col, Tag} from 'antd';


class ItemList extends React.Component {
  delTag(type, e) {
    const ft = this.props.filter;
    ft[type] = '';
    if (type === 'start') {
      ft.end = '';
    }
    this.props.dispatch({type: 'search/searchFor', payload: ft});
  }

  constructor(props) {
    super(props);
    this.state = {
      hiveTime: '-'
    }
  }


  componentDidMount() {
    const {query} = this.props.location;
    this.props.dispatch({
      type: 'product/fetchList',
      payload: query,
    })
  }

  render() {
    const {loading, list, dispatch, location} = this.props;
    return (
      <div className={styles.normal}>
        <Spinner loading={loading}/>
        <div className={styles.nav}>
          <div className={styles['nav-container']}>
            <div className={styles.route}>Search Result</div>
            <div>
              Count: {list.length || 0}
            </div>
            <div className={styles.right}>Products</div>
          </div>
        </div>

        {location.query.title || location.query.category ?
          <div className={styles.header}>
            <div>
              {location.query.title ? <div>
                <Tag color="#f50">Title</Tag>
                <h1>{location.query.title}</h1>
              </div> : null}
              {location.query.category ? <div>
                <Tag color="#108ee9">Category</Tag>
                <h1>{location.query.category}</h1>
              </div> : null}
            </div>
          </div> : null}

        <div className={styles.results}>
          {list && list.length ?
            <Row gutter={0}>
              <Masonry
                className={styles.gallery} // default ''
                elementType={'div'} // default 'div'
                options={{transitionDuration: 5}} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
              >
                {
                  list.map(item =>
                    <Col
                      xs={{span: 8}} lg={{span: 6}} key={item.productId}>
                      <MovieItem className={styles.item} item={item}/></Col>)
                }
              </Masonry></Row> : (loading ?
              <div className={styles.tip}>Searching...</div> :
              <div className={styles.tip}>Not Found</div>)
          }
        </div>
      </div>
    );
  };
}

export default ItemList;
