import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" style={{ float: 'left', color: 'white', fontSize: '24px' }}>
          <Link to="/">YourLogo</Link>
        </div>
        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          <Menu.Item key="1">
            <Link to="/doctor-login">Doctor Login</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/doctor-register">Doctor Registration</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/patient-login">Patient Login</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/patient-register">Patient Registration</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
