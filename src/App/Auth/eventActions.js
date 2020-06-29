import axios from "axios";
import { SERVER_BACKEND_URL } from "../../config";

function setReviewOrder(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/setReviewOrder", obj);
  };
}
function orderProduct(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/orderProduct", obj);
  };
}
function getMyPendingOrders() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getMyPendingOrders");
  };
}
function getFollowProduct(id) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getFollowProduct", {
      followId: id
    });
  };
}
function getCategories() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getCategories");
  };
}

function publishProduct(product) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/publishProduct", product);
  };
}

function editProduct(product) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/editProduct", { product });
  };
}

function removeCategory(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/removeCategory", obj);
  };
}

function removeSubCategory(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/removeSubCategory", obj);
  };
}

function addCategory(category) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/addCategory", category);
  };
}
function addSubCategory(subCategory) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/addSubCategory", subCategory);
  };
}

function getMostSells() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getMostSells");
  };
}
function getFeaturedProds() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getFeatured");
  };
}
function getProduct(id) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getProduct", {
      productId: id
    });
  };
}
function getSearch(txt) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getSearch", {
      text: txt
    });
  };
}
function getSearchProducts(txt) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getSearchProducts", {
      text: txt
    });
  };
}

function getMyProducts() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getMyProducts");
  };
}

function addToCart(product) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/addToCart", product);
  };
}
function getCart() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getCart");
  };
}
function deleteItemCart(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/deleteItemCart", obj);
  };
}

function aceptOrder(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/aceptOrder", obj);
  };
}

function confirmSendOrder(obj) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/confirmSendOrder", obj);
  };
}
function getProducsToVerif() {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/getProducsToVerif");
  };
}
function activateProduct(id) {
  return dispatch => {
    return axios.post(SERVER_BACKEND_URL + "/api/activateProduct", { pId: id });
  };
}

export {
  getCategories,
  publishProduct,
  getMostSells,
  getFeaturedProds,
  getProduct,
  getSearch,
  getSearchProducts,
  getMyProducts,
  addCategory,
  addSubCategory,
  removeCategory,
  removeSubCategory,
  addToCart,
  getCart,
  deleteItemCart,
  orderProduct,
  getFollowProduct,
  getMyPendingOrders,
  aceptOrder,
  confirmSendOrder,
  setReviewOrder,
  editProduct,
  activateProduct,
  getProducsToVerif
};
