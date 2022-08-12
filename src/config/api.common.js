import { CONFIG } from "./config.common";

const ENDPOINT = {
  _products: "meters",
};

export const API = {  
  PRODUCTS: {
    ALL: `${CONFIG.API_URL}/${ENDPOINT._products}`,
  },
  
};
