import './FavoriteButton.scss'
import heartImage from '../../assets/images/heart-icon.png'

export const FavoriteButton = (props) => {
  return (
    <button className='favorite-button center-childs'>
      <img src={heartImage} alt='' />
    </button>
  )
}
