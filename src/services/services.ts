import { type UserData } from '@/types/auth-types'

export const loginService = async (values: UserData) =>
  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  })
