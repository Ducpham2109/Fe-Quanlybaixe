import styled from 'styled-components'

export const DivSideBarStyled1 = styled.div`
  background: #3260a9;
  height: 100vh;
  position: fixed;
  z-index: 1000;
`
export const DivSideBarStyled2 = styled.div`
  height: 76px;
  display: flex;
  justify-content: center;
  border-bottom: 0px solid #4eb3bb;
  align-items: center;
`
export const DivSideBarStyled3 = styled.div`
  padding: ${(props) => props.padingX};
  border: none;
`
