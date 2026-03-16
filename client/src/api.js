import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Projects
export const getProjects = () => API.get('/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Skills
export const getSkills = () => API.get('/skills');
export const createSkill = (data) => API.post('/skills', data);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// Portfolio Info
export const getPortfolioInfo = () => API.get('/portfolio');
export const updatePortfolioInfo = (data) => API.put('/portfolio', data);

// Contact
export const sendContact = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const markRead = (id) => API.put(`/contact/${id}/read`);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);

// Upload
export const uploadImage = (formData) =>
  API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const uploadFile = (formData) =>
  API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// Achievements
export const getAchievements = () => API.get('/achievements');
export const createAchievement = (data) => API.post('/achievements', data);
export const updateAchievement = (id, data) => API.put(`/achievements/${id}`, data);
export const deleteAchievement = (id) => API.delete(`/achievements/${id}`);

// Analytics
export const getVisitorStats = () => API.get('/analytics/stats');
export const getRecentVisitors = () => API.get('/analytics/recent');

export default API;
