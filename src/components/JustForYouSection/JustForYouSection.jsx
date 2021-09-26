import './JustForYouSection.scss'
import 'swiper/swiper.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/components/pagination/pagination.scss'
import products from '../../demoData/products'

const Product = ({ product }) => {
  return (
    <div className='product'>
      <div className='media-container'>
        <img src={product.img} />
      </div>
      <h4 className='title'>{product.name}</h4>
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

export const JustForYouSection = (props) => {
  SwiperCore.use([Pagination])
  return (
    <section className='just-for-you-section'>
      <h2 className='main-title'>Just For You</h2>
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
    </section>
  )
}
