import './AddProductCategoryModal.scss'

import { useState } from 'react'
import { AppModal } from '../AppModal'
import { ProductSizeButton } from '../ProductSizeButton'
import productCategories from '../../data/productCategories'
import { ProductCategoryButton } from '../ProductCategoryButton'

export const AddProductCategoryModal = ({
  closeModal,
  addProductCategory,
  caughtCategories,
}) => {
  const [category, setCategory] = useState(null)

  const allowedCategories = productCategories.filter(
    (currCategory) => !caughtCategories.includes(currCategory)
  )

  return (
    <AppModal closeModal={closeModal} className='interactive-modal'>
      <h2 className='title'>Add Product Category</h2>
      <div className='list flex'>
        {allowedCategories.map((curr) => (
          <ProductCategoryButton
            key={curr}
            category={curr}
            // @ts-ignore
            onClick={() => setCategory(curr)}
            isActive={category === curr}
          />
        ))}
      </div>
      <button
        className='primary-button'
        disabled={!category}
        onClick={() => {
          addProductCategory(category)
          closeModal()
        }}
      >
        Add
      </button>
    </AppModal>
  )
}
