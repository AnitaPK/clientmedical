import React, { useState, useEffect } from 'react';
import { Table, Button, Layout, Menu, Modal, Form, Select } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const DashboardDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, id } = location.state;

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/allAppointments', {
        params: { doctorId: id },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const showStatusModal = (appointment) => {
    setCurrentAppointment(appointment);
    setIsModalVisible(true);
    form.setFieldsValue({ status: appointment.status });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:4000/api/appointments/${currentAppointment._id}`, {
        status: values.status,
      });
      fetchAppointments(); // Refresh appointments after update
      setIsModalVisible(false);
      setCurrentAppointment(null);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentAppointment(null);
  };

  const handleLogout = () => {
    navigate('/doctor-login');
  };

  const columns = [
    { title: 'Sr No', dataIndex: 'srNo', key: 'srNo', render: (text, record, index) => index + 1 },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Date Time', dataIndex: 'appointmentDateTime', key: 'appointmentDateTime' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => showStatusModal(record)}
        >
          Change Status
        </Button>
      ),
    },
  ];

  const dataSource = appointments.map((appointment, index) => {
    const patient = patients.find((p) => p._id === appointment.patientId);
    return {
      ...appointment,
      srNo: index + 1,
      patientName: patient ? patient.name : 'Unknown',
    };
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', fontSize: '20px' }}>Logo</div>
        <div style={{ color: 'white' }}>
          {user}
          <Button type="link" onClick={handleLogout} style={{ marginLeft: '20px', color: 'white' }}>
            Logout
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Dashboard</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '20px' }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="_id"
            />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Change Appointment Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default DashboardDoctor;
