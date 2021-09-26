import { useEffect, useRef, useState } from 'react'
import { AddProductColorModal } from '../AddProductColorModal'
import { AddProductSizeModal } from '../AddProductSizeModal'
import { RemoveProductColorModal } from '../RemoveProductColorModal'
import { RemoveProductSizeModal } from '../RemoveProductSizeModal'
import './CreateProductPage.scss'
import { useLoading } from '../../hooks/useLoading'
import { apiService } from '../../services/apiService'
import { notificationService } from '../../services/notificationService'
import { useHistory } from 'react-router'
import { AddProductCategoryModal } from '../AddProductCategoryModal'
import { ProductCategoryButton } from '../ProductCategoryButton'
import { useSelector } from 'react-redux'
import { ProductSizeButton } from '../ProductSizeButton'
import downImg from '../../assets/images/down-chevron.png'
import { ProductColorButton } from '../ProductColorButton'
import { AppLoading } from '../AppLoading'

const unitsMap = {
  height: 'cm',
  weight: 'kg',
  chest: 'cm',
  waist: 'cm',
  hips: 'cm',
  feet: 'cm',
}

const fitsMapDefault = {
  height: {
    min: 0,
    max: 100000,
  },
  weight: {
    min: 0,
    max: 100000,
  },
  chest: {
    min: 0,
    max: 100000,
  },
  waist: {
    min: 0,
    max: 100000,
  },
  hips: {
    min: 0,
    max: 100000,
  },
  feet: {
    min: 0,
    max: 100000,
  },
}

export const CreateProductPage = (props) => {
  const history = useHistory()
  // @ts-ignore
  const user = useSelector((rootReducer) => rootReducer.userReducer.user)

  const [productToAdd, setProductToAdd] = useState({
    name: '',
    price: 0,
    categories: [],
    inventory: {},
  })
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false)
  const [isRemoveSizeModalOpen, setIsRemoveSizeModalOpen] = useState(false)
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false)
  const [isRemoveColorModalOpen, setIsRemoveColorModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [isRemoveCategoryModalOpen, setIsRemoveCategoryModalOpen] =
    useState(false)
  const [pickedSize, setPickedSize] = useState(null)
  const [pickedColor, setPickedColor] = useState(null)
  const [executeFunc, isLoading, isError] = useLoading()

  const productSizes = Object.keys(productToAdd.inventory)
  const productCategories = productToAdd.categories
  const variationColors =
    pickedSize && Object.keys(productToAdd.inventory[pickedSize].colorsMap)

  const isCanAddProduct =
    productToAdd.name &&
    productToAdd.price &&
    productSizes.length &&
    productSizes.every(
      (currSizeKey) =>
        Object.keys(productToAdd.inventory[currSizeKey].colorsMap).length &&
        Object.keys(productToAdd.inventory[currSizeKey].colorsMap).every(
          (currColorKey) =>
            productToAdd.inventory[currSizeKey].colorsMap[currColorKey].image
        )
    )

  const addProduct = async () => {
    console.log('going to add product....', productToAdd)
    // @ts-ignore
    const res = await executeFunc(() =>
      apiService.ajax({
        url: 'product',
        method: 'post',
        data: productToAdd,
      })
    )
    if (res) {
      notificationService.notify('success', `Added Product`)
      history.push('/')
    } else {
      notificationService.notify('error', `Error while trying to add product`)
    }
  }

  const addProductCategory = (category) => {
    setProductToAdd({
      ...productToAdd,
      categories: [...productToAdd.categories, category],
    })
  }

  const removeProductCategory = (category) => {
    setProductToAdd({
      ...productToAdd,
      categories: productToAdd.categories.filter((curr) => curr !== category),
    })
  }

  const addProductSize = (newSize) => {
    setProductToAdd({
      ...productToAdd,
      inventory: {
        ...productToAdd.inventory,
        [newSize]: {
          fitsMap: fitsMapDefault,
          colorsMap: {},
        },
      },
    })
  }

  const chooseDefaultSize = (except) => {
    const sizesExcept = Object.keys(productToAdd.inventory).filter(
      (name) => name !== except
    )
    if (!sizesExcept.length) {
      return setPickedSize(null)
    }
    setPickedSize(sizesExcept[sizesExcept.length - 1])
    setPickedColor(null)
  }

  const removeProductSize = (sizeToRemove) => {
    chooseDefaultSize(sizeToRemove)
    const inventoryCopy = JSON.parse(JSON.stringify(productToAdd.inventory))

    delete inventoryCopy[sizeToRemove]

    setProductToAdd({
      ...productToAdd,
      inventory: inventoryCopy,
    })
  }

  const addProductColor = (newColor) => {
    const productToAddCopy = JSON.parse(JSON.stringify(productToAdd))
    productToAddCopy.inventory[pickedSize].colorsMap[newColor] = {
      image: '',
    }
    setProductToAdd(productToAddCopy)
  }

  const removeProductColor = (colorToRemove) => {
    // chooseDefaultSize(colorToRemove)
    const inventoryCopy = JSON.parse(JSON.stringify(productToAdd.inventory))

    delete inventoryCopy[pickedSize].colorsMap[colorToRemove]

    setProductToAdd({
      ...productToAdd,
      inventory: inventoryCopy,
    })
  }

  const handleFitChange = (fitKey, minOrMax, newVal) => {
    const productToAddCopy = JSON.parse(JSON.stringify(productToAdd))
    productToAddCopy.inventory[pickedSize].fitsMap[fitKey][minOrMax] = newVal
    setProductToAdd(productToAddCopy)
  }

  const handleVariationImageChange = (newVal) => {
    const productToAddCopy = JSON.parse(JSON.stringify(productToAdd))
    productToAddCopy.inventory[pickedSize].colorsMap[pickedColor].image = newVal
    setProductToAdd(productToAddCopy)
  }

  useEffect(() => {
    const sizes = Object.keys(productToAdd.inventory)
    if (!sizes.length) {
      return setPickedSize(null)
    }
    setPickedSize(sizes[sizes.length - 1])
    setPickedColor(null)
  }, [Object.keys(productToAdd.inventory).length])

  useEffect(() => {
    //choose default color (or null)
    console.log('need to choose new one')
    if (
      !pickedSize ||
      !(
        productToAdd.inventory[pickedSize] &&
        Object.keys(productToAdd.inventory[pickedSize].colorsMap).length
      )
    ) {
      console.log('setting to null')
      return setPickedColor(null)
    }

    setPickedColor(Object.keys(productToAdd.inventory[pickedSize].colorsMap)[0])
  }, [
    Object.keys(productToAdd.inventory).length,
    pickedSize &&
      productToAdd.inventory[pickedSize] &&
      Object.keys(productToAdd.inventory[pickedSize].colorsMap).length,
  ])

  return (
    <>
      <div className='create-product-page page center-childs column'>
        {!(user.type === 'seller') && (
          <h2>Sorry, this page is for sellers only</h2>
        )}
        {user.type === 'seller' && (
          <>
            <h2 className='title'>Create Product</h2>
            <div className='content-container'>
              <div className='header-box box'>
                <div className='inputs-box flex'>
                  <div className='field flex align-center'>
                    <i className='fas fa-globe-americas'></i>
                    <input
                      type='text'
                      placeholder='Name'
                      value={productToAdd.name}
                      onChange={(ev) =>
                        setProductToAdd({
                          ...productToAdd,
                          name: ev.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='field flex align-center'>
                    <i className='fas fa-dollar-sign'></i>
                    <input
                      type='number'
                      value={productToAdd.price}
                      onChange={(ev) =>
                        setProductToAdd({
                          ...productToAdd,
                          price: +ev.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='categories-box items-box flex align-center'>
                  <h4 className='title'>Categories</h4>
                  <div className='categories-list list flex'>
                    {productCategories.map((curr) => (
                      <ProductCategoryButton
                        key={curr}
                        category={curr}
                        isClickable={false}
                      />
                    ))}
                  </div>
                  <button
                    className='primary-button'
                    onClick={() => setIsAddCategoryModalOpen(true)}
                  >
                    Add
                  </button>
                  <button
                    className='primary-button'
                    onClick={() => setIsRemoveCategoryModalOpen(true)}
                  >
                    Remove
                  </button>
                </div>
                <hr />
              </div>
              <div className='sizes-box items-box flex align-center'>
                <h4 className='title'>Sizes</h4>
                <div className='list flex'>
                  {productSizes.map((curr) => (
                    <ProductSizeButton
                      key={curr}
                      size={curr}
                      // @ts-ignore
                      onClick={() => setPickedSize(curr)}
                      isActive={pickedSize === curr}
                    />
                  ))}
                </div>
                {/* <label htmlFor=''>sizes: </label>
                <select
                  name=''
                  value={pickedSize}
                  id=''
                  onChange={(ev) => setPickedSize(ev.target.value)}
                > */}
                {/* {productSizes.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))} */}
                {/* </select> */}
                <button
                  className='primary-button'
                  onClick={() => setIsAddSizeModalOpen(true)}
                >
                  Add
                </button>
                <button
                  className='primary-button'
                  onClick={() => setIsRemoveSizeModalOpen(true)}
                >
                  Remove
                </button>
              </div>
              {pickedSize && productToAdd.inventory[pickedSize] && (
                <img className='down-icon' src={downImg} />
              )}
              {pickedSize && productToAdd.inventory[pickedSize] && (
                <div className='size-measurements-box'>
                  <h4 className='title'>Size measurements</h4>
                  <div className='fields-box flex'>
                    {Object.keys(fitsMapDefault).map((currFitKey) => (
                      <div key={currFitKey} className='field flex align-center'>
                        <p className='label'>{currFitKey}</p>
                        <input
                          step={1}
                          min={0}
                          max={
                            productToAdd.inventory[pickedSize].fitsMap[
                              currFitKey
                            ].max - 1
                          }
                          type='number'
                          placeholder='min'
                          value={
                            productToAdd.inventory[pickedSize].fitsMap[
                              currFitKey
                            ].min
                          }
                          onChange={(ev) =>
                            handleFitChange(currFitKey, 'min', +ev.target.value)
                          }
                        />
                        <p className='dash'>-</p>
                        <input
                          step={1}
                          min={
                            productToAdd.inventory[pickedSize].fitsMap[
                              currFitKey
                            ].min + 1
                          }
                          max={10000}
                          type='number'
                          placeholder='max'
                          value={
                            productToAdd.inventory[pickedSize].fitsMap[
                              currFitKey
                            ].max
                          }
                          onChange={(ev) =>
                            handleFitChange(currFitKey, 'max', +ev.target.value)
                          }
                        />
                        <p className='indicator'>({unitsMap[currFitKey]})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pickedSize && productToAdd.inventory[pickedSize] && (
                <img className='down-icon' src={downImg} />
              )}
              {pickedSize && productToAdd.inventory[pickedSize] && (
                <div className='colors-box items-box flex align-center'>
                  <h4 className='title'>Size colors</h4>
                  <div className='list flex'>
                    {Object.keys(
                      productToAdd.inventory[pickedSize].colorsMap
                    ).map((curr) => (
                      <ProductColorButton
                        key={curr}
                        color={curr}
                        // @ts-ignore
                        onClick={() => setPickedColor(curr)}
                        isActive={pickedColor === curr}
                      />
                    ))}
                  </div>
                  <button
                    className='primary-button'
                    onClick={() => setIsAddColorModalOpen(true)}
                  >
                    Add
                  </button>
                  <button
                    className='primary-button'
                    onClick={() => setIsRemoveColorModalOpen(true)}
                  >
                    Remove
                  </button>
                </div>
              )}
              {pickedSize && productToAdd.inventory[pickedSize] && (
                <img className='down-icon' src={downImg} />
              )}
              {pickedSize && pickedColor && (
                <div className='color-image-url-box flex align-center'>
                  <h4 className='title'>Size color image URL</h4>
                  <input
                    type='text'
                    placeholder='variation image URL'
                    value={
                      productToAdd.inventory[pickedSize].colorsMap[pickedColor]
                        ?.image
                    }
                    onChange={(ev) =>
                      handleVariationImageChange(ev.target.value)
                    }
                  />
                  {productToAdd.inventory[pickedSize].colorsMap[pickedColor]
                    ?.image && (
                    <img
                      className='product-preview'
                      src={
                        productToAdd.inventory[pickedSize].colorsMap[
                          pickedColor
                        ].image
                      }
                      alt=''
                    />
                  )}
                </div>
              )}
              <hr />
              {/* <p>{JSON.stringify(productToAdd)}</p> */}
              <button
                className='add-product-button primary-button'
                // @ts-ignore
                disabled={!isCanAddProduct || isLoading}
                onClick={addProduct}
              >
                {!isLoading ? 'Add Product' : <AppLoading />}
              </button>
            </div>
          </>
        )}
      </div>
      <div className='modals'>
        {isAddSizeModalOpen && (
          <AddProductSizeModal
            closeModal={() => setIsAddSizeModalOpen(false)}
            addProductSize={addProductSize}
            caughtSizes={productSizes}
          />
        )}
        {isRemoveSizeModalOpen && (
          <RemoveProductSizeModal
            closeModal={() => setIsRemoveSizeModalOpen(false)}
            removeProductSize={removeProductSize}
            caughtSizes={productSizes}
          />
        )}
        {isAddColorModalOpen && (
          <AddProductColorModal
            closeModal={() => setIsAddColorModalOpen(false)}
            addProductSize={addProductColor}
            //TODO:
            caughtColors={variationColors}
          />
        )}
        {isRemoveColorModalOpen && (
          <RemoveProductColorModal
            closeModal={() => setIsRemoveColorModalOpen(false)}
            removeProductColor={removeProductColor}
            caughtColors={variationColors}
          />
        )}
        {isAddCategoryModalOpen && (
          <AddProductCategoryModal
            closeModal={() => setIsAddCategoryModalOpen(false)}
            addProductCategory={addProductCategory}
            caughtCategories={productCategories}
          />
        )}
      </div>
    </>
  )
}
