import { Form, Input, Spin } from "antd"
import { memo, useState } from "react"
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
const FormChangePass = ()=>{
    const [isLoading, setLoading] = useState(false)
    const [oldPasswordTemp, setOldPasswordTemp] = useState('')
    const [newPasswordTemp, setNewPasswordTemp] = useState('')
    const onFinish= ()=>{
        setLoading(true)
    }
    const onFinishFailed = (errorInfo) => {
    }
    return(
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
          autoComplete="on"
          validateMessages={validateMessages}
        >
            <Form.Item 
             name="oldPassword"
             rules={[
               {
                 required: true,
                 message: 'Xin Hãy Nhâp Mật Khẩu Cũ!'
               },
               {
                 pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
                 message:
                   'Mật khẩu phải trên 8 ký tự và phải gồm có 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt và 1 số, ví dụ: Mobifone1@ '
               }
             ]}
             >
                <Input
              placeholder="Mật Khẩu Cũ"
              value={oldPasswordTemp}
              onChange={(e) => setOldPasswordTemp(e.target.value)}
            />
             </Form.Item>
             
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Xin Hãy Nhâp Mật Khẩu Mới!'
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
                message:
                  'Mật khẩu phải trên 8 ký tự và phải gồm có 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt và 1 số, ví dụ: Mobifone1@ '
              }
            ]}
          >
            <Input.Password
              placeholder="Mật Khẩu Mới"
              value={newPasswordTemp}
              onChange={(e) => setNewPasswordTemp(e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <StyledButtonPressedEffect
              type="primary"
              htmlType="submit"
              // onClick={handleChange}
            >
              Thay Đổi
            </StyledButtonPressedEffect>
          </Form.Item>
        </Form>
        </Spin>
        </>
    )
}
export default memo(FormChangePass)