import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
  dataParkSearchAtom,
  dataParkingAtom,
  modalbillVisible,
  parkingDataAtom,
  totalParkSearchAtom,
  totalSearchAtom,
  valueParkSearchAtom,
  vehicleBillModalData,
  vehicleModalData
} from '../../../atom/store'
import { BASE_URL } from '../../../../api/requet'
import Cookies from 'js-cookie'
import { Button, Col, Modal, Pagination, Row, Spin, Table, Tooltip } from 'antd'
import BillIcon from '../../../icons/billIcon'
import { useRouter } from 'next/router'
import Container from '../../../containers/container'
import COLOR from '../../../../utils/color'
import SearchParking from '../../parkingComponent/searchParking'
import ReloadIcon from '../../../icons/reloadIcon'
import axios from 'axios'
import FormBillVehilce from './formBillVehicle'
import SearchBill from './searchBill'
import { BorderBillStyded } from '../../../styled/HomeStyledComponent/listStyled'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}
const VehicleHistoryComponent = () => {
  const [modalVisible, setModalVisible] = useAtom(modalbillVisible)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useAtom(parkingDataAtom)
  const [dataOri, setDataOri] = useState('')
  const [skip, setSkip] = useState(0)
  const [bills, setBills] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [billsAdmin, setBillsAdmin] = useState([])
  const [dataSearch, setDataAccSearch] = useAtom(dataParkSearchAtom)
  const [pageSize, setPageSize] = useState(7)
  const [parking, setParking] = useAtom(dataParkingAtom)
  const [isCellClicked, setIsCellClicked] = useState(false)
  const [billmodalData, setBillModalData] = useAtom(vehicleBillModalData)
  const [userName, setUserName] = useState('')
  const [totalSearch, setTotalSearch] = useAtom(totalSearchAtom)

  useEffect(() => {
    // const initialValues = parseInt(Cookies.get('parkingCode'))
    // setParkingCode(initialValues)
    const parsedUserName = String(Cookies.get('userName'))
    setUserName(parsedUserName)
  }, [])
  const onFinish = (values) => {
    setIsLoading(true)
  }
  const handlePaging = (page, pageSizeAnt) => {
    setSkip((page - 1) * 7)
    setPageSize(pageSizeAnt)
  //   setIsLoading(true)
  //   if(parseInt(Cookies.get('role'))==0){
  //   const getVehicles = async () => {
  //     await axios
  //       .get(
  //         `${BASE_URL}bill/search?Skip=${(page - 1) * 7}&PageSize=${valueSearch}&Search=${valueSearch}`
  //       )
  //       .then((response) => {
  //         if (response.data.result.items.length === 0) {
  //           message.error('Không tìm thấy kết quả nào')
  //         } else {
  //           message.info('Lấy dữ liệu thành công')
  //           //setValueAccSearch(value)
  //           setDataAccSearch(response.data.result.items)
  //           console.log('aabbbbbaaaa', dataSearch)
  //           setTotalSearch(response.data.result.totalItems)
  //         }
  //       })
  //       .catch((error) => {
  //         message.error('Không tồn tại')
  //         // setData(newDataConfigFailure)
  //       })
  //     setIsLoading(false)
  //   }
  //   getVehicles()
  // }
  // else{
  //   const getVehicles = async () => {
  //     await axios
  //       .get(
  //         `${BASE_URL}bill/parkingCode/search?Skip=${(page - 1) * 7}&PageSize=${valueSearch}&Search=${valueSearch}&ParkingCode=${(parseInt(Cookies.get('parkingCode'))==0)}`
  //       )
  //       .then((response) => {
  //         if (response.data.result.items.length === 0) {
  //           message.error('Không tìm thấy kết quả nào')
  //         } else {
  //           message.info('Lấy dữ liệu thành công')
  //           //setValueAccSearch(value)
  //           setDataAccSearch(response.data.result.items)
  //           console.log('aabbbbbaaaa', dataSearch)
  //           setTotalSearch(response.data.result.totalItems)
  //         }
  //       })
  //       .catch((error) => {
  //         message.error('Không tồn tại')
  //         // setData(newDataConfigFailure)
  //       })
  //     setIsLoading(false)
  //   }
  //   getVehicles()
  // }
  
    // const getImei = async () => {
    //   await axios
    //     .get(
    //       `${BASE_URL}account/search?Skip=${
    //         (page - 1) * 10
    //       }&PageSize=${pageSizeAnt}&Search=${valueSearch}`
    //     )
    //     .then((response) => {
    //       if (response.data.result.items.length === 0) {
    //         message.error('Không tìm thấy kết quả nào')
    //       } else {
    //         setDataAccSearch(response.data.result.items)
    //         setTotalAccSearch(response.data.result.totalItems)
    //       }
    //     })
    //     .catch((error) => {
    //       message.error('Không tồn tại')
    //       // setData(newDataConfigFailure)
    //     })
    // }
    // if (dataSearch.length === 0) {
    // } else {
    //   getImei()
    // }
  }
  const onFinishFailed = () => {}
  const handleCellClick = (record) => {
    setBillModalData(record)
    setIsCellClicked(true)
    setModalVisible(true)
  }
  useEffect(() => {
    if (isCellClicked) {
      console.log('code', billmodalData.parkingCode)
      const getParking = async () => {
        const response = await axios.get(
          `${BASE_URL}Parking/PakingCode?ParkingCode=${billmodalData.parkingCode}`
        )
        setParking(response.data)
      }
      getParking()
      setIsCellClicked(false)
    }
  }, [billmodalData, isCellClicked])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (parseInt(Cookies.get('role')) === 0) {
          const response = await axios.get(
            `${BASE_URL}bill?Skip=${skip}&PageSize=${pageSize}`
          )
          setBills(response.data.result.items)
          setTotalItem(response.data.result.totalItems)

        }
        if (parseInt(Cookies.get('role')) === 1) {
          const response = await axios.get(
            `${BASE_URL}bill/parkingCode?Skip=${skip}&PageSize=${pageSize}&ParkingCode=${parseInt(Cookies.get('parkingCode'))}`
          )
          setBills(response.data.result.items)
          setTotalItem(response.data.result.totalItems)

        } else {
          const response = await axios.get(
            `${BASE_URL}bill/userName?UserName=${userName}`
          )
          setBillsAdmin(response.data.result.items)
        }
      } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error(error)
      }
    }

    fetchData()
  }, [skip])
 
  const originData = []

  useEffect(() => {
    Object.entries(
      parseInt(Cookies.get('role')) === 0 ? bills : bills
    ).map((item, index) => {
      originData.push({
        key: index,
        parkingCode: item[1].parkingCode,
        username: item[1].username,
        lisenseVehicle: item[1].lisenseVehicle,
        entryTime: item[1].entryTime,
        outTime: item[1].outTime,
        cost: item[1].cost,
        imageOut: item[1].imageOut,
        imageIn: item[1].imageIn,
        parkingCode: item[1].parkingCode,
        vehicleyType: item[1].vehicleyType
      })
    })
    setDataOri(originData)
  }, [bills])

  const columns = [
    {
      title: 'ParkingCode',
      dataIndex: 'parkingCode',
      width: '10%',
      editable: true,
      fixed: 'left'


    },
    {
      title: ' Tên tài khoản',
      dataIndex: 'username',
      width: '10%',
      fixed: 'left',

      editable: true
    },
    {
      title: 'Loại xe',
      fixed: 'left',
      dataIndex: 'vehicleyType',
      width: '8%',
      editable: true
    },
    {
      title: 'Biển số xe',
      fixed: 'left',
      dataIndex: 'lisenseVehicle',
      width: '10%',
      editable: true
    },
    {
      title: 'Thời gian vào',
      dataIndex: 'entryTime',
      fixed: 'left',
      width: '10%',
      editable: true
    },
    {
      fixed: 'left',
      title: 'Thời gian ra',
      dataIndex: 'outTime',
      width: '10%',
      editable: true
    },
    {
      fixed: 'left',
      title: 'Giá tiền',
      dataIndex: 'cost',
      width: '8%',
      editable: true
    },
    {
      title: 'Thao tác',
      fixed: 'left',
      dataIndex: 'operation',
      width: '10%',
      fixed: 'left',

      onCell: (record) => {
        return {
          record,
          onClick: () => {
            // gọi hàm để hiển thị modal
            // showModal(record);
            handleCellClick(record)
          }
        }
      },
      render: () => (
        <Tooltip title="In Bills" mouseEnterDelay={0.5}>
          <div>
            <BillIcon width={'40px'} height={'40px'} color={'red'} />
          </div>
        </Tooltip>
      )
    }
  ]
  const router = useRouter()

  return (
    <>

      <Spin spinning={isLoading} tip={'Đang xử lý'}>
        <Container backgroundColor={COLOR.BEE[1]}>
          <Row gutter={[8, 10]} style={{ marginBottom: '16px' }}>
            <Col span={3}>
            <Button
            onClick={() => router.reload()}
            icon={
              <ReloadIcon
                style={{ margin: '2px 1px 0 4px' }}
                width={'17px'}
                height={'17px'}
              />
            }
          ></Button>
          </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <SearchBill />
            </Col>
          </Row>
          <Table
            style={{ paddingTop: '20px' }}
            columns={columns}
            bordered
            scroll={{
              x: 400,
              y: 600
            }}
            pagination={false}

            dataSource={
              dataSearch.length === 0
                ? Object.keys(data).length === 0
                  ? dataOri
                  : data
                : dataSearch
            }
            rowClassName="editable-row"
          ></Table>

          <Modal
            title=""
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={() => setModalVisible(false)}
            validateMessages={validateMessages}
            footer={[]}
            width={'350px'}
          >
            <FormBillVehilce />
          </Modal>
          <Pagination
            total={dataSearch.length === 0 ? totalItem : totalSearch}
            onChange={handlePaging}
            style={{ float: 'right', margin: '10px' }}
          />
        </Container>
      </Spin>
    </>
  )
}

export default VehicleHistoryComponent
