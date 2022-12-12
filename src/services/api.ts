import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api`,
})
