import { Form, Input, Spin } from 'antd'
import { useState } from 'react'
import { StyledButtonPressedEffect } from '../../styled/styledListOfDevice/styledComponent'
import axios from 'axios'
import { BASE_URL } from '../../../api/requet'

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
const FormAddTicket = () => {
  const [idCard, setIDCard] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [moneyd, setMoneyd]= useState()

  const [money, setMoney] = useState()
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowAdditionalField(true);
    }
  };
  const onFinish = (values) => {
    console.log('va', values)
    setIsLoading(true)

    axios
      .post(`${BASE_URL}ticket`, values)
      .then(() => {
        // Gọi API đầu tiên thành công
        setIsLoading(false)
        message.info('Thanh toán thành công thành công')

        // Tiếp tục gọi API thứ hai
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)
      })
  }
  const onFinishFailed = (errorInfo) => {}

  return (
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
          Nạp tiền cho khách hàng
        </h2>

        <Form.Item
          label="IDcard"
          name="idCard"
          rules={[
            {
              required: true,
              message: 'Hãy Nhâp IDCard!'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Hãy nhập số IDCard! '
            }
          ]}
        >
          <Input   onKeyDown={handleKeyDown} value={idCard} onBlur={(e) => setIDCard(e.target.value)} />
        </Form.Item>
        {showAdditionalField && (
  
  <p>
    Số dư tài khoản:{moneyd}
  </p>


)}
      {showAdditionalField && (
       <Form.Item
          label="Số tiền cần nạp"
          name="money"
          rules={[
            {
              required: true,
              message: 'Hãy Nhâp Số Tiền Cần Nạp!'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Hãy nhập số ! '
            }
          ]}
        >
          <Input value={money} onBlur={(e) => setMoney(e.target.value)} />
        </Form.Item>
       
      )}
 
        {showAdditionalField && (
        <Form.Item style={{ textAlign: 'center' }}>
        <StyledButtonPressedEffect type="primary" htmlType="submit">
          Thêm
        </StyledButtonPressedEffect>
      </Form.Item>
        )}
      </Form>
    </Spin>
  )
}

export default FormAddTicket
