import { Button, Input, message, Switch } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Layout, Table } from "../../components";

const Users = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  const [tableLoading, setTableLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const [keyWord, setKeyword] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!auth?.accessToken || !auth?.account?.is_staff) {
      router.push("/login");
    }
  }, []);

  // FETCH ALL USERS
  const fetchUsers = async () => {
    setTableLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/`
    );
    setUsers(data);
    setTableLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // filter courses by keyword
  const filterByKeyword = (keyword) => {
    const filteredData = users?.filter(
      (user) =>
        user?.full_name?.toLowerCase().includes(keyword.toLowerCase()) ||
        user?.email?.toLowerCase().includes(keyword.toLowerCase())
    );
    return filteredData;
  };

  // fetch new data when keyword changes
  useEffect(() => {
    filterByKeyword(keyWord);
  }, [keyWord]);

  const newUsers = filterByKeyword(keyWord);

  // FETCH SINGLE USERS
  const updateUser = async (id, action) => {
    try {
      setTableLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update/${id}/`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setUser(data);
      setTableLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setTableLoading(false);
      setSuccess(false);
    }
  };

  // logic to handle user admin permission
  const handleAdminPermission = (user) => {
    if (user?.is_staff) {
      updateUser(user?.id, "remove_admin");
    } else {
      updateUser(user?.id, "set_admin");
    }
  };

  // logic to handle user active state
  const handleActivePermission = (user) => {
    if (user?.is_active) {
      updateUser(user?.id, "deactivate_user");
    } else {
      updateUser(user?.id, "activate_user");
    }
  };

  const successMessage = () => {
    return message.success(user?.message, 1, () => {
      setSuccess(false);
    });
  };

  useEffect(() => {
    if (success) {
      successMessage();
    }
  }, [success]);

  // table columns
  const columns = [
    {
      title: <h3 className="font-extrabold dark:text-black">Full Name</h3>,
      dataIndex: "full_name",
      key: "full_name",
      fixed: "left",
      width: 100,
    },
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      width: 100,
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      width: 50,
    },
    {
      title: "Admin",
      dataIndex: "is_admin",
      key: "is_admin",
      width: 50,
    },
    {
      title: "Volunteer",
      dataIndex: "is_volunteer",
      key: "is_volunteer",
      width: 50,
    },
    {
      title: <div className="">Actions</div>,
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
    },
  ];

  const excludeLoggedInUserFromList = newUsers?.filter((user) => {
    return user.id !== auth?.account?.id;
  });

  // get the mapped data
  const mappedData = excludeLoggedInUserFromList?.map((user) => {
    return {
      key: user.id,
      full_name: (
        <h3 className="ml-2 font-bold dark:text-black">{user.full_name}</h3>
      ),
      id: user.id,
      email: user.email,
      university: user.university,
      is_active: user.is_active ? (
        <AiFillCheckCircle fill="green" />
      ) : (
        <AiFillCloseCircle fill="red" />
      ),
      is_admin: user.is_staff ? (
        <AiFillCheckCircle fill="green" />
      ) : (
        <AiFillCloseCircle fill="red" />
      ),
      is_volunteer: user.is_volunteer ? (
        <AiFillCheckCircle fill="green" />
      ) : (
        <AiFillCloseCircle fill="red" />
      ),
      action: (
        <div className="!flex gap-x-2 text-center">
          <div>
            {user?.is_staff ? (
              <div className="text-xs">Remove Admin</div>
            ) : (
              <div className="text-xs">Make as Admin</div>
            )}
            <Switch
              className="bg-gray-300"
              unCheckedChildren={
                <AiFillCheckCircle fill="green" className=" text-sm" />
              }
              checkedChildren={
                <AiFillCloseCircle fill="red" className=" text-sm" />
              }
              checked={user?.is_staff}
              loading={tableLoading}
              onClick={() => handleAdminPermission(user)}
            />
          </div>
          <div>
            <div>
              {user?.is_active ? (
                <div className="text-xs">Deactivate Account</div>
              ) : (
                <div className="text-xs">Activate Account</div>
              )}
              <Switch
                className="bg-gray-300"
                unCheckedChildren={
                  <AiFillCheckCircle fill="green" className=" text-sm" />
                }
                checkedChildren={
                  <AiFillCloseCircle fill="red" className=" text-sm" />
                }
                checked={user?.is_active}
                loading={tableLoading}
                onClick={() => handleActivePermission(user)}
              />
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <Layout defaultSelectedKeys="6">
        <div className="h-screen">
          <div>
            <h2 className="!mb-4 border-b pb-2 text-4xl font-bold dark:text-white">
              Users
              <span className="block text-base text-gray-400">
                {users?.length} total volunteers
              </span>
            </h2>
          </div>

          <div className="mb-3 md:w-96">
            <Input
              placeholder="search by course code or name."
              size="large"
              allowClear
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* For desktop View */}
          <div className="hidden md:block">
            <Table
              columns={columns}
              data={mappedData}
              scroll={{ x: 900, y: 300 }}
              loading={tableLoading}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
