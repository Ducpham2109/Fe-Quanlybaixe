import { Col, Row } from 'antd'
import styled from 'styled-components'
import { StyledH2 } from '../../components/styled/styledH/styledH'
import FormResisterDevice from '../../components/pageComponents/authPageComponent/formResisterDevice'
import CarouselComponent from '../../components/pageComponents/authPageComponent/carousel'

const PHeaderStyled = styled.p`
  font-size: 15px;
  font-weight: 600;
`
const SpanContentStyled = styled.span`
  font-size: 15px;
  font-weight: 400;
  display: flex;
  padding-bottom: 20px;
  /* text-align: justify;
  text-justify: inter-word; */
  text-justify: distribute;
`
const Index = () => {
  return (
    <>
      <CarouselComponent />
      <Row justify="center">
        <Col xs={23} sm={20} md={16} lg={12} style={{ textAlign: 'justify' }}>
          <br />
          <StyledH2>Giới thiệu về hệ thống </StyledH2>
          <SpanContentStyled>
            Hệ thống quản lý chuỗi bãi gửi xe mục địch đưa ra một hệ thống giúp
            người quản trị dễ dàng quản lý bãi gửi xe của mình. Giúp việc ra vào
            xe một cách tự động dễ kiểm soát. Khách hàng dẽ dàng tìm kiếm bãi
            gửi xe được liên kết với nhau có vị trí gần mình
          </SpanContentStyled>
          <br />
        </Col>
      </Row>
      <Row gutter={[0, 16]} justify="center">
        <Col
          xs={23}
          md={18}
          lg={7}
          style={{ marginTop: '20px', textAlign: 'center' }}
        >
          <img width={'100%'} src="/images/img1.png" alt="" />
          <PHeaderStyled>Hệ Thống Xử Lý Tốc Độ Cao</PHeaderStyled>
        </Col>
        <Col xs={23} md={18} lg={7} style={{ textAlign: 'center' }}>
          <img width={'100%'} src="/images/img2.png" alt="" />
          <PHeaderStyled>
            Trang Web Cấu Hình Thân Thiện Với Người Dùng
          </PHeaderStyled>
        </Col>
        <Col xs={23} md={18} lg={7} style={{ textAlign: 'center' }}>
          <img width={'100%'} src="/images/img7.png" alt="" />
          <PHeaderStyled>Quản Lý Chuỗi Hệ Thống Bãi Gửi Xe</PHeaderStyled>
        </Col>
      </Row>

      <Row justify="center">
        <Col
          xs={23}
          sm={20}
          md={16}
          lg={12}
          style={{ textAlign: 'justify' }}
        ></Col>
      </Row>
      <div style={{ backgroundColor: '#ece8c5' }}>
        <Row gutter={[32, 16]} justify="center">
          <Col xs={22} sm={20} md={16} lg={6}>
            <div>
              <br />
              <StyledH2>DPARKING</StyledH2>
              <PHeaderStyled style={{ textAlign: 'center' }}>
                Hệ thống quản lý bãi đỗ xe DPARKING
              </PHeaderStyled>
              <SpanContentStyled>
                DParking là một thương hiệu về hệ thống giữ xe thông minh. Là
                thành quả tập thể của Những Con Người Dám Nghĩ Dám Làm và chấp
                nhận thách thức
              </SpanContentStyled>
              <SpanContentStyled>
                Trụ sở chính Hà Nội: 25 Vũ Ngọc Phan, phường Láng Hạ, quận Đống
                Đa, Hà Nội
              </SpanContentStyled>
              <SpanContentStyled>Số điện thoại: 1900 636 44</SpanContentStyled>
              <SpanContentStyled>Email: ducham50@gmail.com</SpanContentStyled>
            </div>
          </Col>

          <Col xs={22} sm={20} md={16} lg={8}>
            <div>
              <br />
              <StyledH2>ĐĂNG KÍ TÀI KHOẢN</StyledH2>
              <FormResisterDevice />
            </div>
          </Col>
          <Col xs={23} md={18} lg={6} style={{ textAlign: 'center' }}>
            <div>
              <br />
              <StyledH2>FANPAGE</StyledH2>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Index
