import React from "react";
import { Spin } from "antd";
import { Layout } from "..";
import { fetcher } from "../../utils/axios";
import useSWR from "swr";
import { AiFillCheckCircle } from "react-icons/ai";

const UserDashboard = () => {
  const { data: user, error } = useSWR("/dj-rest-auth/user/", fetcher);

  return (
    <div>
      <Layout>
        <div className="h-screen">
          <div>
            <h2 className="border-b pb-2 text-4xl font-bold">
              Profile Details
            </h2>
          </div>
          <div className="mt-6 flex grid-cols-3 flex-col gap-y-8 dark:text-white lg:grid">
            {!error && !user ? (
              <div>
                <Spin />
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-extrabold">Full Name</h3>
                  <p className=" text-base">{user.full_name}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">University</h3>
                  <p className=" text-base">{user.university}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Faculty</h3>
                  <p className=" text-base">{user.faculty}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Department</h3>
                  <p className=" text-base">{user.department}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Year of Admission</h3>
                  <p className=" text-base">{user.year}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Email</h3>
                  <p className=" text-base">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Volunteer</h3>
                  <p className=" text-base">
                    {user.is_volunteer ? (
                      <span className="flex items-center gap-x-2">
                        verified volunteer
                        <AiFillCheckCircle fill="green" />
                      </span>
                    ) : (
                      "not verified"
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UserDashboard;
