import { Button, Col, Form, Modal, Pagination, Row, Spin, Table, Tooltip } from "antd"
import Container from "../../../../components/containers/container"
import COLOR from "../../../../utils/color"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReloadIcon from "../../../../components/icons/reloadIcon"
import axios from "axios"
import { useAtom } from "jotai"
import Cookies from "js-cookie"
import { dataAccSearchAtom, deviceClickRowAtom, modalCostVehicle, modalbillVisible, totalAccSearchAtom, valueAccSearchAtom, vehicleModalData, vehiclesDataAtom } from "../../../atom/store"
import SearchVehicle from "./searchVehicle"
import AddVehicleModal from "./addVehicleModal"
import { BASE_URL } from "../../../../api/requet"
import FormOutVehilce from "./formOutVehilce"
import ExitParking from "../../../icons/exitParking"

const ForParkingComponent = (prop) => {
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])

  const [data, setData] = useAtom(vehiclesDataAtom)
  const [dataOri, setDataOri] = useState('')
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItem, setTotalItem] = useState(0)
  const [modalVisible, setModalVisible] = useAtom(modalbillVisible)

  const [dataSearch, setDataAccSearch] = useAtom(dataAccSearchAtom)
  const [totalSearch, setTotalAccSearch] = useAtom(totalAccSearchAtom)
  const [valueSearch, setValueAccSearch] = useAtom(valueAccSearchAtom)
  const [parrkingCode, setParkingCode] = useState();
  const [cost,setCost]= useAtom(modalCostVehicle)

  const [code,setCode]= useState()
  const router = useRouter()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const [modalData, setModalData] = useAtom(vehicleModalData)

 const 
 handleClickExit = (record) => {
  setModalData(record);
  setModalVisible(true);
}

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  // const [editingKey, setEditingKey] = useState('')
  // const isEditing = (record) => record.key === editingKey
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${BASE_URL}entryVehicles?Skip=${skip}&PageSize=${pageSize}`
        
        )
      setVehicles(response.data.result.items)
    //  setTotalItem(response.data.result.totalItems)
    }
  getData([])
  }, [skip])
  useEffect(() => {
    const initialValues =(sessionStorage.getItem('parkingCode'))
    setParkingCode(initialValues);
  }, []);

//   const handlePaging = (page, pageSizeAnt) => {
//     setSkip((page - 1) * 10)
//     setPageSize(pageSizeAnt)
//     const getImei = async () => {
//       await axios
//         .get(
//           `${BASE_URL}entryVehicles/search?Skip=${
//             (page - 1) * 10
//           }&PageSize=${pageSizeAnt}&Search=${valueSearch}`
//         )
//         .then((response) => {
//           if (response.data.result.items.length === 0) {
//             message.error('Không tìm thấy kết quả nào')
//           } else {
//             setDataAccSearch(response.data.result.items)
//             setTotalAccSearch(response.data.result.totalItems)
//           }
//         })
//         .catch((error) => {
//           message.error('Không tồn tại')
//           // setData(newDataConfigFailure)
//         })
//     }
//     if (dataSearch.length === 0) {
//     } else {
//       getImei()
//     }
//   }

  const originData = []
  useEffect(() => {
    const filteredData = Object.entries(
      parseInt(Cookies.get('role')) === 0 ? vehicles : vehicles
    )
      .filter((item) => item[1].parkingCode == parrkingCode)
      .map((item, index) => ({
        key: index,
        entryTime: item[1].entryTime,
        parkingCode: item[1].parkingCode,
        username: item[1].username,
        vehicleyType: item[1].vehicleyType,
        image: item[1].image,
        lisenseVehicle: item[1].lisenseVehicle,
      }));
    setDataOri(filteredData);
  }, [vehicles]);

  const handleClose =()=>{
    setCost()
    console.log("han")

  }
  const columns = [
 
    {
      title: 'ParkingCode',
      dataIndex: 'parkingCode',
      width: '10%',
      editable: true
    },
    {
      title: ' Tên tài khoản',
      dataIndex: 'username',
      width: '15%',
      editable: true
    },
    {
      title: 'Loại xe',
      dataIndex: 'vehicleyType',
      width: '15%',
      editable: true
    },
    {
      title: 'Biển số xe',
      dataIndex: 'lisenseVehicle',
      width: '15%',
      editable: true
    },
    {
      title: 'Thời gian vào',
      dataIndex: 'entryTime',
      width: '15%',
      editable: true
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      width: '20%',
      editable: true
    },
    {
        title: 'Thao tác',
        dataIndex: 'operation',
        width: '10%',
        fixed: 'left',
      
        onCell: (record) => {
          return {
            record,
            
            onClick: () => {
              // gọi hàm để hiển thị modal
              // showModal(record);
              handleClickExit(record)
            },
          };
        },
        render: () => (
          <Tooltip title="Cho xe ra" mouseEnterDelay={0.5}>       
            <div ><ExitParking width={"30px"} height={"30px"} color={"red"}/></div>
            </Tooltip>
        ),
      }, 
    ]
    return (
      <>
   <Spin spinning={isLoading} tip = "Đang xử lý">
        <Container backgroundColor={COLOR.BEE[1]}> 
        <Button 
            onClick={() => router.reload()}
            icon={
              <ReloadIcon
                style={{ margin: '2px 1px 0 4px' }}
                width={'17px'}
                height={'17px'}
              />
            }>
            
        </Button>
        <Row gutter={[8, 10]} style={{ marginBottom: '16px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <AddVehicleModal title="Thêm" form="add" />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 20 }}>
              <SearchVehicle/>
            </Col>
          </Row>
          <Form form={form} component={false}>
            <Table
            columns={columns}
            bordered
              scroll={{
                x: 400,
                y: 600
              }}
              dataSource={
                dataSearch.length === 0
                  ? Object.keys(data).length === 0
                    ? dataOri
                    : data
                  : dataSearch
              }
            rowClassName="editable-row">
        
            </Table>
          
       <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        footer={[]}
        afterClose={handleClose}
        width={'500px'}
      >
           <FormOutVehilce form={prop.form} title={prop.title}/>
      </Modal>
          </Form>
          {/* <Pagination
            total={dataSearch.length === 0 ? totalItem : totalSearch}
            onChange={handlePaging}
            style={{ float: 'right', margin: '10px' }}
          /> */}
        </Container>
      </Spin>
      </>
    )
  }
  
  export default ForParkingComponent