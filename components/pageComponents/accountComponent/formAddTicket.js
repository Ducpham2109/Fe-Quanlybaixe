import { Form, Input, Spin, message } from 'antd'
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
  const [idCard, setIDCard] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [moneyd, setMoneyd]= useState()

  const [money, setMoney] = useState()
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const onFinish1 = (values) => {
    setIDCard(values.idCard)
    console.log("idcard",  values.idCard)
      const response = axios.get(`${BASE_URL}ticket/ticket/IdCard?IDCard=${values.idCard}`)
      .then((response)=>{
        console.log("money", response.data)
        setMoneyd(response.data.monney+""+"VND")
        setIsLoading(false)
        // setIDCard('')
        message.info('IDCard tồn tại , nhập số tiền cần nạp thêm')
        
      })
      .catch((error)=>{
        setIsLoading(false)
        message.error('IDCard chưa tồn tại, nhập số tiền cần nạp để tạo mới IDCard')
        setMoneyd("0VND")
        
        
      })
      setShowAdditionalField(true);
    
  };
  const onFinish2 = (values) => {
    values.idCard=idCard;
    console.log('va', values)
    setIsLoading(true)

    axios
      .post(`${BASE_URL}ticket`, values)
      .then(() => {
        // Gọi API đầu tiên thành công
        setIsLoading(false)
        message.info('Nạp tiền thành công thành công thành công')
        setIDCard('')
        // Tiếp tục gọi API thứ hai
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(error.response.data.message)

      })
      setShowAdditionalField(false);

  }
  const onFinishFailed1 = (errorInfo) => {}
  const onFinishFailed2 = (errorInfo) => {}


  return (
    <>
    <Spin size="large" spinning={isLoading}>
      {!showAdditionalField&&(
      <Form
        name="basic"
        initialValues={{
          remember: true
        }}
        layout="vertical"
        onFinish={onFinish1}
        onFinishFailed={onFinishFailed1}
        validateMessages={validateMessages}
      >
        <h2 style={{ fontSize: '20px', textAlign: 'center' }}>
          Tìm kiếm
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
          <Input value={idCard} onBlur={(e) => setIDCard(e.target.value)} />
        </Form.Item>
       
        <Form.Item style={{ textAlign: 'center' }}>
        <StyledButtonPressedEffect type="primary" htmlType="submit">
         Tìm kiếm
        </StyledButtonPressedEffect>
      </Form.Item>
      </Form>
      )}
      {showAdditionalField&&(
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
          Nạp tiền cho khách hàng
        </h2>
{/* 
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
          <Input value={idCard} onBlur={(e) => setIDCard(e.target.value)} />
        </Form.Item> */}
        
  
  <p>
    Số dư tài khoản: {moneyd}
  </p>

      
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
       
   
 
        
        <Form.Item style={{ textAlign: 'center' }}>
        <StyledButtonPressedEffect type="primary" htmlType="submit">
          Thêm
        </StyledButtonPressedEffect>
      </Form.Item>
        
      </Form>
      )}
    </Spin>
    </>
  )
}

export default FormAddTicket
