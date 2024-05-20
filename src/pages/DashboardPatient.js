import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button, Select, DatePicker, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;

const DashboardPatient = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [timeSlots, setTimeSlots] = useState([]);

  // const userName = location.state?.user?.name || 'Guest';

  useEffect(() => {
    axios.get('http://localhost:4000/v1/doctors')
      .then(response => {
        console.log("**response.data**",response.data);
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the doctors!', error);
      });
  }, []);

  const handleDoctorChange = (value) => {
    setSelectedDoctor(value);
    generateTimeSlots(selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    generateTimeSlots(date);
  };

  const generateTimeSlots = (date) => {
    const slots = [];
    let startTime = moment(date).set({ hour: 10, minute: 0 });
    const endTime = moment(date).set({ hour: 18, minute: 0 });

    while (startTime < endTime) {
      slots.push(startTime.format('HH:mm'));
      startTime = moment(startTime).add(2, 'hours');
    }
    setTimeSlots(slots);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear tokens, redirect to login)
    message.success('Logout successful!');
    navigate('/patient-login');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo" style={{ color: 'white', fontWeight: 'bold' }}>MyLogo</div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="user" icon={<UserOutlined />}>
            {userName}
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 16 }}>
        <div className="site-layout-content">
          <h2>Get Appointment</h2>
          <div style={{ marginBottom: 16 }}>
            <Select
              style={{ width: 300 }}
              placeholder="Select a doctor"
              onChange={handleDoctorChange}
            >
              {doctors.map((doctor) => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialist}
                </Option>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <DatePicker
              style={{ width: 300 }}
              defaultValue={moment()}
              onChange={handleDateChange}
            />
          </div>
          {selectedDoctor && (
            <div>
              <h3>Available Time Slots</h3>
              <ul>
                {timeSlots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardPatient;
