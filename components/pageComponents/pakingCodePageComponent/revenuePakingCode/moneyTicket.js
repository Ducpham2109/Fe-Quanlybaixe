import { Form, Input, Spin, message } from 'antd'
import { useState } from 'react'
import axios from 'axios'

import Cookies from 'js-cookie'
import { StyledButtonPressedEffect } from '../../../styled/styledListOfDevice/styledComponent'
import { BASE_URL } from '../../../../api/requet'

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
const MoneyTicket = () => {
  const [idCard, setIDCard] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [parkingCode, setParkingCode] = useState()
  const [preLoading, setpreLoading] = useState()
  const onFinish2 = (values) => {
    
    console.log('va', values)
    setIsLoading(true)

    axios
      .post(`${BASE_URL}parking/UpdatePerLoading`, values)
      .then(() => {
        // Gọi API đầu tiên thành công
        setIsLoading(false)
        message.info('Xác nhận thành công')
        setIDCard('')
        // Tiếp tục gọi API thứ hai
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)
      })
    setShowAdditionalField(false)
  }
  const onFinishFailed2 = (errorInfo) => {}

  return (
    <>
      <Spin size="large" spinning={isLoading}>
        <Form
          name="basic"
          initialValues={{
            remember: true
          }}
          layout="vertical"
          onFinish={onFinish2}
          onFinishFailed={onFinishFailed2}
          validateMessages={validateMessages}
        >
          <h2 style={{ fontSize: '20px', textAlign: 'center' }}>
            Thu tiền vé từ Admin
          </h2>

          <Form.Item
            label="ParkingCode"
            name="parkingCode"
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp ParkingCode!'
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Hãy nhập số ! '
              }
            ]}
          >
            <Input
              value={parkingCode}
              onBlur={(e) => setParkingCode(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Số tiền đã thu"
            name="preLoading"
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp Số Tiền Đã Thu!'
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Hãy nhập số ! '
              }
            ]}
          >
            <Input
              value={preLoading}
              onBlur={(e) => setpreLoading(e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <StyledButtonPressedEffect type="primary" htmlType="submit">
              Xác nhận
            </StyledButtonPressedEffect>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}

export default MoneyTicket
