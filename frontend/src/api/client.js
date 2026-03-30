import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const courseAPI = {
  getFeaturedCourses: () => apiClient.get('/courses/featured'),
  getAllCourses: () => apiClient.get('/courses'),
  getCourseById: (id) => apiClient.get(`/courses/${id}`),
  createCourse: (courseData) => apiClient.post('/courses', courseData),
  updateCourse: (id, courseData) => apiClient.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => apiClient.delete(`/courses/${id}`),
};

export const contactAPI = {
  submitMessage: (data) => apiClient.post('/contact', data),
  getMessages: () => apiClient.get('/contact'),
};

export default apiClient;
