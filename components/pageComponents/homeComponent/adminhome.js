import moment from "moment";
import { Col, Row } from 'antd'
import { memo, useEffect, useState } from 'react'
import { StyledDiv, StyledDivChart, StyledGrandchildrenDiv } from '../../styled/styledListOfDevice/styledComponent'
import { H5Styled, SpanStyled } from '../../styled/HomeStyledComponent/listStyled'
import { BASE_URL } from '../../../api/requet'
import axios from 'axios'
import AdminHomeParkingIcon from '../../icons/aminHomeParkingIcon'
import GreenTickIcon from "../../icons/greenTickIcon";
import NewUserIcon from "../../icons/newUserIcon";
import MoneyIcon from "../../icons/moneyIcon";
import Container from "../../containers/container";
import { VerticalBarChart } from "../../chart/verticalBarChart";



const AdminHome = () => {
const [totalItemPark,setTotalItemPark] = useState()
const [totalItemAcc,setTotalItemAcc] = useState()

const [skip, setSkip] = useState(0)
const [pageSize, setPageSize] = useState(10)
const [currentMonth, setCurrentMonth] = useState("");
const [ monthRevenue,setMonthRevenue] = useState()
useEffect(() => {

  const monthNumber = parseInt(moment().format("M"));
  setCurrentMonth(monthNumber);
},[currentMonth]);
useEffect(() => {
  if (currentMonth !== "") {
  console.log("mao", currentMonth)
  const getData = async () => {
    const response = await axios.get(
      `${BASE_URL}bill/revenue/month?Month=${currentMonth}`
    )
   setMonthRevenue(response.data.revenve)
  }
  getData()
}
}, [currentMonth])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${BASE_URL}parking?Skip=${skip}&PageSize=${pageSize}`
      )
      setTotalItemPark(response.data.result.totalItems)
    }
    getData()
  }, [])
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${BASE_URL}account?Skip=${skip}&PageSize=${pageSize}`
      )
  
      setTotalItemAcc(response.data.result.totalItems)
     
    }
    getData()
  }, [skip])
  
  return (
    <>
     <Col span={23} style={{ marginLeft: '18px' }}>
      <Row  gutter={[16,16]}>
            <Col  xs={24} sm={12} lg={6} style={{ marginTop: '30px', textAlign:'center'  }}>
        <StyledDiv>
        <Row  gutter={[24,16]}>
               <Col xs={18}>
              <H5Styled>Số bãi đỗ xe : </H5Styled>
              <SpanStyled>{totalItemPark} bãi đỗ</SpanStyled>
              </Col>    
              <Col xs={6}>
              <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
              <div style={{padding: "5px"}}>
                          <AdminHomeParkingIcon
                            width={'2em'}
                            height={'2em'}
                          />
                         </div>  
                      </StyledGrandchildrenDiv>
              </Col>      
              </Row>
           
            </StyledDiv>
            </Col>
            <Col xs={24} sm={12} lg={6} style={{ marginTop: '30px', textAlign:'center'  }}>
            <StyledDiv>
            <Row gutter={[24,16]}>
               <Col xs={18}>
              <H5Styled>Số xe đang gửi :</H5Styled>
              <SpanStyled>{totalItemAcc} xe</SpanStyled>
              </Col>    
              <Col xs={6}>
              <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
                <div style={{padding: "5px"}}>
                     
                          <GreenTickIcon
                            width={'2em'}
                            height={'2em'}
                          />
                        
                      </div>
                      </StyledGrandchildrenDiv>
              </Col>
              </Row>
            </StyledDiv>
            </Col>
            <Col xs={24} sm={12} lg={6} style={{ marginTop: '30px', textAlign:'center' }}>
            <StyledDiv>
            <Row gutter={[24,16]}>
               <Col xs={18}>
              <H5Styled>Khách hàng mới :</H5Styled>
              <SpanStyled>{totalItemAcc} khách hàng</SpanStyled>
              </Col>    
              <Col xs={6}>
              <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
              <div style={{padding: "9px"}}>
                          <NewUserIcon
                            width={'2.5em'}
                            height={'2.5em'}
                          />
                         </div>
                      </StyledGrandchildrenDiv>
              </Col>
              </Row>
            </StyledDiv>
            </Col>
            <Col xs={24} sm={12} lg={6} style={{ marginTop: '30px', textAlign:'center' }}>
            <StyledDiv>
            <Row gutter={[24,16]}>
               <Col xs={18}>
              <H5Styled>Doanh thu tháng {currentMonth} :</H5Styled>
              <SpanStyled>{monthRevenue}VND</SpanStyled>
              </Col>    
              <Col xs={6}>
              <StyledGrandchildrenDiv des="#f5365c" sou="#f56036">
              <div style={{padding: "5px"}}>
                          <MoneyIcon
                            width={'2em'}
                            height={'2em'}
                          />
                         </div>
                      </StyledGrandchildrenDiv>
              </Col>

              </Row>
            </StyledDiv>
            </Col>
      </Row>
      </Col>
      <Container>
      <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <StyledDivChart top={'-56px'}>
              <Row justify="center">
                <Col span={22}>
                  <VerticalBarChart />
                
                  <br />
                </Col>
              </Row>
            </StyledDivChart>
          </Col>
          <Col xs={24} sm={12}>
            <StyledDivChart top={'-56px'}>
              <div style={{ width: '50%' }}>
                {/* <PieChart /> */}
              </div>
            </StyledDivChart>
          </Col>
        </Row>
        </Container>
    </>
  )
}

export default memo(AdminHome)
