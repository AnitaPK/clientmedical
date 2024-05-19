import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const DoctorLogin = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/v1/doctors')
      .then(response => {
        console.log('respons.data',response.data);
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the doctors!', error);
      });
  }, []);

  const onFinish = (values) => {
    const { email, password } = values;
    const doctor = doctors.find(doc => doc.email === email && doc.password === password);

    if (doctor) {
      message.success('Login successful!');
      // Perform login actions (e.g., redirect to dashboard, set auth token)
    } else {
      message.error('Invalid email or password!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="doctorLogin"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 400 }}
      >
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

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorLogin;
