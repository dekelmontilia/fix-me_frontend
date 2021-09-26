import { useState } from 'react'
import { AppModal } from '../AppModal'
import { ProductSizeButton } from '../ProductSizeButton'
import './AddProductSizeModal.scss'

const allSizes = ['s', 'm', 'l', 'xl', 'xll']

export const AddProductSizeModal = ({
  closeModal,
  addProductSize,
  caughtSizes,
}) => {
  const [size, setSize] = useState(null)

  const allowedSizes = allSizes.filter(
    (currSize) => !caughtSizes.includes(currSize)
  )

  return (
    <AppModal closeModal={closeModal} className='interactive-modal'>
      <h2 className='title'>Add Product Size</h2>
      <div className='list flex'>
        {allowedSizes.map((curr) => (
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
          addProductSize(size)
          closeModal()
        }}
      >
        Add
      </button>
    </AppModal>
  )
}
