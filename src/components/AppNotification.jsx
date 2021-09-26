import { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { eventBusService } from '../services/eventBusService'
toast.configure()

export const AppNotification = () => {
  const notify = (notification) => {
    toast[notification.type](notification.txt)
  }

  useEffect(() => {
    eventBusService.on('notify', notify)
  }, [])

  return null
}
