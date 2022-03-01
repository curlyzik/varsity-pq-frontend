import React, { useEffect } from "react";
import { useSelector, } from "react-redux";
import { Layout } from "..";
import { fetcher } from "../../utils/axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const UserDashboard = () => {
  const router = useRouter();
  const { auth } = useSelector((state) => state.persistedReducer);

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  });

  const user = useSWR("/dj-rest-auth/user/", fetcher);
  
  console.log(auth)
  console.log(user.data)
  return (
    <div>
      <Layout>
        <div>
          <h2 className="border-b pb-2 text-4xl font-bold">Profile Details</h2>
        </div>
        <div className="grid grid-cols-3"></div>
      </Layout>
    </div>
  );
};

export default UserDashboard;

// const fetchUserDetails = async () => {
//   try {
//     const data = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
//       {
//         headers: {
//           Authorization: `Bearer ${auth.accessToken}`,
//         },
//       }
//     );
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//     setFetchUserDetailsError(true);
//   }
// };

// const fetchNewToken = async () => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/token/refresh/`,
//       { refresh: auth.refreshToken }
//     );
//     console.log(data);
//     dispatch(
//       setAuth({
//         access_token: data.access,
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchUserDetails();
//   if (fetchUserDetailsError) {
//     fetchNewToken();
//   }
// }, [fetchUserDetailsError]);
