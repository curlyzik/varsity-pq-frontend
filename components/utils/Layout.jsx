import React, { useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import {
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import Link from "next/link";
import { logout } from "../../src/features/users/authSlice";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout>
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
          className="!fixed top-0 bottom-0 left-0 z-50 !h-screen"
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
          <Header className="!fixed w-full p-0">
            <Menu theme="dark" mode="horizontal" className="!ml-6 !flex">
              <Menu.Item
                key="1"
                icon={<AiOutlineHome />}
                className="!flex items-center justify-center"
              >
                <Link href={"/"}>
                  <a>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                className="!flex items-center justify-center"
                icon={<AiOutlineLogout />}
                onClick={() => {
                  dispatch(logout());
                  router.push("/login");
                }}
              >
                Sign out
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="!mx-4 !mt-20">
            <div className="!min-h-full bg-white p-7">{children}</div>
          </Content>
          <Footer className="fixed bottom-0 w-full lg:w-[calc(100%-200px)]">
            <p className="flex justify-center gap-x-2">
              <span className="font-bold">Varsity PQ ©2022 </span>{" "}
              <span>
                Created by <b>Isaac Nzekwe</b>
              </span>
            </p>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
