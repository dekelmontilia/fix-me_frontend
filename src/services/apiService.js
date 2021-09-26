import Axios from "axios";

//If you want to check the site from phone
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//192.168.1.22:3030/api/";

// const BASE_URL =
//   process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

function _getAuthHeader() {
  const storage = JSON.parse(localStorage.getItem("persist:root"));
  const token = JSON.parse(storage.userReducer).token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

var axios = Axios.create({
  //   withCredentials: true,
});

export const apiService = {
  ajax,
};

async function ajax(config) {
  console.log(`sending request: ${BASE_URL}${config.url}`);
  const headers = _getAuthHeader();
  try {
    // @ts-ignore
    const res = await axios({
      ...config,
      url: `${BASE_URL}${config.url}`,
      headers,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
