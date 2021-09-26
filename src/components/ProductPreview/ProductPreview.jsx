import { useState } from 'react'
import { useHistory } from 'react-router'
import { ProductSizeButton } from '../ProductSizeButton'
import './ProductPreview.scss'

export const ProductPreview = ({ product, recommendedSizes = null }) => {
  const history = useHistory()
  const [filtersMap, setFiltersMap] = useState({
    size: {
      value: null,
      isActive: false,
    },
    myMeasurements: {
      isActive: false,
    },
  })
  const defaultSize = Object.keys(product.inventory)[0]
  const defaultColor = Object.keys(product.inventory[defaultSize].colorsMap)[0]

  const redirectToProduct = () => {
    history.push(`/product/${product._id}`)
  }

  return (
    <div className='product-preview' onClick={redirectToProduct}>
      <div className='media-box'>
        {recommendedSizes && (
          <RecommendedSizesBox recommendedSizes={recommendedSizes} />
        )}
        <img
          src={product.inventory[defaultSize].colorsMap[defaultColor].image}
          alt=''
        />
      </div>
      <div className='content'>
        <h4>{product.name}</h4>
        <h4>{product.price} ILS</h4>
      </div>
    </div>
  )
}

function RecommendedSizesBox({ recommendedSizes }) {
  return (
    <div className='recommended-sizes-box flex column'>
      {recommendedSizes.map((curr) => (
        <ProductSizeButton key={curr} size={curr} isClickable={false} filled />
      ))}
    </div>
  )
}
