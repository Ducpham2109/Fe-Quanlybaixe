import { Col, Input, Row } from 'antd'
import {
  H5Styled,
  H8Styled
} from '../../../styled/HomeStyledComponent/listStyled'
import CameraComponent from '../../cameraComponent/cameraComponent'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { capturedImagee } from '../../../atom/store'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

const StyledRow = styled(Row)`
  border: 1px solid #000;
  padding: 20px;
`
const StyledCol = styled(Col)`
  border: 3px solid #000;
  padding: 0px;
`
const SendMotoComponent = () => {
  const [capturedImage, setCapturedImage] = useAtom(capturedImagee)
  const [type, setType] = useState('xe máy')
  const [IDCard, setIDCard] = useState()
  const [parkingCode, setParkingCode] = useState()
  const [entryTime, setEntryTime] = useState()
  const [lisenseVehicle, setLisenseVehicle] = useState()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const initialValues = sessionStorage.getItem('parkingCode')
    setParkingCode(initialValues)
    const parsedUserName = String(Cookies.get('userName'))
    setUserName(parsedUserName)
    setEntryTime(moment().format('HH:mm:ss  YYYY-MM-DD '))
  }, [])
  // const postDataToApi = () => {
  //   // Tạo một đối tượng chứa dữ liệu để gửi lên API
  //   const data = {
  //     IDCard: IDCard,
  //     licensePlate: licensePlate,
  //     vehicleType: type,
  //     parkingCode: parkingCode,
  //     senderAccount: userName,
  //     entryTime: entryTime
  //   };

  //   // Gửi yêu cầu POST bằng axios
  //   axios.post('URL_API', data)
  //     .then(response => {
  //       // Xử lý kết quả trả về từ API nếu cần
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       // Xử lý lỗi nếu có
  //       console.error(error);
  //     });
  // };
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
                <CameraComponent />
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
                {capturedImage && (
                  <img
                    src={capturedImage}
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
                <h2>Loại xe: {type} </h2>
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
                <h2>Thời gian vào:{entryTime} </h2>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default SendMotoComponent
