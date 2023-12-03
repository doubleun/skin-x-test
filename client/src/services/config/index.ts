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
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': apiBaseUrl,
  },
})

/**
 * Interceptor
 */
request.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['authorization']
    // console.log('ss3', response.headers.hasAuthorization())
    if (accessToken) localStorage.setItem('token', accessToken)
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)

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
