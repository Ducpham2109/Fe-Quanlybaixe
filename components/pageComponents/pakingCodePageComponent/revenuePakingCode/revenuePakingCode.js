import { Button, Col, Row } from 'antd'
import {
  StyledDiv,
  StyledDivChart,
  StyledGrandchildrenDiv
} from '../../../styled/styledListOfDevice/styledComponent'
import {
  H5Styled,
  SpanStyled
} from '../../../styled/HomeStyledComponent/listStyled'
import AdminHomeParkingIcon from '../../../icons/aminHomeParkingIcon'
import GreenTickIcon from '../../../icons/greenTickIcon'
import MoneyIcon from '../../../icons/moneyIcon'
import { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { BASE_URL } from '../../../../api/requet'
import { WaveChart } from '../../../chart/waveChart'
import { VerticalBarChartCode } from '../../../chart/verticalBarChartCode'
import { VerticalBarChart } from '../../../chart/verticalBarChart'
import MoneyModal from './moneyModal'

const RevenuePakingCode = () => {
  const [parkingCode, setParkingCode] = useState()
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthRevenue, setMonthRevenue] = useState()
  const [preLoading, setPreLoading] = useState()
  const [totalVehicleTrue, setTotalVehicleTrue] = useState()
  const [totalVehicleFalse, setTotalVehicleFalse] = useState()

  useEffect(() => {
    const initialValues = sessionStorage.getItem('parkingCode')
    setParkingCode(initialValues)
  }, [])
  useEffect(() => {
    const monthNumber = parseInt(moment().format('M'))
    setCurrentMonth(monthNumber)
  }, [currentMonth])
  useEffect(() => {
    if (currentMonth !== '') {
      console.log('mao', currentMonth)
      const getData = async () => {
        const response = await axios.get(
          `${BASE_URL}bill/revenue/parkingCode/month?Month=${currentMonth}&ParkingCode=${parkingCode}`
        )
        setMonthRevenue(response.data.revenve)
        setPreLoading(response.data.preLoading)
        console.log('doanh', response.data.revenve)
      }
      getData()
    }
  }, [currentMonth])
  useEffect(() => {
    if (currentMonth !== '') {
      const getData = async () => {
        const response = await axios.get(
          `${BASE_URL}entryVehicles/parkingCode/month?ParkingCode=${parkingCode}&Month=${currentMonth}`
        )
        setTotalVehicleTrue(response.data.totalVehiclesTrue)
        setTotalVehicleFalse(response.data.totalVehiclesFalse)
      }
      getData()
    }
  }, [parkingCode, currentMonth])
  return (
    <>
      <Row justify="center">
        <Col span={22} style={{ marginLeft: '6px' }}>
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
              <StyledDiv>
                <Row gutter={[24, 16]}>
                  <Col xs={18}>
                    <H5Styled>Số xe đang gửi : </H5Styled>
                    <SpanStyled>{totalVehicleFalse} xe</SpanStyled>
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
                    <H5Styled>Số xe đã gửi :</H5Styled>
                    <SpanStyled>{totalVehicleTrue} xe</SpanStyled>
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
            <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
              <StyledDiv>
                <Row gutter={[24, 16]}>
                  <Col xs={18}>
                    <H5Styled>Tiền nạp từ khách hàng :</H5Styled>
                    <SpanStyled>{preLoading} VND</SpanStyled>
                  </Col>
                  <Col xs={6}>
                    <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                      <div style={{ padding: '5px' }}>
                  <MoneyModal/>
                      </div>
                    </StyledGrandchildrenDiv>
                  </Col>
                </Row>
              </StyledDiv>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: '40px' }}>
        <Col span={23} style={{ marginLeft: '18px' }}>
          <Row justify="center" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <StyledDivChart top={'-56px'}>
                <WaveChart />
                <br />
              </StyledDivChart>
            </Col>
            <Col xs={24} sm={12}>
              <StyledDivChart top={'-56px'}>
                <VerticalBarChartCode />
                <br />
              </StyledDivChart>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default RevenuePakingCode
