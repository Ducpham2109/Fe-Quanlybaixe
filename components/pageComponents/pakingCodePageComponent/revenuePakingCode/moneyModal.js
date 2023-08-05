import { Button, Modal } from 'antd'
import React, { memo, useState } from 'react'
import FormAddAccount from '../../accountComponent/formAddAccount'
import MoneyIcon from '../../../icons/moneyIcon'
import MoneyTicket from './moneyTicket'

const MoneyModal = () => {
  const [, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
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
  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: '1px',
          position: 'relative'
        }}
      >
        <MoneyIcon
          style={{ position: 'absolute', left: '-10px' }}
          width={'2em'}
          height={'2em'}
        />
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={'400px'}
      >
        <MoneyTicket/>
      </Modal>
    </>
  )
}

export default memo(MoneyModal)
