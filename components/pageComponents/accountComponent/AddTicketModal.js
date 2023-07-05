import { Button, Modal } from "antd"
import { useState } from "react"
import FormAddTicket from "./formAddTicket"

const AddTicketModal = () => {
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
        <Button onClick={showModal}> Nạp tiền User </Button>
        <Modal
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
          width={'350px'}
        >
          <FormAddTicket />
        </Modal>
      </>
    );
}

export default AddTicketModal;