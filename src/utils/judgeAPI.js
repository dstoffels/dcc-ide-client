import axios from 'axios';

const judgeAPI = axios.create({
	baseURL: process.env.NEXT_PUBLIC_JUDGE_API_BASE_URL,
});

export default judgeAPI;
