// src/Service/Admin/DashbordService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getAdminCount = () => axios.get(`${BASE_URL}/admin/count`);
export const getStudents = () => axios.get(`${BASE_URL}/student/count`);
export const getCourses = () => axios.get(`${BASE_URL}/courses/count`);
export const getDepartments = () => axios.get(`${BASE_URL}/department/count`);
export const getExams = () => axios.get(`${BASE_URL}/exam/count`);
export const getFaculties = () => axios.get(`${BASE_URL}/faculty/count`);
export const getTeachers = () => axios.get(`${BASE_URL}/teacher/count`);
export const getTimetables = () => axios.get(`${BASE_URL}/timeTable/count`);
export const getSubjects = () => axios.get(`${BASE_URL}/subject/count`);
