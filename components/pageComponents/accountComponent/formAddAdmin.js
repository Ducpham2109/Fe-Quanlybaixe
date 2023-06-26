import { Form, Input, Spin, message } from 'antd'
import { useState } from 'react'
import { StyledButtonPressedEffect } from '../../styled/styledListOfDevice/styledComponent'
import { BASE_URL } from '../../../api/requet'
import axios from 'axios'

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
const FormAddAdmin = () => {
  const [username, setUsername] = useState('')
  const [parkingCode, setParkingCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}management`, values)
      .then(() => {
        setIsLoading(false)
        message.info('Thêm thành công')
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)
      })
  }
  const onFinishFailed = (errorInfo) => {}
  return (
    <>
      <Spin size="large" spinning={isLoading}>
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
          <h2 style={{ fontSize: '20px', textAlign: 'center' }}>
            {' '}
            Thêm quyền Admin
          </h2>
          <Form.Item
            label="Tài Khoản"
            name="username"
            style={{ paddingTop: '20px' }}
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp Tài Khoản!'
              },
              {
                pattern: /^.{4,}$/,
                message: 'Tài khoản quá ngắn! '
              }
            ]}
          >
            <Input
              value={username}
              onBlur={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="ParkingCode"
            name="parkingCode"
            style={{ paddingBottom: '20px' }}
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp parkingCode !'
              }
            ]}
          >
            <Input
              value={parkingCode}
              onBlur={(e) => setParkingCode(e.target.value)}
            />
          </Form.Item>

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

export default FormAddAdmin
