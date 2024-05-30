import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, Select, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;

const DashboardDoctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const doctorName = location.state?.user?.doctor?.name || 'Guest';

  useEffect(() => {
    axios.get('http://localhost:4000/v1/allAppointments')
      .then(response => {
        console.log('API Response:', response.data); // Log the API response
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);

  const handleLogout = () => {
    message.success('Logout successful!');
    navigate('/doctor-login');
  };

  const handleStatusChange = (appointmentId, status) => {
    axios.put(`http://localhost:4000/v1/appointment/${appointmentId}`, { status })
      .then(response => {
        message.success('Status updated successfully!');
        setAppointments(appointments.map(appointment => 
          appointment.id === appointmentId ? { ...appointment, status } : appointment
        ));
      })
      .catch(error => {
        console.error('There was an error updating the status!', error);
        message.error('Failed to update status.');
      });
  };

  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'DateTime',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Accepted">Accepted</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleStatusChange(record.id, 'Accepted')}>
          Get Appointment
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo" style={{ color: 'white', fontWeight: 'bold' }}>MyLogo</div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="user" icon={<UserOutlined />}>
            {doctorName}
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 16 }}>
        <div className="site-layout-content">
          <h2>Appointments</h2>
          <Table
            dataSource={appointments}
            columns={columns}
            rowKey="id"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardDoctor;
