import { Row } from 'antd'
import styled from 'styled-components'

export const RowAntStyled = styled(Row)`
  width: 100%;
  height: ${(props) => props.$height};
  border-top: 1px solid hsla(0, 0%, 100%, 0.08);
`
export const H5Styled = styled.h5`
  color: #8898aa;
  text-transform: uppercase;
  font-size: 14px;
`
export const SpanStyled = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
  color: #32325d;
`
export const PStyled = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin-left: 16px;
`
