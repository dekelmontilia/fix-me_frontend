import { useState } from 'react'
import { AppModal } from '../AppModal'
import { ProductSizeButton } from '../ProductSizeButton'
import './RemoveProductSizeModal.scss'

const allSizes = ['s', 'm', 'l', 'xl', 'xll']

export const RemoveProductSizeModal = ({
  closeModal,
  removeProductSize,
  caughtSizes,
}) => {
  const [size, setSize] = useState(null)

  return (
    <AppModal closeModal={closeModal} className='interactive-modal'>
      <h2 className='title'>Remove Product Size</h2>
      <div className='list flex'>
        {caughtSizes.map((curr) => (
          <ProductSizeButton
            key={curr}
            size={curr}
            // @ts-ignore
            onClick={() => setSize(curr)}
            isActive={size === curr}
          />
        ))}
      </div>
      <button
        className='primary-button'
        disabled={!size}
        onClick={() => {
          removeProductSize(size)
          closeModal()
        }}
      >
        Remove
      </button>
    </AppModal>
  )
}
