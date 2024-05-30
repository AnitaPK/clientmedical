import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Button,
  DatePicker,
  Space,
  Modal,
  Select,
  Table,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Option } = Select;

const DashboardPatient = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const userName = useLocation().state?.user || "Guest";
  const userId = useLocation().state?.id; 
  console.log(userId,userName);

  useEffect(() => {
    // Fetch appointments
    axios
      .get("http://localhost:4000/v1/allAppointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });

    // Fetch doctors
    axios
      .get("http://localhost:4000/v1/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleLogout = () => {
    message.success("Logout successful!");
    navigate("/patient-login");
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleAddAppointment = () => {
    console.log("selectedDoctorId:", selectedDoctorId);
    console.log("selectedDateTime:", selectedDateTime);


    if (!selectedDoctorId || !selectedDateTime) {
      message.error(
        "Please select a doctor and a date and time for the appointment."
      );
      return;
    }
  
    // const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);
    // console.log("selectedDoctor:", selectedDoctor);
    // if (!selectedDoctor) {
    //   message.error("Selected doctor not found.");
    //   return;
    // }
  
    const appointmentData = {
      doctorId: selectedDoctorId,
      // doctorName: selectedDoctor.name,
      patientId:userId,
      appointmentDateTime: selectedDateTime.format("YYYY-MM-DD HH:mm:ss"),
      status: "Pending",
    };
    console.log("appointmentData",appointmentData);
  
    axios
      .post("http://localhost:4000/v1/appointment", appointmentData)
      .then((response) => {
        message.success("Appointment added successfully!");
        setModalVisible(false);
        setAppointments([...appointments, response.data]);
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        message.error("Failed to add appointment. Please try again.");
      });
  };

  const columns = [
    { title: "Doctor Name", dataIndex: "doctorName", key: "doctorName" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="logo" style={{ color: "white", fontWeight: "bold" }}>
          MyLogo
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="user" icon={<UserOutlined />}>
            {userName}
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 16 }}>
        <div className="site-layout-content">
          <Button type="primary" onClick={() => setModalVisible(true)}>
            New Appointment
          </Button>
          <Modal
            title="New Appointment"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="back" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleAddAppointment}
              >
                Create Appointment
              </Button>,
            ]}
          >
            <Space direction="vertical">
            <Select
                placeholder="Select Doctor"
                style={{ width: "100%" }}
                onChange={(value) => {
                  console.log("Selected doctor ID:", value);
                  setSelectedDoctorId(value);
                }}
                value={selectedDoctorId}
              >
                {doctors.map((doctor) => (
                  <Option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </Option>
                ))}
              </Select>
              <DatePicker
                showTime
                onChange={handleDateTimeChange}
                placeholder="Select Date and Time"
              />
            </Space>
          </Modal>
          <h2>Your Appointments</h2>
          <Table dataSource={appointments} columns={columns} />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardPatient;
