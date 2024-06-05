import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Button, DatePicker, Space, Modal, Select, Table } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

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

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [userId]);

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:4000/api/appointmentsByPatient?patientId=${userId}`)
      .then((response) => {
        const sortedAppointments = response.data.sort((a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime));
        setAppointments(sortedAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const fetchDoctors = () => {
    axios
      .get("http://localhost:4000/api/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  const handleLogout = () => {
    message.success("Logout successful!");
    navigate("/patient-login");
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleAddAppointment = () => {
    if (!selectedDoctorId || !selectedDateTime) {
      message.error("Please select a doctor and a date and time for the appointment.");
      return;
    }

    const appointmentData = {
      doctorId: selectedDoctorId,
      patientId: userId,
      appointmentDateTime: selectedDateTime.format("YYYY-MM-DD HH:mm:ss"),
      status: "Pending",
    };

    axios
      .post("http://localhost:4000/api/appointment", appointmentData)
      .then((response) => {
        message.success("Appointment added successfully!");
        setModalVisible(false);
        fetchAppointments(); // Refresh the appointments list
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        message.error("Failed to add appointment. Please try again.");
      });
  };

  const handleDeleteAppointment = (appointmentId) => {
    axios
      .delete(`http://localhost:4000/api/appointment/${appointmentId}`)
      .then(() => {
        message.success("Appointment deleted successfully!");
        fetchAppointments(); // Refresh the appointments list
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
        message.error("Failed to delete appointment. Please try again.");
      });
  };

  const getDoctorNameById = (doctorId) => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    return doctor ? doctor.name : "Unknown";
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorId",
      key: "doctorName",
      render: (doctorId) => getDoctorNameById(doctorId),
    },
    {
      title: "Date",
      dataIndex: "appointmentDateTime",
      key: "appointmentDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "appointmentDateTime",
      key: "appointmentTime",
      render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteAppointment(record._id)}>
          Delete
        </Button>
      ),
    },
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
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
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
              <Button key="submit" type="primary" onClick={handleAddAppointment}>
                Create Appointment
              </Button>,
            ]}
          >
            <Space direction="vertical">
              <Select
                placeholder="Select Doctor"
                style={{ width: "100%" }}
                onChange={(value) => setSelectedDoctorId(value)}
                value={selectedDoctorId}
              >
                {doctors.map((doctor) => (
                  <Option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </Option>
                ))}
              </Select>
              <DatePicker showTime onChange={handleDateTimeChange} placeholder="Select Date and Time" />
            </Space>
          </Modal>
          <h2>Your Appointments</h2>
          <Table dataSource={appointments} columns={columns} rowKey="_id" pagination={false} />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardPatient;
