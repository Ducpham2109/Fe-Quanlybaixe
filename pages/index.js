import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


import { RoleEnum } from '../shares/role'
import Adminhome from '../components/pageComponents/homeComponent/adminhome'
import UserHome from '../components/pageComponents/homeComponent/userHome'

const Index = () => {
  const [isRoleVip, setIsRoleVip] = useState()

  const [role, setRole] = useState(0)

  useEffect(() => {
    setRole(parseInt(Cookies.get('role')))
    setIsRoleVip(role === RoleEnum.superAdmin || role === RoleEnum.admin)
  })

  return (
    <>
      {isRoleVip && <Adminhome />}
      {role === RoleEnum.user && <UserHome/>}
      
    </>
  )
}

export default Index
