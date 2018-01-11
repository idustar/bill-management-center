import { Form, Input, InputNumber, Button, Rate } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'order/edit',
          payload: {...values, time: this.props.order.time, orderId: this.props.order.id },
        })
      }
    });
    this.props.onClose();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { order } = this.props;

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
          label="Product Id"
        >
          {getFieldDecorator('productId', {
            initialValue: order.productId,
            rules: [{
              required: true, message: 'Please input product id!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Customer Id"
        >
          {getFieldDecorator('customerId', {
            initialValue: order.customerId,
            rules: [{
              required: true, message: 'Please input customer id!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Base Price"
        >
          {getFieldDecorator('basePrice', {
            initialValue: order.basePrice,
            rules: [{
              required: true, message: 'Please input base Price!',
            }],
          })(
            <InputNumber min={0} max={100000000} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Discount Rate"
        >
          {getFieldDecorator('discountRate', {
            initialValue: order.discountRate,
            rules: [{ required: true, message: 'Please input discount rate!' }],
          })(
            <InputNumber min={0} max={1} step={0.01} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Product Count"
        >
          {getFieldDecorator('productCnt', {
            initialValue: order.productCnt,
            rules: [{ required: true, message: 'Please input product count!' }],
          })(
            <InputNumber min={0} max={10000} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Rating"
        >
          {getFieldDecorator('rating', {
            initialValue: order.rating,
            rules: [{ required: true, message: 'Please input rating!' }],
          })(
            <Rate />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Generate Order</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
