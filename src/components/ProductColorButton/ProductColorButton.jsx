import './ProductColorButton.scss'

export const ProductColorButton = ({
  color,
  onClick = () => '',
  isActive = false,
  isClickable = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`product-color-button ${isActive ? 'active' : ''}`}
      style={{ backgroundColor: color }}
    ></div>
  )
}
