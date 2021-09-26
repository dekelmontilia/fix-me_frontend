import './AddProductColorModal.scss'

import { useState } from 'react'
import { AppModal } from '../AppModal'
import { ProductSizeButton } from '../ProductSizeButton'
import { ProductColorButton } from '../ProductColorButton'

const allColors = ['red', 'yellow', 'green', 'purple', 'blue', 'black', 'white']

export const AddProductColorModal = ({
  closeModal,
  addProductSize: addProductColor,
  caughtColors,
}) => {
  const [color, setColor] = useState(null)

  const allowedColors = allColors.filter(
    (currColor) => !caughtColors.includes(currColor)
  )

  return (
    <AppModal closeModal={closeModal} className='interactive-modal'>
      <h2 className='title'>Add Product color</h2>
      <div className='list flex'>
        {allowedColors.map((curr) => (
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
          addProductColor(color)
          closeModal()
        }}
      >
        Add
      </button>
    </AppModal>
  )
}
