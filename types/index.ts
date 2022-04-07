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
