import axios from 'axios';

const httpheader = `${process.env.REACT_APP_ENDPOINT_URL}`;
export default httpClient = axios.create({
	baseURL: httpheader,
	defaults: {
		timeout: 300000
	},
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	}
});
