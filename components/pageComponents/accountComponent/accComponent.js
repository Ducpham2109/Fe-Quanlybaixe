import {
  Button,
  Col,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Table,
  Typography
} from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BASE_URL } from '../../../api/requet'
import COLOR from '../../../utils/color'
import {
  accountDataAtom,
  dataAccSearchAtom,
  totalAccSearchAtom,
  valueAccSearchAtom
} from '../../atom/store'
import Container from '../../containers/container'
import DeleteIcon from '../../icons/deleteIcon'
import EditIcon from '../../icons/editIcon'
import ReloadIcon from '../../icons/reloadIcon'
import AddAccountModal from './addAccountModal'
import SearchAccount from './searchAccount'
import AddAdminModal from './addAdminModal'

const TableAntStyled = styled(Table)`
  background-color: #f5f0bb !important;
`

const AccComoponent = () => {
  //get wifi form back-end
  const [isLoading, setIsLoading] = useState(false)
  const [accountUserInfo, setAccountUserInfo] = useState([])
  const [accountInfo, setAccountInfo] = useState([])
  const [accountAdminInfo, setAccountAdminInfo] = useState([])


  const [data, setData] = useAtom(accountDataAtom)
  const [dataOri, setDataOri] = useState('')
  const [skip, setSkip] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItem, setTotalItem] = useState(0)

  const [dataSearch, setDataAccSearch] = useAtom(dataAccSearchAtom)
  const [totalSearch, setTotalAccSearch] = useAtom(totalAccSearchAtom)
  const [valueSearch, setValueAccSearch] = useAtom(valueAccSearchAtom)
  const [role,setRole] = useState()
   
  useEffect(() => {

var cookies = document.cookie.split(';');
// Tìm và lấy giá trị của "parkingCode" từ cookie
for (var i = 0; i < cookies.length; i++) {
var cookie = cookies[i].trim();
if (cookie.startsWith("role=")) {
  setRole(cookie.substring("role=".length, cookie.length))
  break;
}
}
}, [role]);
useEffect(() => {
  const fetchData = async () => {
    try {
      if (parseInt(Cookies.get('role')) === 0) {
        const response = await axios.get(
          `${BASE_URL}account?Skip=${skip}&PageSize=${pageSize}`
        );
      setAccountInfo(response.data)

      } else {
        const response = await axios.get(
          `${BASE_URL}account/role?Skip=${skip}&PageSize=${pageSize}&role=2`
        );
        setAccountAdminInfo(response.data.result.items);
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error(error);
    }
  };

  fetchData();
}, [skip]);

  const handlePaging = (page, pageSizeAnt) => {
    setSkip((page - 1) * 10)
    setPageSize(pageSizeAnt)
    const getImei = async () => {
      await axios
        .get(
          `${BASE_URL}account/search?Skip=${
            (page - 1) * 10
          }&PageSize=${pageSizeAnt}&Search=${valueSearch}`
        )
        .then((response) => {
          if (response.data.result.items.length === 0) {
            message.error('Không tìm thấy kết quả nào')
          } else {
            setDataAccSearch(response.data.result.items)
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
      getImei()
    }
  }
  const originData = []

  useEffect(() => {
    Object.entries(
      parseInt(Cookies.get('role')) === 0 ? accountInfo : accountAdminInfo
    ).map((item, index) => {
      originData.push({
        key: index,
        userName: item[1].userName,
        password: item[1].password,
        permission: item[1].role,
        phoneNumber: item[1].phoneNumber,
        email: item[1].email,
        parkingCode: item[1].parkingCode,
      })
    })
    setDataOri(originData)
  }, [accountInfo,accountAdminInfo])
  console.log("ori,", dataOri)
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
      userName: '',
      password: '',
      phoneNumber:'',
      email:'',
      permission: '',
      ...record
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    setIsLoading(true)
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
        .put(`${BASE_URL}account`, {
          role: newData[index].permission,
          userName: newData[index].userName,
          password: newData[index].password,
          phoneNumber: newData[index].phoneNumber,
          email: newData[index].email,
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
    setIsLoading(false)
  }
  const handleDelete = (key) => {
    if (Object.keys(data).length === 0) {
      var newData = [...dataOri]
    } else {
      var newData = [...data]
    }
    const index = newData.findIndex((item) => key === item.key)
    console.log('aasasa',newData[index])

    const userName= newData[index].userName
    // if(record.parkingCode){
    axios.delete(`${BASE_URL}management/username?Username=${userName}`) 

    // }
    axios.delete(`${BASE_URL}account/username?Username=${userName}`) 
    const newDataAfterDelete = newData.filter((item) => item.key !== key)
    setData(newDataAfterDelete)
  }

  const columns = [
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      width: '15%',
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
      title: 'Tên Đăng Nhập',
      dataIndex: 'userName',
      width: '15%',
      editable: true
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'password',
      width: '17%',
      editable: true
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      width: '17%',
      editable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '23%',
      editable: true
    },
    {
      title: 'Quyền',
      dataIndex: 'permission',
      width: '100px',
      editable: true
    },
    {
      title: 'Quản lý bãi',
      dataIndex: 'parkingCode',
      width: '130px',
      editable: true,
    },
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
      <Spin spinning={isLoading} tip="Đang xử lý ">
        <Container backgroundColor={COLOR.BEE[1]}>
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

          <Row gutter={[8, 10]} style={{ marginBottom: '16px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <AddAccountModal title="Thêm" form="add" />
            </Col>
            
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
            {role == 0 && <AddAdminModal title="Thêm" form="add" />}
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <SearchAccount />
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
export default AccComoponent
