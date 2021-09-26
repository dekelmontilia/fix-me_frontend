import './SaleSection.scss'
import 'swiper/swiper.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/components/pagination/pagination.scss'
import products from '../../demoData/products'

const Product = ({ product }) => {
  return (
    <div className='product'>
      <div className='special-price'>
        <h4>Special Price</h4>
      </div>
      <div className='media-container'>
        <img src={product.img} />
      </div>
      <div className='content center-childs column'>
        <h4 className='title'>{product.name}</h4>
        <div className='row flex align-center'>
          <h4 className='price'>₪{product.price}</h4>
          <h5 className='first-price'>₪74</h5>
        </div>
      </div>
    </div>
  )
}

const Slide = ({ products }) => {
  return (
    <div className='slide center-childs'>
      {products.map((currProduct) => (
        <Product key={currProduct._id} product={currProduct} />
      ))}
    </div>
  )
}

export const SaleSection = (props) => {
  SwiperCore.use([Pagination])
  return (
    <section className='sale-section'>
      <h2 className='main-title'>SALE</h2>
      <div className='container'>
        <div className='frame'></div>
        <div className='swiper-container'>
          <Swiper pagination={{ clickable: true }} slidesPerView={1}>
            <SwiperSlide>
              <Slide products={products.slice(0, 3)} />
            </SwiperSlide>
            <SwiperSlide>
              <Slide products={products.slice(3, 6)} />
            </SwiperSlide>
            <SwiperSlide>
              <Slide products={products.slice(6, 9)} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  )
}
