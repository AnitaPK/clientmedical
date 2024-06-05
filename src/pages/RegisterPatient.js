import React from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const RegistrationPatient = () => {
  const onFinish = (values) => {
    console.log('***');
    // Convert dateOfbirth to the required format (if needed)
    if (values.dateOfbirth) {
      values.dateOfbirth = values.dateOfbirth.format('YYYY-MM-DD');
    }

    // Prepare data to send as key-value pairs
    const payload = {
      patientName: values.patientName,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      age: values.age,
      dateOfbirth: values.dateOfbirth,
      bloodGroup: values.bloodGroup,
      email: values.email,
      password: values.password,
      address: values.address,
    };

    axios.post('http://localhost:4000/api/patient/addPatient', payload)
      .then((response) => {
        console.log('Success:', response.data);
        message.success('Registration successful!');
      })
      .catch((error) => {
        // console.error('There was an error!', error.message);
        message.error('Registration failed!');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 400 }}
      >
        <Form.Item
          name="patientName"
          label="Name"
          rules={[{ required: false, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: false, message: 'Please input your Phone Number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: false, message: 'Please select your Gender!' }]}
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
          rules={[{ required: false, message: 'Please input your Age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="dateOfbirth"
          label="Date of Birth"
          rules={[{ required: false, message: 'Please select your Date of Birth!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="bloodGroup"
          label="Blood Group"
          rules={[{ required: false, message: 'Please input your Blood Group!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: false, message: 'Please input your Email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: false, message: 'Please input your Password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: false, message: 'Please input your Address!' }]}
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

export default RegistrationPatient;
