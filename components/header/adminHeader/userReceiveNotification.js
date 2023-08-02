import { HubConnectionBuilder } from '@microsoft/signalr'
import { useAtom } from 'jotai'
import React, { memo, useEffect, useState } from 'react'
import { BASE_URL } from '../../../api/requet'
import {
  isNotificationCounterAtom,
  isNotificationCounterNumberAtom,
  userReceiveNotificationAtom
} from '../../atom/store'

const UserReceiveNotification = () => {
  const [connection, setConnection] = useState()

  const [userReceiveNotification, setUserReceiveNotification] = useAtom(
    userReceiveNotificationAtom
  )
  const [isNotificationCounter, setIsNotificationCounter] = useAtom(
    isNotificationCounterAtom
  )
  const [isNotificationCounterNumber, setIsNotificationCounterNumber] = useAtom(
    isNotificationCounterNumberAtom
  )

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}hubs/notifications`)
      .withAutomaticReconnect()
      .build()

    setConnection(connect)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('UserReceiveNotification', (message, user, header) => {
            setUserReceiveNotification((pre) => [
              {
                userName: user,
                headerContent: header,
                content: message
              },
              ...pre
            ])
            setIsNotificationCounter(true)
            setIsNotificationCounterNumber((pre) => [{ abc: 1 }, ...pre])
          })
        })
        .catch((error) => console.log(error))
    }
  }, [connection])

  return <></>
}

export default memo(UserReceiveNotification)
