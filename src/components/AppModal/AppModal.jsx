import { useState } from 'react'
import reactDom from 'react-dom'
import './AppModal.scss'

export const AppModal = ({
  className = '',
  closeModal = () => '',
  enableClosing = true,
  avoidAnimation = false,
  children,
}) => {
  const [isGoingToClose, setIsGoingToClose] = useState(false)

  const startClose = () => {
    setIsGoingToClose(true)
    setTimeout(closeModal, 1500)
  }

  return reactDom.createPortal(
    <div
      className={`modal-container center-childs ${className} ${
        isGoingToClose && 'out'
      } ${avoidAnimation ? 'avoid-animation' : ''}`}
      onClick={enableClosing ? startClose : () => ''}
    >
      <div className='modal' onClick={(ev) => ev.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  )
}
