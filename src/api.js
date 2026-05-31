import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const processClaims = (data) => axios.post(`${BASE_URL}/process`, data);

export const getClaims = () => axios.get(`${BASE_URL}/claims`);

export const getAnalytics = () => axios.get(`${BASE_URL}/analytics`);
