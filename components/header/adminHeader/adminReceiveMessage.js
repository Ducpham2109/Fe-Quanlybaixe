import { HubConnectionBuilder } from '@microsoft/signalr'
import { Button, Input, notification } from 'antd'
import { useAtom } from 'jotai'
import React, { memo, useEffect, useState } from 'react'
import { BASE_URL } from '../../../api/requet'
import { chatSenderAtom } from '../../atom/store'

const AdminReceiveMessage = () => {
  const [connection, setConnection] = useState()

  const [chatSender, setChatSender] = useAtom(chatSenderAtom)

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}hubs/notifications`)
      .withAutomaticReconnect()
      .build()
    setConnection(connect)
    // console.log('hhhhhhhhhh')
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on(`AdminReceiveChat_${1}`, (message, user) => {
            notification.open({
              // message: header,
              description: message
            })
            setChatSender(user)
          })
        })
        .catch((error) => console.log(error))
    }
  }, [connection])

  return <></>
}

export default memo(AdminReceiveMessage)
