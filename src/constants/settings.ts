import axios from 'axios';

export const MAX_ZOOM = 3;
export const MIN_ZOOM = 1;
export const DEFAULT_ZOOM = 1;
export const DEFAULT_ROTATION = 0;
export const DEFAULT_CROP_SIZE = {
    width: 300,
    height: 300,
};
export const DEFAULT_CROP_POSITION = {
    x: 0,
    y: 0,
};

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8080',
   
})