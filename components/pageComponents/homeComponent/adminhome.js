import { Col, Row } from 'antd'
import {
  StyledDiv,
  StyledDivChart,
  StyledGrandchildrenDiv
} from '../../styled/styledListOfDevice/styledComponent'
import AdminHomeParkingIcon from '../../icons/aminHomeParkingIcon'
import GreenTickIcon from '../../icons/greenTickIcon'
import {
  H5Styled,
  SpanStyled
} from '../../styled/HomeStyledComponent/listStyled'
import NewUserIcon from '../../icons/newUserIcon'
import MoneyIcon from '../../icons/moneyIcon'
import { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { BASE_URL } from '../../../api/requet'
import Cookies from 'js-cookie'
import { VerticalBarChart } from '../../chart/verticalBarChart'
import { PieChart } from '../../chart/pieChart'

const Adminhome = () => {
  const [monthRevenue, setMonthRevenue] = useState()
  const [currentMonth, setCurrentMonth] = useState('')
  // const [parkingCode,setParkingCode] = useState()
  const [capacity, setCapacity] = useState()
  const [totalVehicleTrue, setTotalVehicleTrue] = useState()
  const [totalVehicleFalse, setTotalVehicleFalse] = useState()
  const [totalItemAcc, setTotalItemAcc] = useState()
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  //   useEffect(() => {
  //   setParkingCode(parseInt(Cookies.get('parkingCode ')))
  // },[parkingCode]);
  //    console.log("park",parkingCode)
  var cookies = document.cookie.split(';')

  // Tìm và lấy giá trị của "parkingCode" từ cookie
  var parkingCode
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim()
    if (cookie.startsWith('parkingCode=')) {
      parkingCode = cookie.substring('parkingCode='.length, cookie.length)
      break
    }
  }

  // Sử dụng giá trị parkingCode
  console.log('parking', parkingCode)
  useEffect(() => {
    const monthNumber = parseInt(moment().format('M'))
    setCurrentMonth(monthNumber)
  }, [currentMonth])
  useEffect(() => {
    if (currentMonth !== '') {
      const getData = async () => {
        const response = await axios.get(
          `${BASE_URL}bill/revenue/parkingCode/month?Month=${currentMonth}&ParkingCode=${parkingCode}`
        )
        setMonthRevenue(response.data.revenve)
        console.log('re', response.data.revenve)
      }
      getData()
    }
  }, [currentMonth])
  useEffect(() => {
    if (parkingCode) {
      const gettData = async () => {
        const response = await axios.get(
          `${BASE_URL}parking/capacity/parkingCode?ParkingCode=${parkingCode}`
        )
        setCapacity(response.data.capacity)
        console.log('aaa', response.data.capacity)
      }
      gettData()
    }
  }, [parkingCode])
  useEffect(() => {
    if (currentMonth !== '') {
      const getData = async () => {
        const response = await axios.get(
          `${BASE_URL}entryVehicles/parkingCode/month?ParkingCode=${parkingCode}&Month=${currentMonth}`
        )
        setTotalVehicleFalse(response.data.totalVehiclesFalse)
      }
      getData()
    }
  }, [currentMonth])

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get(
  //       `${BASE_URL}account?Skip=${skip}&PageSize=${pageSize}`
  //     )
  //     setTotalItemAcc(response.data.result.totalItems)
  //   }
  //   getData()
  // }, [skip])
  return (
    <>
      <Col span={23} style={{ marginLeft: '18px' }}>
        <Row gutter={[16, 16]} style={{ marginBottom: '70px' }}>
          <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
            <StyledDiv>
              <Row gutter={[24, 16]}>
                <Col xs={18}>
                  <H5Styled>Số chỗ trống : </H5Styled>
                  <SpanStyled>{capacity} chỗ </SpanStyled>
                </Col>
                <Col xs={6}>
                  <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                    <div style={{ padding: '5px' }}>
                      <AdminHomeParkingIcon width={'2em'} height={'2em'} />
                    </div>
                  </StyledGrandchildrenDiv>
                </Col>
              </Row>
            </StyledDiv>
          </Col>
          <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
            <StyledDiv>
              <Row gutter={[24, 16]}>
                <Col xs={18}>
                  <H5Styled>Số xe đang gửi :</H5Styled>
                  <SpanStyled>{totalVehicleFalse} xe</SpanStyled>
                </Col>
                <Col xs={6}>
                  <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                    <div style={{ padding: '5px' }}>
                      <GreenTickIcon width={'2em'} height={'2em'} />
                    </div>
                  </StyledGrandchildrenDiv>
                </Col>
              </Row>
            </StyledDiv>
          </Col>
          <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
            <StyledDiv>
              <Row gutter={[24, 16]}>
                <Col xs={18}>
                  <H5Styled>Khách hàng mới :</H5Styled>
                  <SpanStyled> {totalItemAcc} khách hàng</SpanStyled>
                </Col>
                <Col xs={6}>
                  <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                    <div style={{ padding: '9px' }}>
                      <NewUserIcon width={'2.5em'} height={'2.5em'} />
                    </div>
                  </StyledGrandchildrenDiv>
                </Col>
              </Row>
            </StyledDiv>
          </Col>
          <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
            <StyledDiv>
              <Row gutter={[24, 16]}>
                <Col xs={18}>
                  <H5Styled>Doanh thu tháng {currentMonth} :</H5Styled>
                  <SpanStyled>{monthRevenue}VND</SpanStyled>
                </Col>
                <Col xs={6}>
                  <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                    <div style={{ padding: '5px' }}>
                      <MoneyIcon width={'2em'} height={'2em'} />
                    </div>
                  </StyledGrandchildrenDiv>
                </Col>
              </Row>
            </StyledDiv>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <StyledDivChart top={'-56px'}>
              <VerticalBarChart />
              <br />
            </StyledDivChart>
          </Col>
          <Col xs={24} sm={12}>
            <StyledDivChart top={'-56px'}>
              <PieChart />

              <br />
            </StyledDivChart>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Adminhome
