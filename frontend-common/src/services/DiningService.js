import axios from 'axios';

const urlCart = "https://dining.micro-restaurant.cryptoservice.tech/cart";


const openGlobalCart = (tableNumber, customersCount) => {
    return axios.post(`${urlCart}/${tableNumber}/openGlobalCart`, { "customersCount": customersCount });
}

const validateGlobalCart = (tableNumber) => axios.delete(`${urlCart}/${tableNumber}/validateGlobalCart`);

const getAllUserCarts = (tableNumber) => axios.get(`${urlCart}/${tableNumber}`);

export const DiningService = {
    openGlobalCart,
    validateGlobalCart,
    getAllUserCarts,
}
