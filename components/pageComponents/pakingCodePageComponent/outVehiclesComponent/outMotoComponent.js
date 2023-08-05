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
  const [lisenseVehicleUrl, setLisenseVehicleUrl] = useState('')
  const cloudinaryCloudName = 'dmjzk4esn'
  const cloudinaryUploadPreset = 'ImageMoto'
  const [urlImage, setUrlImage] = useState('')
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
    const data = {
      username,
      lisenseVehicle,
      entryTime,
      outTime,
      vehicleyType,
      parkingCode,
      cost
    }
    await axios
      .delete(`${BASE_URL}entryVehicles/IDCard?IDCard=${IDCard}`)
      .then((response) => {
        setIsLoading(true)
      })
      .catch((error) => {
        inputRef.current.focus()
        setIDCard()
        setIsLoading(false)
        message.error(error.response.data.message)
      })
    console.log('va', data)
    await axios
      .post(`https://localhost:44366/api/bill`, data)
      .then(() => {
        // setIsLoading(false)
        message.info('Cho xe ra thành công')
        inputRef.current.focus()
        setIDCard('')
        setlisenseVehicle()
        setvehicleyType()
        setCost()
        setEntryTime()
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
    const imageSrc = webcamRef.current.getScreenshot()
    const formData = new FormData()
    let a
    formData.append('file', imageSrc)
    formData.append('upload_preset', cloudinaryUploadPreset)
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Image uploaded successfully:', response.data.secure_url)
      const recognitionUrl = 'http://localhost:80/api/recognition'
      const requestBody = response.data.secure_url // Adjust the data value as required

      const recognitionResponse = await axios.post(recognitionUrl, requestBody)
      a = recognitionResponse.data.data[0].textPlate
      console.log('aabb', a)
      setLisenseVehicleUrl(recognitionResponse.data.data[0].textPlate)
      console.log(recognitionResponse.data)
      // Save the URL of the image to the database or handle the response as needed
    } catch (error) {
      console.error('Error uploading image:', error)
    }
    setTimeout(() => {
      setCapturedImage('')
    }, 3000)
    console.log('Image URL:', image)
    setIsLoading(true)
    // try {
    //    // Handle the data returned from the API
    // } catch (error) {
    //   console.error(error); // Handle the error if the API call fails
    // }
    console.log(IDCard)
    try {
      const response = await axios.get(
        `${BASE_URL}entryVehicles/IDCard?IDCard=${IDCard} `
      )
      const res = await axios.get(
        `${BASE_URL}entryVehicles/cost?IDCard=${IDCard}&ParkingCode=${parkingCode}`
      )

      setlisenseVehicle(response.data.result.items[0].lisenseVehicle)
      const b = response.data.result.items[0].lisenseVehicle
      setImage(response.data.result.items[0].image)
      if (a == b) {
        console.log('aaaaaaa', response.data.result.items[0].image)
        setvehicleyType(response.data.result.items[0].vehicleyType)
        setEntryTime(response.data.result.items[0].entryTime)
        setCost(res.data.cost)
        const costt = res.data.cost
        const idCard = IDCard
        const data = { costt, idCard }
        const putResponse = await axios
          .put(`${BASE_URL}ticket/money`, data)
          .then(() => {
            setIsLoading(false)
            message.info('Thanh toán thành công thành công')
          })
          .catch((error) => {
            setIsLoading(false)
            message.error(error.response.data.message)
            console.log(error)
          })
      } else {
        setIsLoading(false)
        message.error('Biển số xe không đúng')
        setIDCard('')
      }
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
          <H8Styled style={{ margin: '10px 0px 5px 0px', textAlign: 'center' }}>
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
                    height: '70%'
                  }}
                >
                  <div style={{ width: '80%', height: '80%' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      //       videosource="usb" // Specify the webcam connected via USB
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
      <Col span={20} style={{ marginLeft: '80px' }}>
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
            <Col xs={24} sm={8} lg={8}>
              <Row>
                <Form.Item
                  name="IDCard"
                  style={{ paddingTop: '15px', marginBottom: '7px' }}
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
                  <Form.Item name="parkingCode" style={{ marginBottom: '7px' }}>
                    <h2>ParkingCode : {parkingCode}</h2>
                  </Form.Item>
                </Row>
                <Row>
                <Form.Item name="cost" style={{ marginBottom: '7px' }}>
                  <h2>Thành tiền: {cost}VND</h2>
                </Form.Item>
              </Row>
          
         
            </Col>
            <Col xs={24} sm={8} lg={8}>
            <Row>
                <Form.Item
                  name="lisenseVehicle"
                  style={{ paddingTop: '15px', marginBottom: '7px' }}
                >
                  <h2>Biển số xe: {lisenseVehicle}</h2>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="vehicleyType" style={{ marginBottom: '7px' }}>
                  <h2>Loại xe: {vehicleyType}</h2>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item
                  name="entryTime"
                  style={{marginBottom: '7px' }}
                >
                  <h2>Thời gian vào: {entryTime}</h2>
                </Form.Item>
              </Row>

            </Col>
            <Col xs={24} sm={8} lg={8}>
            <Row>
                <Form.Item name="outTime" style={{ marginBottom: '7px',marginTop:'15px' }}>
                  <h2>Thời gian ra: {outTime}</h2>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="username" style={{ marginBottom: '7px' }}>
                  <h2>Tài khoản gửi: {username}</h2>
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
