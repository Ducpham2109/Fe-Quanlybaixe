import { Button, Col, Form, Input, Pagination, Popconfirm, Row, Spin, Table, Tooltip, Typography, message } from "antd"
import { memo, useEffect, useState } from "react"
import Container from "../../containers/container"
import COLOR from "../../../utils/color"
import { Router, useRouter } from "next/router"
import ReloadIcon from "../../icons/reloadIcon"
import AddParkingModal from "./addParkingModal"
import SearchParking from "./searchParking"
import styled from "styled-components"
import { dataParkSearchAtom, deviceClickRowAtom, parkingDataAtom, totalParkSearchAtom, valueParkSearchAtom } from "../../atom/store"
import { useAtom } from "jotai"
import Cookies from "js-cookie"
import axios from "axios"
import { BASE_URL } from "../../../api/requet"
import EditIcon from "../../icons/editIcon"
import DeleteIcon from "../../icons/deleteIcon"
import { EyeOutlined } from "@ant-design/icons"
import { UrlPath } from "../../../type/urlPath"

const TableAntStyled = styled(Table)`
  background-color: #f5f0bb !important;
`
const ParkingComponent = ()=>{
    const [isLoading, setLoading] = useState(false)
    const [parkingInfo, setParkingInfo] = useState([])

    const [data, setData] = useAtom(parkingDataAtom)
    const [dataOri, setDataOri] = useState('')
    const [skip, setSkip] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [totalItem, setTotalItem] = useState(0)
    const [, setDeviceClickRow] = useAtom(deviceClickRowAtom)
    const [parkingAdminInfo,setParkingAdminInfo] = useState()
    const [dataSearch, setDataAccSearch] = useAtom(dataParkSearchAtom)
    const [totalSearch, setTotalAccSearch] = useAtom(totalParkSearchAtom)
    const [valueSearch, setValueAccSearch] = useAtom(valueParkSearchAtom)

    var cookies = document.cookie.split(';');

    // Tìm và lấy giá trị của "parkingCode" từ cookie
    var parkingCode;
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith("parkingCode=")) {
        parkingCode = cookie.substring("parkingCode=".length, cookie.length);
        break;
      }
    }

// Sử dụng giá trị parkingCode
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (parseInt(Cookies.get('role')) === 0) {
            const response = await axios.get(
              `${BASE_URL}parking?Skip=${skip}&PageSize=${pageSize}`
            );
            setParkingInfo(response.data.result.items);
          } else {
            const response = await axios.get(
              `${BASE_URL}parking/parkingCode?Skip=${skip}&PageSize=${pageSize}&ParkingCode=${parkingCode}`
            );
            setParkingAdminInfo(response.data.result.items);
          }
        } catch (error) {
          // Xử lý lỗi khi gọi API
          console.error(error);
        }
      };
    
      fetchData();
    }, [skip]);
    
    const originData = [];
    
    useEffect(() => {
      const processData = () => {
        const data = parseInt(Cookies.get('role')) === 0 ? parkingInfo : parkingAdminInfo;
        if (data) {
          Object.entries(data).map((item, index) => {
            originData.push({
              key: index,
              parkingCode: item[1].parkingCode,
              parkingName: item[1].parkingName,
              parkingAddress: item[1].parkingAddress,
              mmPrice: item[1].mmPrice,
              mnPrice: item[1].mnPrice,
              nmPrice: item[1].nmPrice,
              nnPrice: item[1].nnPrice,
              capacity: item[1].capacity
            });
          });
          setDataOri(originData);
        }
      };
    
      processData();
    }, [parkingInfo, parkingAdminInfo]);
    


  const handlePaging = (page, pageSizeAnt) => {
    setSkip((page - 1) * 10)
    setPageSize(pageSizeAnt)
    const getParking = async () => {
      await axios
        .get(
          `${BASE_URL}account/search?Skip=${
            (page - 1) * 10
          }&PageSize=${pageSizeAnt}&Search=${valueSearch}`
        )
        .then((response) => {
          if (response.data.result.items.length === 0) {
            message.error('Không tìm thấy kết quả nào')
          } else {s
            setDataAccSearch(response.data.result.item)
            setTotalAccSearch(response.data.result.totalItems)
          }
        })

        .catch((error) => {
          message.error('Không tồn tại')
          // setData(newDataConfigFailure)
        })
    }
    if (dataSearch.length === 0) {
    } else {
      getParking()
    }
  }
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            
            style={{
              margin: 0
            }}
            rules={[
              {
                required: true,
                message: `xin hãy nhập ${title}!`
              }
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')
    const isEditing = (record) => record.key === editingKey
    const edit = (record) => {
      form.setFieldsValue({
        parkingCode: '',
        parkingName: '',
        parkingAddress: '',
        mmPrice: '',
        mnPrice: '',
        nmPrice: '',
        nnPrice: '',
        capacity: '',
        ...record
      })
      setEditingKey(record.key)
    }
    
    const cancel = () => {
      setEditingKey('')
    }
    const save = async (key) => {
      setLoading(true)
      try {
        const row = await form.validateFields()
        if (Object.keys(data).length === 0) {
          var newData = [...dataOri]
          var newDataConfigFailure = [...dataOri]
        } else {
          var newData = [...data]
          var newDataConfigFailure = [...data]
        }
  
        const index = newData.findIndex((item) => key === item.key)
        if (index > -1) {
          const item = newData[index]
          newData.splice(index, 1, {
            ...item,
            ...row
          })
  
          await axios
            .put(`${BASE_URL}Parking`, {
              parkingCode: newData[index].parkingCode,
              parkingName: newData[index].parkingName,
              parkingAddress: newData[index].parkingAddress,
              mmPrice: newData[index].mmPrice,
              mnPrice: newData[index].mnPrice,
              nmPrice: newData[index].nmPrice,
              nnPrice: newData[index].nnPrice,
              capacity: newData[index].capacity,
            })
            .then(() => {
              message.info('Thay đổi thành công')
              setData(newData)
            })
            .catch((error) => {
              message.error(error.response.data.message)
              setData(newDataConfigFailure)
            })
        } else {
          newData.push(row)
          setData(newData)
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo)
      }
      setEditingKey('')
      setLoading(false)
    }
    const handleDelete = (key) => {
      if (Object.keys(data).length === 0) {
        var newData = [...dataOri]
        
  
      } else {
        var newData = [...data]
      }
      const index = newData.findIndex((item) => key === item.key)
      const parkingCode= newData[index].parkingCode
      axios.delete(`${BASE_URL}Parking/PakingCode?ParkingCode=${parkingCode}`) 
      const newDataAfterDelete = newData.filter((item) => item.key !== key)
      setData(newDataAfterDelete)
    }
    const handleClickEye = (record) => {
      setDeviceClickRow(record)
      sessionStorage.setItem('parkingCode', record.parkingCode)
      sessionStorage.setItem('parking', JSON.stringify(record))
      router.push(`${UrlPath.parkingCode.url}${record.parkingCode}`)
    }
    const columns = [
      {
        title: 'Thao tác',
        dataIndex: 'operation',
        width: '10%',
        fixed: 'left',
        render: (_, record) => {
          const editable = isEditing(record)
          return editable ? (
            <Row justify="center" gutter={[8, 4]}>
              
              <Col>
                <Typography.Link onClick={() => save(record.key)}>
                  <Button>Lưu</Button>
                </Typography.Link>
              </Col>
              <Col>
                <Popconfirm title="chắc chắn để hủy?" onConfirm={cancel}>
                  <Button>Hủy</Button>
                </Popconfirm>
              </Col>
            </Row>
          ) : (
            <Row justify="center" gutter={[8, 4]}>
               <Col>
                <Tooltip title="Xem chi tiết" mouseEnterDelay={0.5}>
                  <EyeOutlined
                    onClick={() => {
                      handleClickEye(record)
                    }}
                    style={{ fontSize: '20px' }}
                  />
                </Tooltip>
                </Col>
              <Col>
                <Typography.Link
                  disabled={editingKey !== ''}
                  onClick={() => edit(record)}
                >
                  <EditIcon height={'1.5em'} width={'1.5em'} />
                </Typography.Link>
              </Col>
              <Col>
                <Popconfirm
                  title="chắc chắn để xóa?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <div style={{ cursor: 'pointer' }}>
                    <DeleteIcon width={'20px'} height={'20px'} />

                  </div>
                </Popconfirm>
              </Col>
            </Row>
          )
        }
      },
      {
        title: 'ParkingCode',
        dataIndex: 'parkingCode',
        width: '10%',
        editable: true
      },
      {
        title: ' Tên Bãi Đỗ',
        dataIndex: 'parkingName',
        width: '10%',
        editable: true
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'parkingAddress',
        width: '15%',
        editable: true
      },
      {
        title: 'Sức chứa',
        dataIndex: 'capacity',
        width: '10%',
        editable: true
      },
      {
        title: ' Giá oto sáng',
        dataIndex: 'nmPrice',
        width: '10%',
        editable: true
      },
      {
        title: 'Giá oto tối',
        dataIndex: 'nnPrice',
        width: '10%',
        editable: true
      },
      {
        title: 'Giá xe máy sáng',
        dataIndex: 'mmPrice',
        width: '11%',
        editable: true
      },
      {
        title: 'Giá xe máy tối',
        dataIndex: 'mnPrice',
        width: '10%',
        editable: true
      }
    ]
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record)
        })
      }
    })
    const router = useRouter()
    return (
        <>
        <Spin spinning={isLoading} tip={"Đang xử lý"}>
            <Container backgroundColor={COLOR.BEE[1]}>
                <Button     
                 onClick = {() => router.reload()}
                    icon = {
                        <ReloadIcon
                        style={{ margin: '2px 1px 0 4px' }}
                        width={'17px'}
                        height={'17px'}
                        />
                    }>
                </Button>
           <Row gutter={[8, 10]} style={{ marginBottom: '16px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>{parseInt(Cookies.get('role')) === 0&&
              <AddParkingModal title="Thêm bãi đỗ" form="add" />}
            </Col>
            <Row justify="center">
            <Col  xs={{ span: 24 }} lg={{ span: 20 }}>
            {parseInt(Cookies.get('role')) === 0&&
                  <SearchParking/>}
            </Col>
            </Row>
          </Row>
          <Form form={form} component={false}>
            <TableAntStyled
              components={{
                body: {
                  cell: EditableCell
                }
              }}
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
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>
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
export default memo(ParkingComponent)