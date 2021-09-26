import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppLoading } from "../../components/AppLoading";
import { FavoriteButton } from "../../components/FavoriteButton";
import { ProductColorButton } from "../../components/ProductColorButton";
import { ProductSizeButton } from "../../components/ProductSizeButton";
import { useLoading } from "../../hooks/useLoading";
import productService from "../../services/productService";
import utilService from "../../services/utilService";
import { addItemToCart } from "../../store/actions/cartActions";
import "./ProductPage.scss";

export const ProductPage = (props) => {
  const dispatch = useDispatch();
  const [executeFunc, isLoading, isError] = useLoading();
  // @ts-ignore
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currVariation, setCurrVariation] = useState(null);

  const sizes = !product ? null : Object.keys(product.inventory);

  const loadProduct = async () => {
    console.log("id", productId);
    // @ts-ignore
    const resProduct = await executeFunc(() =>
      productService.getProduct(productId)
    );
    // const resProduct= {
    //   _id: 'p1',
    //   qty: 100,
    //   name: 'grilfriend jeans',
    //   img: 'https://media.boohoo.com/i/boohoo/dzz03905_light%20blue_xl_3?$product_image_main_mobile$&fmt=webp',
    //   price: 50,
    //   date_created: {
    //     $date: '2021-08-18T16:01:42.186Z',
    //   }}
    console.log("aaa", resProduct);
    setProduct(resProduct);
    console.log(productId);
  };

  const currVariationImage =
    !product || !currVariation
      ? null
      : product.inventory[currVariation.size].colorsMap[currVariation.color];

  const changeVariationSize = (toSize) => {
    //if the new size has the last color available - stay on the same color. if not - give the first available color of the new size
    const isLastColorAvailableInTheNewSize =
      currVariation?.color &&
      product.inventory[toSize].colorsMap[currVariation.color];

    const newColor = isLastColorAvailableInTheNewSize
      ? currVariation.color
      : Object.keys(product.inventory[toSize].colorsMap)[0];

    setCurrVariation({
      size: toSize,
      color: newColor,
    });
  };

  const changeVariationColor = (newColor) => {
    setCurrVariation({
      ...currVariation,
      color: newColor,
    });
  };

  const getItemToAdd = () => {
    const item = {
      id: utilService.makeId(),
      productId: product._id,
      ...currVariation,
    };
    return item;
  };

  const commitAddItem = () => {
    dispatch(addItemToCart(getItemToAdd()));
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    if (!product) return;

    //give a default
    changeVariationSize(sizes[0]);
  }, [product]);

  return (
    <div className="product-page page main-container">
      {isLoading && <AppLoading />}
      {product && currVariationImage && (
        <div className="container">
          <img
            className="break-normal-image"
            src={currVariationImage.image}
            alt=""
          />
          <section className="top-section flex">
            <div className="main-image-container fg-1">
              <img src={currVariationImage.image} alt="" />
            </div>
            <div className="content">
              <h2 className="product-name">{product.name}</h2>
              <h4 className="product-price">IL{product.price}</h4>
              <h5 className="color-title palette-title">COLOR</h5>
              <div className="colors-palette palette flex">
                {Object.keys(
                  product.inventory[currVariation.size].colorsMap
                ).map((currColorName, i) => (
                  <ProductColorButton
                    key={i}
                    color={currColorName}
                    isActive={currColorName === currVariation.color}
                    // @ts-ignore
                    onClick={() => changeVariationColor(currColorName)}
                  />
                ))}
              </div>
              <h5 className="size-title palette-title">SIZE</h5>
              <div className="sizes-palette palette flex">
                {sizes.map((currSize, i) => (
                  <ProductSizeButton
                    key={i}
                    size={currSize}
                    isActive={currSize === currVariation.size}
                    // @ts-ignore
                    onClick={() => changeVariationSize(currSize)}
                  />
                ))}
              </div>
              <div className="actions-row flex align-center">
                <FavoriteButton />
                <button
                  className="primary-button square"
                  onClick={commitAddItem}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
