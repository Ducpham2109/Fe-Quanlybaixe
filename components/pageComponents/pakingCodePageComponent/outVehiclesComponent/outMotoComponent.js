import { Col, Form, Input, Row, message } from 'antd'
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
import Webcam from 'react-webcam'
import axios from 'axios'
import { StyledButtonPressedEffect } from '../../../styled/styledListOfDevice/styledComponent'
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}
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
  const [username, setUserName] = useState('')
  const [lisenseVehicle, setlisenseVehicle] = useAtom(licenseMoto)
  const inputRef = useRef(null)
  const webcamRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(true)
  const [outTime, setOutTime] = useState('')
  const [vehicleyType, setvehicleyType] = useState()
  const [cost, setCost] = useState()
  const [form] = Form.useForm()
  const [image, setImage] = useState()

  useEffect(() => {
    const initialValues = parseInt(Cookies.get('parkingCode'))
    setParkingCode(initialValues)
    const parsedUserName = String(Cookies.get('userName'))
    setUserName(parsedUserName)
    setOutTime(moment().format('HH:mm:ss  YYYY-MM-DD '))
    inputRef.current.focus()
  }, [])

  const onFinishFailed = () => {}
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      const button = document.querySelector('button[type="submit"]')
      button.click()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      fetchData(IDCard)
    }
  }

  const onFinish = async (values) => {
    // (values.username = username),
    // (values.lisenseVehicle = lisenseVehicle),
    // (values.entryTime = entryTime),
    // (values.outTime = outTime),
    // (values.vehicleyType = vehicleyType),
    // (values.parkingCode = parkingCode),
    // (values.cost = cost),
    setIsLoading(true)
    const data= {username,lisenseVehicle,entryTime,outTime,vehicleyType,parkingCode,cost}
    await axios 
      .delete(
        `${BASE_URL}entryVehicles/IDCard?IDCard=${IDCard}`
      )
      .then((response) => {
        setIsLoading(true)
      })
      .catch((error) => {
        inputRef.current.focus()
        setIDCard()
        setIsLoading(false)
        message.error(error.response.data.message)
      })
      console.log('va',data)
      await axios
      .post(`https://localhost:44366/api/bill`, data)
      .then(() => {
        // setIsLoading(false)
        message.info('Cho xe ra thành công')
        // inputRef.current.focus()
        // setIDCard()
        // setlisenseVehicle()
        // setvehicleyType()
         
        // setEntryTime()
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)
        setIDCard()
        inputRef.current.focus()
      })
  }
  const fetchData = async (IDCard) => {
    console.log(IDCard)
    try {
      const response = await axios.get(
        `${BASE_URL}entryVehicles/IDCard?IDCard=${IDCard} `
      )
      const res = await axios.get(
        `${BASE_URL}entryVehicles/cost?IDCard=${IDCard}&ParkingCode=${parkingCode}`
      )

      setImage(response.data.result.items[0].image)
      console.log('aaaaaaa', response.data.result.items[0].image)
      setvehicleyType(response.data.result.items[0].vehicleyType)
      setlisenseVehicle(response.data.result.items[0].lisenseVehicle)
      setEntryTime(response.data.result.items[0].entryTime)
      setCost(res.data.cost)
      const costt= res.data.cost;
      const idCard = IDCard
      const data = { costt, idCard };
     
      console.log("cost", data)
      const putResponse = await axios.put(`${BASE_URL}ticket/money`, data)
      .then(() => {
        setIsLoading(false)
        message.info('Thanh toán thành công thành công')
      })
      .catch((error) => {
        setIsLoading(false)
         message.error(error.response.data.message)
         console.log(error)
      })
      
    } catch (error) {
      message.error('IDCard chưa được gắn biển số')
      setIDCard('')  
      console.error(error)
    }
  }
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
                    height: '80%'
                  }}
                >
                  <div style={{ width: '80%', height: '80%' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      videoSource="usb" // Specify the webcam connected via USB
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: 'scaleX(-1)'
                      }}
                    />
                  </div>
                </div>
                {/* <button onClick={capturePhoto}>Chụp ảnh</button> */}
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
                <img
                  src={image}
                  alt="Ảnh chụp"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Row>
            </StyledCol>
          </Row>
        </Col>
      </Row>
      <Col span={20} style={{ marginLeft: '120px' }}>
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Row justify="center">
            <Col xs={24} sm={12} lg={12}>
              <Row>
                <Form.Item
                  name="IDCard"
                  style={{ paddingTop: '20px', marginBottom: '7px' }}
                >
                  <h2 style={{ display: 'flex', alignItems: 'center' }}>
                    IDCard:
                    <Input
                      ref={inputRef}
                      value={IDCard}
                      onChange={(e) => setIDCard(e.target.value)}
                    />
                  </h2>
                </Form.Item>
              </Row>
              <Row>
                <Row>
                  <Form.Item name="parkingCode" style={{ marginBottom: '7px' }}>
                    <h2>ParkingCode : {parkingCode}</h2>
                  </Form.Item>
                </Row>
                {/* <Form.Item
              name="parkingCode"
            >
              <h2>ParkingCode: {parkingCode} </h2>
            </Form.Item> */}
              </Row>
              <Row>
                <Form.Item name="username" style={{ marginBottom: '7px' }}>
                  <h2>Tài khoản gửi: {username}</h2>
                </Form.Item>
              </Row>

              <Row>
                <Form.Item name="cost" style={{ marginBottom: '7px' }}>
                  <h2>Thành tiền: {cost}VND</h2>
                </Form.Item>
              </Row>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Row>
                <Form.Item
                  name="entryTime"
                  style={{ paddingTop: '20px', marginBottom: '7px' }}
                >
                  <h2>Thời gian vào: {entryTime}</h2>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="outTime" style={{ marginBottom: '7px' }}>
                  <h2>Thời gian ra: {outTime}</h2>
                </Form.Item>
              </Row>

              <Row>
                <Form.Item
                  name="lisenseVehicle"
                  style={{ marginBottom: '7px' }}
                >
                  <h2>Biển số xe: {lisenseVehicle}</h2>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="vehicleyType" style={{ marginBottom: '7px' }}>
                  <h2>Loại xe: {vehicleyType}</h2>
                </Form.Item>
              </Row>
            </Col>

            <Form.Item style={{ textAlign: 'center' }}>
              <StyledButtonPressedEffect type="primary" htmlType="submit">
                Cho xe ra
              </StyledButtonPressedEffect>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </>
  )
}

export default OutMotoComponent
