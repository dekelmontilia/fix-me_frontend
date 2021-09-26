import { useEffect, useState } from 'react'
import { ProductPreview } from '../../components/ProductPreview'
import { useLoading } from '../../hooks/useLoading'
import { apiService } from '../../services/apiService'
import { notificationService } from '../../services/notificationService'
import './JustForYouPage.scss'
import productAllSizes from '../../data/productAllSizes'
import { ProductSizeButton } from '../../components/ProductSizeButton'
import { useSelector } from 'react-redux'
import productColors from '../../data/productColors'
import { ProductColorButton } from '../../components/ProductColorButton'
import productCategories from '../../data/productCategories'
import { ProductCategoryButton } from '../../components/ProductCategoryButton'
import loadingImg from '../../assets/images/loading2.svg'
import { AppLoading } from '../../components/AppLoading'

export const JustForYouPage = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [filtersMap, setFiltersMap] = useState({
    size: {
      value: null,
      isActive: false,
    },
    myMeasurements: {
      isActive: false,
    },
    color: {
      isActive: false,
      value: null,
    },
    category: {
      isActive: false,
      value: null,
    },
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [results, setResults] = useState(null)
  const [recommendedSizes, setRecommendedSizes] = useState(null)

  const getQueryParamsToSend = () => {
    let queryParams = {}

    //size or my-measuremnts
    if (filtersMap.size.isActive && filtersMap.size.value) {
      queryParams.size = filtersMap.size.value
    } else {
      if (filtersMap.myMeasurements.isActive) {
        queryParams.myMeasurements = 'true'
      }
    }

    //color
    if (filtersMap.color.isActive && filtersMap.color.value) {
      queryParams.color = filtersMap.color.value
    }
    //category
    if (filtersMap.category.isActive && filtersMap.category.value) {
      queryParams.category = filtersMap.category.value
    }

    return queryParams
  }

  const fetchResults = async () => {
    setIsLoading(true)
    try {
      // @ts-ignore
      const res = await apiService.ajax({
        method: 'GET',
        url: 'product',
        params: getQueryParamsToSend(),
      })
      if (filtersMap.myMeasurements.isActive) {
        setResults(res.map(({ product }) => product))
        setRecommendedSizes(res.map(({ sizes }) => sizes))
      } else {
        setResults(res)
        setRecommendedSizes(null)
      }
    } catch (err) {
      notificationService.notify(
        'error',
        `error while trying to fetch results: ${err.message}`
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = getQueryParamsToSend()
    console.log('queryParams:', queryParams)
  }, [filtersMap])

  useEffect(() => {
    fetchResults()
  }, [filtersMap])

  return (
    <div className='just-for-you-page page main-container flex column'>
      <h2 className='title'>Just For You</h2>
      <button
        className='filter-by-button primary-button'
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        Filter By
      </button>
      <div className='boxes-container fg-1 flex space-between'>
        {isLoading && (
          <div className='loading-container fg-1 flex justify-center align-start'>
            <AppLoading />
          </div>
        )}
        {!isLoading && results && (
          <div className='results-box flex space-between'>
            {
              <div className='box flex row'>
                {results.map((currProduct, i) => (
                  <ProductPreview
                    key={currProduct._id}
                    product={currProduct}
                    recommendedSizes={recommendedSizes?.[i]}
                  />
                ))}
              </div>
            }
          </div>
        )}
        <div
          className={`filters-box flex column ${isFiltersOpen ? 'active' : ''}`}
        >
          <h4 className='title'>Filter by</h4>
          <FilterBySizeBox
            filtersMap={filtersMap}
            setFiltersMap={setFiltersMap}
          />
          <h5 className='or-title'>OR</h5>
          <FilterByMyMeasurementsBox
            filtersMap={filtersMap}
            setFiltersMap={setFiltersMap}
          />
          <FilterByColorBox
            filtersMap={filtersMap}
            setFiltersMap={setFiltersMap}
          />
          <FilterByCategoryBox
            filtersMap={filtersMap}
            setFiltersMap={setFiltersMap}
          />
        </div>
      </div>
    </div>
  )
}

function FilterBySizeBox({ filtersMap, setFiltersMap }) {
  const toggleSize = (size) => {
    const isAlreadyActive = filtersMap.size.value === size
    if (isAlreadyActive) {
      return setFiltersMap({
        ...filtersMap,
        size: {
          isActive: false,
          value: null,
        },
      })
    }
    setFiltersMap({
      ...filtersMap,
      size: {
        isActive: true,
        value: size,
      },
      myMeasurements: {
        isActive: false,
      },
    })
  }
  return (
    <div className='filter-by-size-box filter-box'>
      <h5 className='title'>Size</h5>
      <div className='box flex'>
        {productAllSizes.map((currSize) => (
          <ProductSizeButton
            key={currSize}
            size={currSize}
            // @ts-ignore
            onClick={() => toggleSize(currSize)}
            isActive={filtersMap.size.value === currSize}
          />
        ))}
      </div>
    </div>
  )
}

function FilterByMyMeasurementsBox({ filtersMap, setFiltersMap }) {
  // @ts-ignore
  const user = useSelector((rootReducer) => rootReducer.userReducer.user)
  const isChecked = filtersMap.myMeasurements.isActive
  const toggle = (newVal) => {
    console.log('newVal:', newVal)
    if (newVal) {
      setFiltersMap({
        ...filtersMap,
        size: {
          isActive: false,
          value: null,
        },
        myMeasurements: {
          isActive: true,
        },
      })
    } else {
      setFiltersMap({
        ...filtersMap,
        myMeasurements: {
          isActive: false,
        },
      })
    }
  }
  return (
    <div className='filter-by-my-measurements-box filter-box flex column'>
      <h5 className='title'>My measurements</h5>
      <div className='box flex space-between'>
        <div className='measures-p'>
          {Object.keys(user.measurements).map((currMeaKey) => (
            <p key={currMeaKey}>
              {currMeaKey} - {user.measurements[currMeaKey]}
            </p>
          ))}
        </div>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={(ev) => toggle(ev.target.checked)}
        />
      </div>
    </div>
  )
}

function FilterByColorBox({ filtersMap, setFiltersMap }) {
  const toggleColor = (color) => {
    const isAlreadyActive = filtersMap.color.value === color
    if (isAlreadyActive) {
      return setFiltersMap({
        ...filtersMap,
        color: {
          isActive: false,
          value: null,
        },
      })
    }
    setFiltersMap({
      ...filtersMap,
      color: {
        isActive: true,
        value: color,
      },
    })
  }
  return (
    <div className='filter-by-color-box filter-box'>
      <h5 className='title'>Color</h5>
      <div className='box flex'>
        {productColors.map((currColor) => (
          <ProductColorButton
            key={currColor}
            color={currColor}
            // @ts-ignore
            onClick={() => toggleColor(currColor)}
            isActive={
              filtersMap.color.isActive && filtersMap.color.value === currColor
            }
          />
        ))}
      </div>
    </div>
  )
}
function FilterByCategoryBox({ filtersMap, setFiltersMap }) {
  const toggleCategory = (category) => {
    const isAlreadyActive = filtersMap.category.value === category
    if (isAlreadyActive) {
      return setFiltersMap({
        ...filtersMap,
        category: {
          isActive: false,
          value: null,
        },
      })
    }
    setFiltersMap({
      ...filtersMap,
      category: {
        isActive: true,
        value: category,
      },
    })
  }
  return (
    <div className='filter-by-category-box filter-box'>
      <h5 className='title'>Category</h5>
      <div className='box flex'>
        {productCategories.map((currCategory) => (
          <ProductCategoryButton
            key={currCategory}
            category={currCategory}
            // @ts-ignore
            onClick={() => toggleCategory(currCategory)}
            isActive={
              filtersMap.category.isActive &&
              filtersMap.category.value === currCategory
            }
          />
        ))}
      </div>
    </div>
  )
}
