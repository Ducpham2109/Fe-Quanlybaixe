import { Button, Col, Row, Spin } from "antd"
import { memo, useState } from "react"
import Container from "../../containers/container"
import COLOR from "../../../utils/color"
import { Router } from "next/router"
import ReloadIcon from "../../icons/reloadIcon"
import AddParkingModal from "./addParkingModal"
import SearchParking from "./searchParking"


const ParkingComponent = ()=>{
    const [isLoading, setLoading] = useState(false)
    return (
        <>
        <Spin spinning={isLoading} tip={"Đang xử lý"}>
            <Container backgroundColor={COLOR.BEE[1]}>
                <Button     
                 onClick = {() => Router.reload()}
                    icon = {
                        <ReloadIcon
                        style={{ margin: '2px 1px 0 4px' }}
                        width={'17px'}
                        height={'17px'}
                        />
                    }>
                </Button>
           <Row gutter={[8, 10]} style={{ marginBottom: '16px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <AddParkingModal title="Thêm bãi đỗ" form="add" />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 20 }}>
              <SearchParking/>
            </Col>
          </Row>
            </Container>
        </Spin>
        
        
        </>
    )


}
export default memo(ParkingComponent)