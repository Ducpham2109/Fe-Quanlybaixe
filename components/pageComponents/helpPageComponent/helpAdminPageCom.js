import { Col, Form, Input, message, Row, Spin } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { memo, useState } from 'react'
import { BASE_URL } from '../../../api/requet'
import { StyledButtonPressedEffect, StyledH2Hepl } from '../../styled/styledListOfDevice/styledComponent'
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

const HelpUserPageComponent = () => {

  const [headerContent, setHeaderContent] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = async (values) => {
    setIsLoading(true)
    await axios
      .post(`${BASE_URL}notification/admin/send`, {
        user: Cookies.get('userName'),
        msgText: values.content,
        msgHeader: values.headerContent
      })
      .then(() => {
        message.info('Thông báo đã được gửi thành công!')
        setIsLoading(false)
      })
      .catch(() => {
        message.error('Gửi thông báo thất bại, vui lòng thử lại!')
        setIsLoading(false)
      })
    // await axios.post(`${BASE_URL}message`, {
    //   userName: Cookies.get('userName'),
    //   role: Cookies.get('role'),
    //   headerContent: values.headerContent,
    //   content: values.content
    // })
  }
  const onFinishFailed = () => {}

  return (
    <>
      <Spin size="large" spinning={isLoading}>
        <Row justify="center" style={{ paddingTop: '60px' }}>
          <Col span={10} style={{ textAlign: 'center' }}>
            {parseInt(Cookies.get('role')) === 0 && (
              <StyledH2Hepl>Thông Báo đến mọi người </StyledH2Hepl>
            )}
            {parseInt(Cookies.get('role')) === 1 && (
              <StyledH2Hepl>Thông Báo đến User </StyledH2Hepl>
            )}
            <Form
              labelAlign="thông báo"
              name="basic"
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="headerContent"
                rules={[
                  {
                    required: true,
                    message: 'Hãy Nhâp Tiêu Đế!'
                  }
                ]}
              >
                <Input
                  style={{ height: '50px' }}
                  placeholder="Tiêu đề"
                  value={headerContent}
                  onBlur={(e) => setHeaderContent(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                s
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Hãy Nhâp Nội Dung!'
                  },
                  {
                    pattern: /^.{4,}$/,
                    message: 'Nội Dung Quá Ngắn! '
                  }
                ]}
              >
                <Input.TextArea
                  style={{ height: '100px' }}
                  value={content}
                  placeholder="Nội Dung"
                  onBlur={(e) => setContent(e.target.value)}
                />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <StyledButtonPressedEffect type="primary" htmlType="submit">
                  Gửi
                </StyledButtonPressedEffect>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  )
}

export default memo(HelpUserPageComponent)
