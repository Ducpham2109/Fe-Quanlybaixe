import { Button } from 'antd'
import styled from 'styled-components'
export const StyledButtonAntd = styled(Button)`
  border: none;
  box-shadow: none;
  background-color: transparent;
  font-weight: 500;
  :focus {
    outline: none;
  }
`

export const StyledButtonPressedEffect = styled(Button)`
  padding: 6px 38px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #3260a9;
  border: none;
  border-radius: 6px;
  box-shadow: 0 6px #999;

  :hover {
    background-color: #b5f5ec;
    color: #fff;
  }

  :active {
    background-color: #b5f5ec;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`

export const StyledDiv = styled.div`
  background-color: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;
  @media (min-width: 992px) {
    margin-bottom: 70px;
  }
  @media (max-width: 576px) {
    margin-top: ${(props) => props.top576};
  }
  margin-bottom: ${(props) => props.marginBottom};

  /* box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%); */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: rgba(0, 0, 0, 0.05);
  border-right-color: rgba(0, 0, 0, 0.05);
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-left-color: rgba(0, 0, 0, 0.05);
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
`
export const StyledChildrenDiv = styled.div`
  width: 86%;
`
export const StyledGrandchildrenDiv = styled.div`
  background: linear-gradient(
    87deg,
    ${(props) => props.des},
    ${(props) => props.sou}
  ) !important;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;

  float: right;
`
export const StyledDivChart = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  position: relative;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`
