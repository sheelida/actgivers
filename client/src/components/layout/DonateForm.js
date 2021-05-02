
import React, { useState }  from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const DonateForm = (data) => {
  const [success, setSuccess ] = useState()
  const onFinish = async (values) => {
    const res = await axios({
      method: 'post',
      url: '/api/donate',
      data: {
        charityName: data.props,
        ...values
      }
    }).catch((err)=>{
      setSuccess({ res: false, message: 'Missing field, please restart the process'})
    })
    if(res?.status === 200){
      setSuccess({ res: true, message: res.data})
    } 
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Name" style={{ marginBottom: 0 }}>
        <Form.Item
          name="fName"
          rules={[
            { 
              required: true,  message: 'First name is required', min: 3, max: 60 
            }
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lName"
          rules={[
            { 
              required: true, message: 'Last name is required', min: 3, max: 60 
            }
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 10px' }}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Giver Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please input the amount!',
            min: 1, max: 10
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="Number"
        name="ccNumber"
        rules={[
          {
            required: true,
            message: 'Please input your card number!',
            min: 14, max: 16
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Expired Date" style={{ marginBottom: 0 }}>
        <Form.Item
          name="ccExpMonth"
          rules={[{ required: true, message: 'Month is required',  min: 2, max: 2 }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', }}
        >
          <Input placeholder="Month" />
        </Form.Item>
        <span> / </span>
        <Form.Item
          name="ccExpYear"
          rules={[{ required: true, message: 'Year is required', min: 2, max: 2 }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0' }}
        >
          <Input placeholder="Year" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Cvv"
        name="cvv"
        rules={[
          {
            required: true,
            message: 'Please input your card cvv',
            min: 3, 
            max: 3
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Donate
        </Button>
      </Form.Item>
      { success ? <Alert message={success.message} type={success.res ? "success" : "error"}/> : null }
    </Form>
  );
};
