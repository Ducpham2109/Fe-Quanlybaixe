import { Form, Input, message, Spin } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../../../api/requet'
import { StyledButtonPressedEffect } from '../../styled/styledListOfDevice/styledComponent'
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
const FormResisterDevice = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onFinish = async (values) => {
    values.role = 2;
    console.log(values)
    setIsLoading(true)
    axios
      .post(`${BASE_URL}account`, values)
      .then(() => {
        setIsLoading(false)
        message.info('Thêm thành công')
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)
      })
  }
  return (
    <>
      <Spin size="large" spinning={isLoading}>
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ textAlign: 'center', width: '100%' }}
        >
         

          <Form.Item
            label="Tài Khoản"
            name="userName"
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
              value={userName}
              onBlur={(e) => setUserName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Mật Khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp Mật Khẩu !'
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
                message:
                  'Mật khẩu phải trên 8 ký tự và phải gồm có 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt và 1 số, ví dụ: Mobifone1@ '
              }
            ]}
          >
            <Input.Password
              value={password}
              onBlur={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Hãy Nhâp email !'
              }
            ]}
          >
            <Input value={email} onBlur={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Hãy Nhập số điện thoại!'
              },
              {
                pattern: /^0[3|5|7|8|9]\d{8}$/,
                message: 'Nhập đúng số điện thoại!'
              }
            ]}
          >
            <Input
              value={phoneNumber}
              onBlur={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
     
          <Form.Item style={{ textAlign: 'center' }}>
            <StyledButtonPressedEffect type="primary" htmlType="submit">
              Đăng kí
            </StyledButtonPressedEffect>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}

export default FormResisterDevice
