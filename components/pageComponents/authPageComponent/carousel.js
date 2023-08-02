import { Carousel } from 'antd'
import styled from 'styled-components'
const CarouselStyled = styled(Carousel)`
  width: auto;
  @media (max-width: 768px) {
    margin-top: 64px;
  }
`
const CarouselComponent = () => {
  return (
    <>
      <CarouselStyled autoplay dots={false} effect={'fade'}>
        <div>
          <img width={'100%'} src="/images/a.jpg" alt="" />
        </div>
        {/* <div>
          <img width={'100%'} src="/images/bg2.png" alt="" />
        </div>
        <div>
          <img width={'100%'} src="/images/bg3.png" alt="" />
        </div>
        <div>
          <img width={'100%'} src="/images/bg4.png" alt="" />
        </div> */}
      </CarouselStyled>
    </>
  )
}

export default CarouselComponent
