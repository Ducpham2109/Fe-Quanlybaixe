import { Col, Input, Row, message } from 'antd'
import {
  H5Styled,
  H8Styled
} from '../../../styled/HomeStyledComponent/listStyled'
import CameraComponent from '../../cameraComponent/cameraComponent'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { capturedImagee, licenseMoto } from '../../../atom/store'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import { BASE_URL } from '../../../../api/requet'
import Webcam from 'react-webcam';
import axios from 'axios';
import OutCarComponent from './outCarComponent'

const StyledRow = styled(Row)`
  border: 1px solid #000;
  padding: 20px;
`
const StyledCol = styled(Col)`
  border: 3px solid #000;
  padding: 0px;
`
const OutMotoComponent = () => {
  const [capturedImage, setCapturedImage] = useAtom(capturedImagee)
  const [type, setType] = useState('')
  const [IDCard, setIDCard] = useState()
  const [parkingCode, setParkingCode] = useState()
  const [entryTime, setEntryTime] = useState()
  const [userName, setUserName] = useState('')
  const [lisenseVehicle, setlisenseVehicle]=useAtom(licenseMoto)
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(true);
  const [outTime, setOutTime] = useState('')
  const [vehicleyType, setvehicleyType] = useState()
  const [cost, setCost] = useState()
  const [image, setImage] = useState()


  useEffect(() => {
    const initialValues = parseInt(Cookies.get('parkingCode'));
    setParkingCode(initialValues)
    const parsedUserName = String(Cookies.get('userName'))
    setUserName(parsedUserName)
    setOutTime(moment().format('HH:mm:ss  YYYY-MM-DD '))
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}entryVehicles/IDCard?IDCard=${IDCard} `
        )
        setImage(response.data.image)
        setvehicleyType(response.data.vehicleyType)
        setlisenseVehicle(response.data.lisenseVehicle)
        setEntryTime(response.data.entryTime)
      } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error(error)
      }
    }

    fetchData()
  }, [IDCard ])
 
  return (
    <>
      <Row justify="center">
        <Col span={23}>
          <H8Styled
            style={{ margin: '20px 0px 20px 0px', textAlign: 'center' }}
          >
            Hệ thống gửi xe Dparking{' '}
          </H8Styled>
          <Row gutter={[16, 16]}>
            <StyledCol
              xs={24}
              sm={12}
              lg={12}
              style={{ marginTop: '5px', textAlign: 'center' }}
            >
              <Row style={{ marginTop: '20px' }}>
              <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
         {cameraActive && (
          <div style={{ width: '100%', height: '100%' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              videoSource="usb" // Chỉ định sử dụng webcam cắm qua cổng USB
              style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}
            />
          </div>
        )}
      </div>
      
              </Row>
            </StyledCol>
            <StyledCol
              xs={24}
              sm={12}
              lg={12}
              style={{ marginTop: '5px', textAlign: 'center' }}
            >
           <Row
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {image && (
                  <img
                    src={image}
                    alt="Ảnh chụp"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                )}
              </Row>
            </StyledCol>
          </Row>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={20} style={{ marginLeft: '18px' }}>
          <Row>
            <Col
              xs={24}
              sm={12}
              lg={12}
              style={{ marginTop: '5px', textAlign: 'center' }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <h2>ID Card:</h2>
                </Col>
                <Col>
                  <Input
                    value={IDCard}
                    onBlur={(e) => setIDCard(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <h2>Biển số xe: {lisenseVehicle} </h2>
              </Row>
              <Row>
                <h2>Loại xe: {vehicleyType} </h2>
              </Row>
              <Row>
                <h2>Thành tiền: {cost} </h2>
              </Row>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={12}
              style={{ marginTop: '5px', textAlign: 'center' }}
            >
              <Row>
                <h2>Parking Code: {parkingCode} </h2>
              </Row>
              <Row>
                <h2>Tài khoản gửi: {userName} </h2>
              </Row>
              <Row>
                <h2>Thời gian vào :{entryTime} </h2>
              </Row>
              <Row>
                <h2>Thời gian ra :{outTime} </h2>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default OutMotoComponent
