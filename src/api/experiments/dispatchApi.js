import axios from 'axios';

const httpheader = `${process.env.REACT_APP_ENDPOINT_URL}`;
const httpClient = axios.create({
	baseURL: httpheader,
	defaults: {
		timeout: 300000
	},
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	}
});

export const highlightedDispatchesList = count => {
	return httpClient.get(`dispatches/recents/${count}`).then(payload => {
		return payload.data.data.recents;
	});
};

export const pinDispatches = bodyParameters => {
	return httpClient.post('dispatches/pinned', bodyParameters).then(payload => {
		return payload.data.data;
	});
};

export const allItemsList = type => {
	const bodyParameters = {
		count: 5,
		offset: 0,
		search: 'string',
		filter: type,
		sort: 'string',
		direction: 'desc'
	};
	return httpClient.post('/dispatch/summary', bodyParameters).then(payload => {
		return payload.data;
	});
};

export const hierarchyList = (id, type) => {
	const bodyParameters = {
		search: 'string',
		filter: 'All',
		sort: 'string',
		direction: 'desc',
		id,
		type
	};
	return httpClient.post('/dispatch/details', bodyParameters).then(payload => {
		return payload.data;
	});
};
