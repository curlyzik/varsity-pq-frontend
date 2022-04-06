import React, { useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import {
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineBook,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import Link from "next/link";
import { logout } from "../../src/features/users/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "antd";

const DashboardLayout = ({ children, defaultSelectedKeys = "1" }) => {
  const {
    auth: { account },
  } = useSelector((state) => state.persistedReducer);

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const handleDarkMode = theme === "dark" ? true : false;

  return (
    <div>
      <Layout hasSider className="!overflow-hidden">
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
          className="!fixed !top-0 !bottom-0 !left-0 !z-50 !h-screen dark:bg-black"
        >
          <div className="!m-4 h-8 text-center text-3xl font-bold text-white">
            Varsity PQ
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKeys]}
            className="border-t border-t-[rgb(53,53,53)] pt-2 dark:bg-black"
          >
            <Menu.Item key="1" icon={<AiOutlineUser />}>
              <Link href={"/dashboard"}>
                <a>Profile</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AiOutlinePlusSquare />}>
              <Link href={"/dashboard/create-course"}>
                <a>Create Course</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AiOutlineBook />}>
              <Link href={"/dashboard/courses"}>
                <a>My Courses</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AiOutlineUpload />}>
              <Link href={"/dashboard/create-pastquestion"}>
                <a>Create PQ</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<AiOutlineUpload />}>
              <Link href={"/dashboard/pastquestions"}>
                <a>My PQs</a>
              </Link>
            </Menu.Item>
            {/* Show this item if the user is an admin */}
            {account?.is_staff && (
              <Menu.Item key="6" icon={<AiOutlineUpload />}>
                <Link href={"/dashboard/users"}>
                  <a>Users</a>
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key="7" icon={<AiOutlineSetting />}>
              <Link href={"/dashboard/settings"}>
                <a>Settings</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className={`${
            !collapsed ? "lg:ml-[200px]" : "!ml-0"
          } pb-9 dark:bg-[#111]`}
        >
          <Header className="!fixed z-10 !w-full !p-0 dark:bg-black">
            <Menu
              theme="dark"
              mode="horizontal"
              className="!flex !border-4 !pl-6 dark:bg-black"
            >
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
                  router.push("/");
                }}
              >
                Sign out
              </Menu.Item>
              <Menu.Item
                key="3"
                className="rounded-full hover:bg-transparent dark:hover:bg-transparent remove-bg"
              >
                <Switch
                  className="bg-[#cfcece] dark:bg-gray-800"
                  checkedChildren={
                    <BsFillMoonFill className=" dark:text-black" />
                  }
                  unCheckedChildren={
                    <BsFillBrightnessHighFill className=" text-black" />
                  }
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  checked={handleDarkMode}
                />
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="!mx-4 !mt-20">
            <div className="h-full bg-white p-5 dark:bg-[#111] lg:dark:bg-black">
              {children}
            </div>
          </Content>
          {/* <Footer className="!fixed bottom-0 w-full lg:w-[calc(100%-200px)]">
            <p className="flex justify-center gap-x-2">
              <span className="font-bold">Varsity PQ ©2022 </span>{" "}
              <span>
                Created by <b>Isaac Nzekwe</b>
              </span>
            </p>
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
