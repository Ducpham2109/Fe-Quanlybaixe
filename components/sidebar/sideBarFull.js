import { memo,useState,useEffect } from "react"
import { Image } from 'antd'
import { RoleEnum } from '../../shares/role'
import { useRouter } from 'next/router'
import { UrlPath } from '../../type/urlPath'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons'
import Cookies from 'js-cookie'
import { StyledButtonAntd } from '../styled/styledListOfDevice/styledComponent'
import {
  DivSideBarStyled1,
  DivSideBarStyled2,
  DivSideBarStyled3
} from '../styled/styledListOfSideBar/styledListOfSideBar'
import HomeIcon from '../icons/homeIcon'
import DeviceIcon from '../icons/deviceIcon'
import HelpIcon from '../icons/helpIcon'
import ListIcon from '../icons/listIcon'
import AccountIcon from '../icons/accountIcon'
import MenuButtonSideBarFull from './menuButtonSideBarFull'
import MenuButtonTemp from './menuButtonTemp'
import MenuChildrenButton from './menuChildrenButton'
import COLOR from '../../utils/color'


function SideBarFull({ onClick })  {
    const logo = '/images/logoauth.png'
    const router = useRouter()
    const [isRoleVip, setIsRoleVip] = useState()
  //const [isActiveDevicePage, setIsActiveDevicePage] = useState()
  const [role, setRole] = useState(0)
  const [isActiveDeivce, setIsActiveDevice] = useState(false)
  const [toggleCaret, setToggleCaret] = useState(false)
  useEffect(() => {
    setRole(parseInt(Cookies.get('role')))
   // setAdminImei(sessionStorage.getItem('deviceImei'))
    setIsRoleVip(role === RoleEnum.superAdmin || role === RoleEnum.admin)
    // setIsActiveDevicePage(
    //   router.pathname === `${UrlPath.deviceId.url}[deviceId]` ||
    //     router.pathname === `${UrlPath.deviceId.url}[deviceId]/wifi` ||
    //     router.pathname === `${UrlPath.deviceId.url}[deviceId]/ethernet` ||
    //     router.pathname === `${UrlPath.deviceId.url}[deviceId]/lte4g` ||
    //     router.pathname === `${UrlPath.deviceId.url}[deviceId]/gps`
    // )
  })
  const handleClickDeviceMenuButton = () => {
    setIsActiveDevice(!isActiveDeivce)
    setToggleCaret(!toggleCaret)
  }
    return (
        <>
        <DivSideBarStyled1>
        <DivSideBarStyled2>
          <Image

            onClick={onClick}
            preview={false}
            width={'170px'}
            src={logo}
            alt="logo"
            style={{
              cursor: 'pointer',
              marginLeft: '15px',
              marginTop:'-10px',
             
            }}
          />
          <StyledButtonAntd onClick={onClick}>
            <DoubleLeftOutlined
              style={{
                fontSize: '18px',
                marginTop: '6px',
                color: '#fff'
              }}
            />
          </StyledButtonAntd>
        </DivSideBarStyled2>
        <DivSideBarStyled3 padingX={'12px'}>
        <MenuButtonSideBarFull
            active={router.pathname === UrlPath.home.url}
            href={UrlPath.home.url}
            icon={
              <HomeIcon
                light={router.pathname === UrlPath.home.url ? 1 : 0}
                color={COLOR.PRIMARY.BLACK}
              />
            }
          >
            {UrlPath.home.title}
          </MenuButtonSideBarFull>

          {isRoleVip && (
            <MenuButtonTemp
              marginLeft={'10px'}
              onClickMenuButtonTemp={handleClickDeviceMenuButton}
              icon={<DeviceIcon />}
            >
              Quản Lý Bãi Đỗ
              {toggleCaret ? (
                <CaretUpOutlined style={{ marginLeft: '4px' }} />
              ) : (
                <CaretDownOutlined style={{ marginLeft: '4px' }} />
              )}
            </MenuButtonTemp>
          )}
          {isActiveDeivce && (
            <div>
              <MenuChildrenButton
                active={router.pathname === UrlPath.device.url}
                href={UrlPath.device.url}
                icon={
                  <ListIcon
                    width={'1.5em'}
                    height={'1.5em'}
                    light={router.pathname === UrlPath.device.url ? 1 : 0}
                  />
                }
              >
                Danh Sách Bãi Đỗ
              </MenuChildrenButton>
              
            </div>
          )}
          
           
         
          {isRoleVip && (
            <MenuButtonSideBarFull
              active={router.pathname === UrlPath.account.url}
              href={UrlPath.account.url}
              icon={
                <AccountIcon
                  heigh={'1.5em'}
                  width={'1.5em'}
                  light={router.pathname === UrlPath.account.url ? 1 : 0}
                  colorBefore={'#3a416f'}
                  colorAfter={'#fff'}
                />
              }
            >
              {UrlPath.account.title}
            </MenuButtonSideBarFull>
          )}

        

          <MenuButtonSideBarFull
            active={router.pathname === UrlPath.help.url}
            href={UrlPath.help.url}
            icon={
              <HelpIcon light={router.pathname === UrlPath.help.url ? 1 : 0} />
            }
          >
            {UrlPath.help.title}
          </MenuButtonSideBarFull>
          </DivSideBarStyled3>

        </DivSideBarStyled1>
        </>
    )
}
export default memo(SideBarFull)