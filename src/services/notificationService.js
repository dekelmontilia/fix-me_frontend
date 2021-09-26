import { eventBusService } from './eventBusService'

export const notificationService = {
  notify(type, txt) {
    eventBusService.emit('notify', { type, txt })
  },
}
