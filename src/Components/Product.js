import { List, Card, Table, Descriptions } from 'antd';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { ColContext } from '../App'
import httpClient from "../http-common";
import Modal from 'antd/lib/modal/Modal';

const { Meta } = Card;
const columns = [
  {
    title: 'productId',
    dataIndex: 'productId',
    key: 'productId',
    render: text => <a>{text}</a>,
  },
  {
    title: 'ProductTitle',
    dataIndex: 'productTitle',
    key: 'productTitle',
  },
  {
    title: 'Colour',
    dataIndex: 'colour',
    key: 'colour',
  },
  {
    title: 'productType',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: 'category',
    dataIndex: 'category',
    key: 'category',
  },
];
const Product = () => {
  const [products, setProducts] = useState([]);
  const [productWithDetail, setProproductWithDetail] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { value } = useContext(ColContext);
  const productRef = useRef(products);

  const init = () => {
    httpClient.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })

  }

  const ShowMore = (e, pId) => {
    setShowMoreInfo(true);
    setProproductWithDetail(products.find(ele => ele.productId === pId));
  }


  useEffect(() => {
    init();
  }, []);

  return (
    (!value) ?
      <Table columns={columns} dataSource={products} expandable={{
        expandedRowRender: products => <p style={{ margin: 0 }}>Product Sub Category : {products.subCategory}</p>,
      }} />
      :
      <>
        <List
          grid={{ gutter: 8, column: 4 }}
          dataSource={products}
          renderItem={products => (
            <List.Item onClick={(e) => ShowMore(e, products.productId)} key={products.productId}>
              <Card
                hoverable
                style={{ width: 340, marginLeft: 50 }}
                cover={<img alt="example" src={products.imageURL} />}
              >
                <Meta title={products.productTitle} description={products.category} />
              </Card>
            </List.Item>
          )}

        />
        <Modal ref={productRef} visible={showMoreInfo} onOk={() => setShowMoreInfo((false))} onCancel={() => setShowMoreInfo((false))}>
          <Descriptions title="Product Info">
            <Descriptions.Item label="Title">{productWithDetail.productTitle}</Descriptions.Item>
            <Descriptions.Item label="category">{productWithDetail.category}</Descriptions.Item>
            <Descriptions.Item label="subCategory">{productWithDetail.subCategory}</Descriptions.Item>
            <Descriptions.Item label="productType">{productWithDetail.productType}</Descriptions.Item>
            <Descriptions.Item label="Gender">{productWithDetail.gender}</Descriptions.Item>
            <Descriptions.Item label="Usage">{productWithDetail.use}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
  )

}
export default Product;