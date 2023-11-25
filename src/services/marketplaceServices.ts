import axios from 'axios';

export const getUserInfo = async () => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getSavedCourse = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getMostPopularCourse = async (userId: string) => {
  // api is not correct for now
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getRecommendedCourses = async (userId: string) => {
  // api is not correct for now
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getAllCourses = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getFilterCourse = async (query: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/course/search?searchInput=${query}`
  );
  return data.data.data.courses;
};
export const getAllNotifications = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/notifications`
  );
  return data.data.data.notifications;
};
export const fetchCredits = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/wallet/credits`
  );
  return data.data.data.credits;
};
export const fetchPurchaseHistory = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/purchases`
  );
  return data.data.data.consumerCourses;
};
export const fetchSingleCourse = async (courseId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/course/${courseId}`
  );
  return data.data.data.course;
};
