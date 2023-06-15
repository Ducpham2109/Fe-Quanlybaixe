import { Col, Form, Input, Row, Spin, message } from "antd"
import { memo, useState } from "react"
import { StyledButtonPressedEffect } from "../../styled/styledListOfDevice/styledComponent"
import axios from "axios"
import { BASE_URL } from "../../../api/requet"
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

const FormAddParking = ( ) => {
    const [pakingCode, setParkingCode] = useState('')
    const [parkingAddress, setPakingAddress] = useState('')
    const [parkingName, setParkingName] = useState('')
    const [mmPrice, setMmPrice] = useState('')
    const [mnPrice, setMnPrice] = useState('')
    const [nmPrice, setNmPrice] = useState('')
    const [nnPrice, setNnPrice] = useState('')
    const [capacity, setCapacity] = useState('')


    const [isLoading, setLoading]= useState(false)
    const onFinish = (values) => {
      setLoading(true)
      axios
        .post(`${BASE_URL}Parking`, values)
        .then(() => {
          setLoading(false)
          message.info('Thêm thành công')
        })
        .catch((error) => {
          setLoading(false)
          message.error(error.response.data.message)
        })
    }
    const onFinishFailed = (errorInfo) => {
    }
    return(
        <>
        
        <Spin size="Large" spinning={isLoading}>
            <Form  
             name="basic"
             initialValues={{
            remember: true
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          >
           <h2 style={{ fontSize: '20px', textAlign: 'center' }}>Thêm Bãi Đỗ</h2>
{/* 
            <Form.Item
            label="ParkingCode"
            name="ParkingCode"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập ParkingCode!',},]}

            >
                <Input
              value={pakingCode}
              onBlur={(e) => setParkingCode(e.target.value)}
            />
            </Form.Item> */}
            <Form.Item
            label="Tên Bãi Đỗ"
            name="ParkingName"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập tên bãi đỗ!',},]}

            >
                <Input
              value={parkingName}
              onBlur={(e) => setParkingName(e.target.value)}
            />
            </Form.Item>
            <Form.Item
            label="Địa Chỉ"
            name="ParkingAddress"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập địa chỉ!',},]}

            >
                <Input
              value={parkingAddress}
              onBlur={(e) => setPakingAddress(e.target.value)}
            />
            </Form.Item>
            <Form.Item
            label="Sức chứa"
            name="Capacity"
            style={{ paddingBottom: '1px' }}
            rules={[{required: true, message: 'Hãy nhập sức chứa !',},]}
            >
                <Input
              value={capacity}
              onBlur={(e) => setCapacity(e.target.value)}
            />
            </Form.Item>
            <Row gutter={[16, 48]}>
              <Col span={"12"}>
            <Form.Item
            label="Giá xe oto buổi sáng"
            name="Nmprice"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập giá tiền!',},]}

            >
                <Input
              value={mmPrice}
              onBlur={(e) => setMmPrice(e.target.value)}
            />
            </Form.Item>
            </Col>
            <Col span={"12"}>
            <Form.Item
            label="Giá xe oto buổi tối"
            name="NnPrice"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập giá tiền!',},]}

            >
                <Input
              value={mnPrice}
              onBlur={(e) => setMnPrice(e.target.value)}
            />
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={[16, 48]}>
              <Col span={"12"}>
            <Form.Item
            label="Giá xe máy buổi sáng"
            name="MMPrice"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập giá tiền!',},]}

            >
                <Input
              value={nmPrice}
              onBlur={(e) => setNmPrice(e.target.value)}
            />
            </Form.Item>
            </Col>
            <Col span={"12"}>
            <Form.Item
            label="Giá xe máy buổi tối"
            name="MnPrice"
            style={{ paddingBottom: '1px' }}

            rules={[{required: true, message: 'Hãy nhập giá tiền!',},]}
            >
                <Input
              value={nnPrice}
              onBlur={(e) => setNnPrice(e.target.value)}
            />
            </Form.Item>
            </Col>
            </Row>
            
            <Form.Item style={{ textAlign: 'center' }}>
            <StyledButtonPressedEffect type="primary" htmlType="submit">
              Thêm
            </StyledButtonPressedEffect>
          </Form.Item>
          </Form>
        </Spin>
        </>
    )
}
export default memo(FormAddParking)