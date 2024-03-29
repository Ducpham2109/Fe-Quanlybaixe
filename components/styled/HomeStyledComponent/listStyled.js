import { Row } from 'antd'
import styled from 'styled-components'

export const RowAntStyled = styled(Row)`
  width: 100%;
  height: ${(
    props) => props.$height};
  border-top: 1px solid hsla(0, 0%, 100%, 0.08);
`
export const H5Styled = styled.h5`
  color: #28282c;
  text-transform: uppercase;
  font-size: 14px;
`
export const H8Styled = styled.h5`
  color: #7D7463;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 400;
`
export const SpanStyled = styled.span`
  font-size:20px ;
  font-weight: 600;
  color: #484876;
  display:block;
`
export const SpanStyledd = styled.span`
  font-size:20px ;
  font-weight: 600;
  color: #1e1e44;
  display:block;
  margin-top: 25px;
`
export const PStyled = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin-left: 16px;
`
export const BorderBillStyled= styled.div`
 border: 2px solid #00BFFF;
  padding :10px;
  border-radius: 10px 
`