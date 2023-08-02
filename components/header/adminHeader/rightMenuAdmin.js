import React from 'react'
import AccountIcon from '../../icons/accountIcon'
import { memo, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DivStyled, SpanStyled } from './styled/styled'
import { UrlPath } from '../../../type/urlPath'
import Cookies from 'js-cookie'
import { StyledButtonAntd } from '../../styled/styledListOfDevice/styledComponent'

import ModalAdminHeader from './ModalAdminHeader'
import UserReceiveNotification from './userReceiveNotification'
import { isNotificationCounterAtom, isNotificationCounterNumberAtom, userReceiveNotificationAtom } from '../../atom/store'
import NotificationIcon from '../../icons/notificationIcon'
import { useAtom } from 'jotai'
import { RoleEnum } from '../../../shares/role'
import AdminReceiveMessage from './adminReceiveMessage'

const RightMenuAdmin = (props) => {
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const myRefAccountIcon = useRef()
  const myRefPopup = useRef()
  const [isClickMessageIcon, setIsClickMessageIcon] = useState(false)

  const [isClickNotificationIcon, setIsClickNotificationIcon] = useState(false)
  const [isClickAccountIcon, setIsClickAccountIcon] = useState(false)
  useEffect(() => {
    setUserName(Cookies.get('userName'))
  })
  const { FormChangePassRef } = props
  const handleClickLogOut = (e) => {
    e.preventDefault()
    Cookies.remove('userName')
    Cookies.remove('jwt_token')
    Cookies.remove('role')
    Cookies.remove('parkingCode')
    router.push(UrlPath.auth.url)
  }
  const [isRoleVip, setIsRoleVip] = useState()
  const [role, setRole] = useState(0)
  const [isNotificationCounterNumber, setIsNotificationCounterNumber] = useAtom(
    isNotificationCounterNumberAtom
  )

  const [userReceiveNotification, setUserReceiveNotification] = useAtom(
    userReceiveNotificationAtom
  )
  const [isNotificationCounter, setIsNotificationCounter] = useAtom(
    isNotificationCounterAtom
  )
  const handleClickAccountIcon = (e) => {
    e.preventDefault()
    setIsClickAccountIcon(!isClickAccountIcon)
  }
  useEffect(() => {
    setRole(parseInt(Cookies.get('role')))
    setIsRoleVip(role === RoleEnum.superAdmin || role === RoleEnum.admin)
  })
  const myRefNotificationIcon = useRef()

  const handleClickNotificationIcon = (e) => {
    e.preventDefault()
    setIsClickAccountIcon(false)
    setIsClickMessageIcon(false)
    setIsClickNotificationIcon(!isClickNotificationIcon)
    setIsNotificationCounter(false)
    setIsNotificationCounterNumber(0)
    setIsNotificationCounterNumber([])
  }
  return (
    <>
      {isRoleVip === false && <UserReceiveNotification />}
      {isRoleVip && <AdminReceiveMessage />}
     <DivStyled width={'320px'} mgTop={'10px'} mgLeft={'-190px'}>
        <div className="cycle-container">
          <div
            className="icon-container"
            onClick={handleClickNotificationIcon}
            ref={myRefNotificationIcon}
          >
            {isClickNotificationIcon === false &&
              isNotificationCounter === true && (
                <SpanStyled>
                  <span className="red-circle-container">
                    <span className="counter-notification">
                      {isNotificationCounterNumber
                        ? isNotificationCounterNumber.length
                        : 0}
                    </span>
                  </span>
                </SpanStyled>
              )}

            <NotificationIcon heigh={'1.8em'} width={'1.8em'} />
          </div>
          {isClickNotificationIcon === true && (
            <div className="popup-container" ref={myRefPopup}>
              <div style={{ margin: '0 14px 0 14px' }}>
                <span
                  style={{
                    color: '#812362',
                    fontFamily: 'sans-serif',
                    fontSize: '26px',
                    marginLeft: '8px'
                  }}
                >
                  Thông báo
                </span>
                <div>
                  {isRoleVip === false &&
                    userReceiveNotification.map((items) => {
                      return (
                        <div className="avatar-container">
                          <div
                            style={{
                              // margin: '0 8px 0 8px',
                              padding: '8px',
                              overflow: 'hidden',
                              wordWrap: 'break-word',
                              lineHeight: 1.2
                            }}
                          >
                            <h3>{items.headerContent}</h3>
                            <p>{items.content}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </DivStyled>
      <DivStyled width={'200px'} mgTop={'10px'} mgLeft={'-120px'}>
        <div className="cycle-container">
          <div
            className="icon-container"
            onClick={handleClickAccountIcon}
            ref={myRefAccountIcon}
          >
            <AccountIcon
              heigh={'1.8em'}
              width={'1.8em'}
              colorBefore={'#3a416f'}
              colorAfter={'#fff'}
            />
          </div>
          {isClickAccountIcon === true && (
            <div className="popup-container" ref={myRefPopup}>
              <span
                style={{
                  marginLeft: '16px',
                  color: '#812362',
                  fontFamily: 'sans-serif'
                }}
              >
                {userName}
                <br />
              </span>
              <ModalAdminHeader FormChangePassRef={FormChangePassRef} />
              <StyledButtonAntd
                href={UrlPath.auth.url}
                onClick={handleClickLogOut}
              >
                Đăng Xuất
              </StyledButtonAntd>
            </div>
          )}
        </div>
      </DivStyled>
    </>
  )
}
export default memo(RightMenuAdmin)
