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
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH: '/refresh',
}
