import { API } from "../config/api.common";

async function getProducts() {
    return await fetch(API.PRODUCTS.ALL +'?page=0&size=50', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) =>  data.json())
}

async function getById() {
  await fetch(API.PRODUCTS.LOGIN, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((data) =>  data.json())
  .then((data) => {return data});
}

async function updateProduct() {
    return fetch(API.PRODUCTS.LOGIN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}

export { getProducts, getById, updateProduct }