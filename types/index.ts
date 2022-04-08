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
  created_at?: string;
  file?: string | null;
  id?: string | number | null;
  pq_details?: {
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
  }[] | null;
  updated_at?: string;
}

export interface UserDetails {
  department: string;
  email: string;
  faculty: string;
  full_name: string;
  id: string | number;
  is_active: boolean;
  is_staff: boolean;
  is_volunteer: boolean;
  university: string;
  year: string | number;
}

export interface UniversityDetails {
  address: string;
  id: string | number;
  name: string;
  type: string;
  website: string;
}
