import axios from 'axios'

/**
 * Base api server base url
 */
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

/**
 * Axios instance
 */
export const request = axios.create({
  baseURL: apiBaseUrl,
})

/**
 * API endpoints
 */
export const APIEndpoints = {
  POST: '/post',
  POST_DETAIL: '/post/detail',
  REGISTER: '/user/register',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  REFRESH: '/user/refresh',
}
