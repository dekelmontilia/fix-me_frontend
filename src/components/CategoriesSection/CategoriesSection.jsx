import categories from '../../demoData/categories'
import './CategoriesSection.scss'

const Card = ({ category }) => {
  return (
    <div className='card'>
      <div className='external-container'>
        <img src={category.mainImage} alt='' />
        <div className='content'>
          <h3 className='title'>{category.name}</h3>
          <p>SHOP NOW</p>
        </div>
      </div>
    </div>
  )
}

export const CategoriesSection = (props) => {
  return (
    <section className='categories-section center-childs column'>
      <h2 className='main-title'>CATEGORIES</h2>
      <div className='cards-container'>
        {categories.map((currCategory) => (
          <Card key={currCategory.name} category={currCategory} />
        ))}
      </div>
    </section>
  )
}
