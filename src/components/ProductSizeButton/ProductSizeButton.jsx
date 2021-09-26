import './ProductSizeButton.scss'

export const ProductSizeButton = ({
  size,
  onClick = () => '',
  isActive = false,
  isClickable = true,
  filled = false,
}) => {
  return (
    <div
      className={`product-size-button ${isActive ? 'active' : ''}
      ${isClickable ? 'clickable' : ''}
      ${filled ? 'filled' : ''}
      center-childs`}
      onClick={onClick}
    >
      <p>{size}</p>
    </div>
  )
}
