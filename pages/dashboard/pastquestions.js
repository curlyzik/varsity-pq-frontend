import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  Courses as CourseComponent,
  PastQuestionUpdate,
} from "../../components";
import { Button, Card } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  setPastQuestion,
  setPqId,
} from "../../src/features/pastquestions/pastQuestionSlice";

const PastQuestions = () => {
  const { auth, pastQuestion } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();

  const [pqs, setPqs] = useState(null);
  const [updateVisible, setUpdateVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  const showUpdateModal = () => {
    setUpdateVisible(true);
  };

  // FETCH ALL PAST QUESTIONS
  const fetchPastQuestions = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/past-questions/`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    setPqs(data);
  };

  useEffect(() => {
    fetchPastQuestions();
  }, [pastQuestion.file]);

  // FETCH SINGLE PAST QUESTION
  const fetchPastQuestion = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/past-questions/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      dispatch(
        setPastQuestion({
          file: data.file,
          course_details: data.pq_details,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // set course id
  useEffect(() => {
    if (pastQuestion.pqId !== undefined) {
      fetchPastQuestion(pastQuestion.pqId);
    }
  }, [pastQuestion.pqId]);

  console.log(pqs);
  const mappedData = pqs?.map((pq) => {
    return {
      key: pq.id,
      course_code: (
        <h3 className="font-bold">{pq.pq_details[0].course_code}</h3>
      ),
      course_name: pq.pq_details[0].course,
      year: pq.pq_details[0].year,
      level: pq.pq_details[0].level,
      semester: pq.pq_details[0].semester,
      action: (
        <Button
          key="button"
          className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
          onClick={() => {
            dispatch(setPqId(pq.id));
            showUpdateModal();
          }}
        >
          <AiOutlineEdit fill="green" />
          <span>Update</span>
        </Button>
      ),
    };
  });

  return (
    <div>
      <Layout defaultSelectedKeys="5">
        <div className="!mb-4 border-b !pb-2">
          <h2 className="text-4xl font-bold">My Past Questions</h2>
          <span>You have created {pqs?.length} past questions</span>
        </div>

        {/* For desktop  view */}
        <div className="hidden md:block">
          <PastQuestionUpdate
            updateVisible={updateVisible}
            setUpdateVisible={setUpdateVisible}
            data={mappedData}
          />
        </div>

        {/* For mobile view */}
        <div className="md:hidden">
          <div className="!flex !flex-col !gap-y-6">
            {pqs?.map((pq) => (
              <Card className="!border-2" key={pq.id}>
                <h3 className="!text-2xl font-bold">
                  {pq.pq_details[0].course}
                </h3>
                <p className="!mb-2 text-lg italic">
                  {pq.pq_details[0].course_code}
                </p>
                <div className="text-base">
                  <p>
                    <b>Year:</b> {pq.pq_details[0].year}
                  </p>
                  <p>
                    <b>Level:</b> {pq.pq_details[0].level}
                  </p>
                  <p>
                    <b>Semester:</b>{" "}
                    {pq.pq_details[0].semester === "2" ? "2nd" : "1st"}
                  </p>
                  <Button
                    key="button"
                    className="!mt-4 !flex cursor-pointer !items-center !justify-center !gap-x-3 !text-lg"
                    onClick={() => {
                      dispatch(setPqId(pq.id));
                      showUpdateModal();
                    }}
                  >
                    <AiOutlineEdit fill="green" />
                    <span>Update</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PastQuestions;
