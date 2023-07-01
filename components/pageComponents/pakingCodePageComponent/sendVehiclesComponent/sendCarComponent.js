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
  const [type, setType] = useState('xe oto')
  const [IDCard, setIDCard] = useState()
  const [parkingCode, setParkingCode] = useState()
  const [entryTime, setEntryTime] = useState()
  const [userName, setUserName] = useState('')
  const [license, setLisense]=useAtom(licenseMoto)
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(true);
  const cloudinaryCloudName = 'dmjzk4esn';
  const cloudinaryUploadPreset = 'ImageMoto';
const [url, setUrlImage] = useState('')

  useEffect(() => {
    const initialValues = parseInt(Cookies.get('parkingCode'));
    setParkingCode(initialValues)
    const parsedUserName = String(Cookies.get('userName'))
    setUserName(parsedUserName)
    setEntryTime(moment().format('HH:mm:ss  YYYY-MM-DD '))
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    try {
      const entryUrl = `${BASE_URL}entryVehicles`;
      const entryRequestData = {
        // IDCard: IDCard,
        lisenseVehicle: license,
        vehicleyType: type,
        parkingCode: parkingCode,
        userName: userName,
        entryTime: entryTime,
        image: url,
      };
    
      setIsLoading(true);

      axios.post(entryUrl, entryRequestData)
        .then(() => {
          setIsLoading(false);
          message.info('Thêm thành công');
        })
        .catch((error) => {
          setIsLoading(false);
          message.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const capturePhoto = async( ) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    uploadImageToCloudinary(imageSrc);
    setTimeout(() => {
      setCapturedImage(null);
    }, 3000);
    console.log("im", url)
    setIsLoading(true)
    try {
      const recognitionUrl = 'http://localhost:80/api/recognition';
      const requestBody = 'https://res.cloudinary.com/deae9vxvg/image/upload/v1687963412/b67mtgekdjqjlbsjjb74.jpg' // Thay đổi giá trị dữ liệu tùy theo yêu cầu
    
    
      const recognitionResponse = await axios.post(recognitionUrl, requestBody);
      setLisense(recognitionResponse.data.license_plate)
      console.log(recognitionResponse.data); // Xử lý dữ liệu trả về từ API
    
      
    } catch (error) {
      console.error(error); // Xử lý lỗi trong trường hợp gọi API không thành công
    }
    
  
  };

  const uploadImageToCloudinary = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', cloudinaryUploadPreset);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUrlImage(response.data.secure_url)
      console.log('Image uploaded successfully:', response.data.secure_url);
      // Lưu URL của ảnh vào cơ sở dữ liệu hoặc xử lý phản hồi khác tùy ý
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  // useEffect(()=>{ 
  //   // Tạo một đối tượng chứa dữ liệu để gửi lên API
  //   const values = {
  //     IDCard: IDCard,
  //     licensePlate: license,
  //     vehicleType: type,
  //     parkingCode: parkingCode,
  //     senderAccount: userName,
  //     entryTime: entryTime
  //   };
  //   // Gửi yêu cầu POST bằng axios
  //   console.log('va', values)
  //   setIsLoading(true)
  //   axios
  //     .post(`${BASE_URL}entryVehicles`, values)
  //     .then(() => {
  //       setIsLoading(false)
  //       message.info('Thêm thành công')
  //     })
  //     .catch((error) => {
  //       setIsLoading(false)
  //       message.error(error.response.data.message)
  //     })
  
  // },[license])
  
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
          <div style={{ width: '90%', height: '90%' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              videoSource="usb" // Chỉ định sử dụng webcam cắm qua cổng USB
              style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}
            />
          </div>
        )}
      </div>
      {cameraActive && <button onClick={capturePhoto}>Chụp ảnh</button>}
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
                <h2>Biển số xe: {license} </h2>
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
