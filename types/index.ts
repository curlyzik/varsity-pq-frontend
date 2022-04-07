export interface CourseDetails {
  id: string | number;
  course_code: string;
  name: string;
  course_details: {
    year: string | number;
    level: string | number;
    semester: string | number;
    faculty: string;
    department: string;
  }[];
  has_pastquestion: boolean;
}

export interface PastQuestionDetails {
  created_at: string;
  file: string;
  id: string | number;
  pq_details: {
    author: string;
    course: string;
    course_code: string;
    course_id: string | number;
    department: string;
    faculty: string;
    has_pastquestion: boolean;
    level: string | boolean;
    semester: string | boolean;
    university: string;
    university_type: string;
    year: string | number;
  }[];
  updated_at: string;
}
