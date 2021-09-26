import './RemoveProductColorModal.scss'

import { useState } from 'react'
import { AppModal } from '../AppModal'
import { ProductSizeButton } from '../ProductSizeButton'
import { ProductColorButton } from '../ProductColorButton'

export const RemoveProductColorModal = ({
  closeModal,
  removeProductColor,
  caughtColors,
}) => {
  const [color, setColor] = useState(null)

  return (
    <AppModal closeModal={closeModal} className='interactive-modal'>
      <h2 className='title'>Remove Product Color</h2>
      <div className='list flex'>
        {caughtColors.map((curr) => (
          <ProductColorButton
            key={curr}
            color={curr}
            // @ts-ignore
            onClick={() => setColor(curr)}
            isActive={color === curr}
          />
        ))}
      </div>
      <button
        className='primary-button'
        disabled={!color}
        onClick={() => {
          removeProductColor(color)
          closeModal()
        }}
      >
        Remove
      </button>
    </AppModal>
  )
}
