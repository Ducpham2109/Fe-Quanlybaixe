import { useAtom } from 'jotai'
import { memo, useEffect, useState } from 'react'
import {
  dataParkSearchAtom,
  deviceClickRowAtom,
  parkingDataAtom,
  totalParkSearchAtom,
  valueParkSearchAtom
} from '../../atom/store'
import { BASE_URL } from '../../../api/requet'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button, Col, Form, Input, Modal, Pagination, Row, Spin, Table } from 'antd'
import { useRouter } from 'next/router'
import Container from '../../containers/container'
import COLOR from '../../../utils/color'
import styled from 'styled-components'
import ReloadIcon from '../../icons/reloadIcon'
import SearchParking from '../parkingComponent/searchParking'
import { StyledButtonPressedEffect } from '../../styled/styledListOfDevice/styledComponent'

const TableAntStyled = styled(Table)`
  background-color: #f5f0bb !important;
`
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
const ParkingComponent = () => {
  const [isLoading, setLoading] = useState(false)
  const [parkingInfo, setParkingInfo] = useState([])

  const [data, setData] = useAtom(parkingDataAtom)
  const [dataOri, setDataOri] = useState('')
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItem, setTotalItem] = useState(0)
  const [, setDeviceClickRow] = useAtom(deviceClickRowAtom)
  const [parkingAdminInfo, setParkingAdminInfo] = useState()
  const [dataSearch, setDataAccSearch] = useAtom(dataParkSearchAtom)
  const [totalSearch, setTotalAccSearch] = useAtom(totalParkSearchAtom)
  const [valueSearch, setValueAccSearch] = useAtom(valueParkSearchAtom)
  const [idCard, setIDCard] = useState()
  const [open, setOpen] = useState(false)
  const [money, setMoney] = useState()
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const onFinish1 = (values) => {
    const response = axios.get(`${BASE_URL}ticket/ticket/IdCard?IDCard=${values.idCard}`)
      .then((response)=>{
        console.log("money", response.data)
        setMoney(response.data.monney+""+"VND")
        setLoading(false)
        // setIDCard('')
        
      })
      .catch((error)=>{
        setLoading(false)
        message.error('Vui lòng nhập đúng IDCard ')
        setMoney("0VND")
        
        
      })
  };
  const onFinishFailed1 = (errorInfo) => {}

  useEffect(() => {
    var cookies = document.cookie.split(';')
    var parkingCode
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      if (cookie.startsWith('parkingCode=')) {
        parkingCode = cookie.substring('parkingCode='.length, cookie.length)
        break
      }
    }

    // Sử dụng giá trị parkingCode ở đây
    console.log(parkingCode)
    // Các hành động khác...
  }, []) // Thay đổi dependency array nếu cần thiết

  // Sử dụng giá trị parkingCode
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}parking?Skip=${skip}&PageSize=${pageSize}`
        )
        setParkingInfo(response.data.result.items)
      } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error(error)
      }
    }

    fetchData()
  }, [skip])

  const originData = []

  useEffect(() => {
    const processData = () => {
      const data =
        parseInt(Cookies.get('role')) === 2 ? parkingInfo : parkingAdminInfo
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
          })
        })
        setDataOri(originData)
      }
    }

    processData()
  }, [parkingInfo, parkingAdminInfo])

  const handlePaging = (page, pageSizeAnt) => {
    setSkip((page - 1) * 10)
    setPageSize(pageSizeAnt)
    // const getParking = async () => {
    //   await axios
    //     .get(
    //       `${BASE_URL}account/search?Skip=${
    //         (page - 1) * 10
    //       }&PageSize=${pageSizeAnt}&Search=${valueSearch}`
    //     )
    //     .then((response) => {
    //       if (response.data.result.items.length === 0) {
    //         message.error('Không tìm thấy kết quả nào')
    //       } else {s
    //         setDataAccSearch(response.data.result.item)
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
    //   getParking()
    // }
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

  const columns = [
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      width: '10%',
      fixed: 'left'
      // render: (_, record) => {
      //   const editable = isEditing(record)
      //   return editable ? (
      //     <Row justify="center" gutter={[8, 4]}>

      //       <Col>
      //         <Typography.Link onClick={() => save(record.key)}>
      //           <Button>Lưu</Button>
      //         </Typography.Link>
      //       </Col>
      //       <Col>
      //         <Popconfirm title="chắc chắn để hủy?" onConfirm={cancel}>
      //           <Button>Hủy</Button>
      //         </Popconfirm>
      //       </Col>
      //     </Row>
      //   ) : (
      //     <Row justify="center" gutter={[8, 4]}>
      //        <Col>
      //         <Tooltip title="Xem chi tiết" mouseEnterDelay={0.5}>
      //           <EyeOutlined
      //             onClick={() => {
      //               handleClickEye(record)
      //             }}
      //             style={{ fontSize: '20px' }}
      //           />
      //         </Tooltip>
      //         </Col>
      //       <Col>
      //         <Typography.Link
      //           disabled={editingKey !== ''}
      //           onClick={() => edit(record)}
      //         >
      //           <EditIcon height={'1.5em'} width={'1.5em'} />
      //         </Typography.Link>
      //       </Col>
      //       <Col>
      //         <Popconfirm
      //           title="chắc chắn để xóa?"
      //           onConfirm={() => handleDelete(record.key)}
      //         >
      //           <div style={{ cursor: 'pointer' }}>
      //             <DeleteIcon width={'20px'} height={'20px'} />

      //           </div>
      //         </Popconfirm>
      //       </Col>
      //     </Row>
      //   )
      // }
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
      title: 'Trạng thái',
      dataIndex: 'capacity',
      width: '10%',
      editable: true,
      render: (text) => {
        return 'Còn chỗ'
      }
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
      <Spin spinning={isLoading} tip={'Đang xử lý'}>
        <Container backgroundColor={COLOR.BEE[1]}>
          <Button
          style={{marginBottom:'20px'}}
            onClick={() => router.reload()}
            icon={
              <ReloadIcon
                style={{ margin: '2px 1px 0 4px' }}
                width={'17px'}
                height={'17px'}
              />
            }
          ></Button>
          <Row  style={{ marginBottom: '16px' }}>
            <Col style={{marginRight:'50px'}}>
          <Button onClick={showModal}>Kiểm tra tài khoản </Button>
          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            width={'400px'}
          >
            <Form
        name="basic"
        initialValues={{
          remember: true
        }}
        layout="vertical"
        onFinish={onFinish1}
        onFinishFailed={onFinishFailed1}
        validateMessages={validateMessages}
      >
        </Form>
        <h2 style={{ fontSize: '20px', textAlign: 'center', marginBottom:'20px'}}>  Kiểm tra tài khoản </h2>

                 <Form.Item
          label="IDcard"
          name="idCard"
          rules={[
            {
              required: true,
              message: 'Hãy Nhâp IDCard!'
            },
            {
              pattern: /^[0-9]+$/,
              message: 'Hãy nhập số IDCard! '
            }
          ]}
        >
          <Input value={idCard} onBlur={(e) => setIDCard(e.target.value)} />
        </Form.Item>
        <p>Số dư tài khoản: {money}</p>
        <Form.Item style={{ textAlign: 'center' }}>
        <StyledButtonPressedEffect type="primary" htmlType="submit">
          Tìm kiếm
        </StyledButtonPressedEffect>
      </Form.Item>
          </Modal>
          </Col>
          <Col>
            <SearchParking />
            </Col>
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
