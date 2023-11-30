import axios from 'axios';

export type requestCourseType = {
  courseId: number;
  bppId?: string;
  title: string;
  description: string;
  credits: number;
  imageLink: string;
  language: string[];
  courseLink: string;
  providerName: string;
  providerId?: string;
  avgRating: number;
  competency: {
    [key: string]: string[];
  };
};

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
export const getongoingCoursess = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/ongoing`
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
export const saveACourse = async (
  userId: string,
  payload: requestCourseType
) => {
  const data = await axios.post(
    `http://localhost:4000/api/consumer/${userId}/course/save`,
    payload
  );
  return data.data.data;
};
export const unsaveACourse = async (userId: string, courseId: number) => {
  const data = await axios.patch(
    `http://localhost:4000/api/consumer/${userId}/course/${courseId}/unsave`
  );
  return data.data.data;
};
export const purchasesACourse = async (
  userId: string,
  payload: requestCourseType
) => {
  const data = await axios.post(
    `http://localhost:4000/api/consumer/${userId}/course/purchase`,
    payload
  );
  return data.data.data;
};
