import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import {
    FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '9413916596183852',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10, // The radius within which to search in miles
    q: 'JavaScript' // Hard-code the query for testing purposes
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip});
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => async (dispatch) => {
    try {
        const {latitude, longitude} = region;
        let zip = await reverseGeocode({latitude, longitude});
        const url = buildJobsUrl(zip);
        let {data} = await axios.get(url);
        dispatch({type: FETCH_JOBS, payload: data});
        console.log("Data:", data);
    } catch (err) {
        console.error(err);
    }
};