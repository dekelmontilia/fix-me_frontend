import './ProductCategoryButton.scss'

export const ProductCategoryButton = ({
  category,
  onClick = () => '',
  isActive = false,
  isClickable = true,
}) => {
  return (
    <div
      className={`product-category-button ${isActive ? 'active' : ''}
      ${isClickable ? 'clickable' : ''}
      center-childs`}
      onClick={onClick}
    >
      <p>{category}</p>
    </div>
  )
}
