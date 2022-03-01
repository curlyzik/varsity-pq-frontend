import React, { useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import {
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineVideoCamera,
} from "react-icons/ai";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  console.log(collapsed);
  return (
    <div>
      <Layout hasSider className="relative">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            setCollapsed(collapsed);
          }}
          className="fixed top-0 bottom-0 left-0 h-screen"
        >
          <div className="m-4 h-8 text-center text-3xl font-bold text-white">
            Varsity PQ
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<AiOutlineUser />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<AiOutlineVideoCamera />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<AiOutlineUpload />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<AiOutlineUser />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={`${!collapsed ? "ml-[200px]" : "ml-0"}`}>
          <Header className=" border-l border-blue-900 bg-white p-0 w-full fixed">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content className="mx-4 mt-6">
            <div className="bg-white p-7">
              <br />
              Really
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              long
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              content
            </div>
          </Content>
          <Footer className="text-center">
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
