import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL
})

api.interceptors.request.use((config) =>{
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})


export function setAccessToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

