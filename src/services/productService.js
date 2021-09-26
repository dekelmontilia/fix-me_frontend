import { apiService, BASE_URL } from "./apiService";

const PRODUCT_KEY = "product";

export default {
  getProduct,
};

async function getProduct(productId) {
  try {
    return await apiService.ajax({
      url: `${PRODUCT_KEY}/${productId}`,
      method: "GET",
    });
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}
