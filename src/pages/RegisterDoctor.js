import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const RegistrationDoctor = () => {
  const onFinish = (values) => {
    // Prepare data to send as key-value pairs
    const payload = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      age: values.age,
      email: values.email,
      password: values.password,
      address: values.address,
      city: values.city,
      specialist: values.specialist,
    };

    axios.post('http://localhost:4000/api/doctor/addDoctor', payload)
      .then((response) => {
        console.log('Success:', response.data);
        message.success('Registration successful!');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('Registration failed!');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="doctorRegistration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 400 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your Gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input your Age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your Address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input your City!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="specialist"
          label="Specialist"
          rules={[{ required: true, message: 'Please input your Specialist!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationDoctor;
