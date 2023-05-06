import { request } from './requet'
const AdminAuthUrl = {
  base: '/auth'
}
export const apiLogin = (data) => {
  return request({
    url: AdminAuthUrl.base,
    method: 'post',
    data
  })
}
