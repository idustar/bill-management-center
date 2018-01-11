import { Form, Input, InputNumber, Button, Rate } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.props.type === 'edit') {
        if (!err) {
          this.props.dispatch({
            type: 'product/edit',
            payload: {...values, productId: this.props.product.productId},
          })
          this.props.onClose();
        }
      } else {
        if (!err) {
          this.props.dispatch({
            type: 'product/create',
            payload: {...values},
          })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { product } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Title"
        >
          {getFieldDecorator('title', {
            initialValue: product.title,
            rules: [{
              required: true, message: 'Please input title!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Image Url"
        >
          {getFieldDecorator('imageUrl', {
            initialValue: product.imageUrl,
            rules: [{
              required: true, message: 'Please input image url!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Price"
        >
          {getFieldDecorator('price', {
            initialValue: product.price,
            rules: [{
              required: true, message: 'Please input price!',
            }],
          })(
            <InputNumber min={0} max={100000000} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Category"
        >
          {getFieldDecorator('category', {
            initialValue: product.category,
            rules: [{ required: true, message: 'Please input category!' }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Inventory Count"
        >
          {getFieldDecorator('inventoryCnt', {
            initialValue: product.inventoryCnt,
            rules: [{ required: true, message: 'Please input inventory count!' }],
          })(
            <InputNumber min={0} max={10000000} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Generate Product</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
