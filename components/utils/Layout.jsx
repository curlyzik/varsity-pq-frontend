import React, { useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import {
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHome,
} from "react-icons/ai";
import Link from "next/link";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

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
          className="!fixed top-0 bottom-0 left-0 !h-screen"
        >
          <div className="!m-4 h-8 text-center text-3xl font-bold text-white">
            Varsity PQ
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="border-t border-t-gray-900 pt-2"
          >
            <Menu.Item key="1" icon={<AiOutlineUser />}>
              Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<AiOutlineUpload />}>
              Upload PQ
            </Menu.Item>
            <Menu.Item key="4" icon={<AiOutlineSetting />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={`${!collapsed ? "!ml-[200px]" : "!ml-0"}`}>
          {/* <Header className=" fixed w-full p-0">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              className="!flex"
            >
              <Menu.Item
                key="1"
                icon={<AiOutlineUser />}
                className="!flex items-center justify-center"
              >
                <Link href={"/"}>
                  <a>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header> */}
          <Content className="mx-4 mt-6 !h-full">
            <div className="bg-white p-7">{children}</div>
          </Content>
          <Footer className="text-center">
            Varsity PQ ©2018 Created by Isaac Nzekwe
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
