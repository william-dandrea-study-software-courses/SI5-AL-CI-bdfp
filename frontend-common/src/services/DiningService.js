import axios from 'axios';

const urlCart = "https://dining.micro-restaurant.cryptoservice.tech/cart";


const openGlobalCart = (tableNumber, customersCount) => {
    return axios.post(`${urlCart}/${tableNumber}/openGlobalCart`, { "customersCount": customersCount });
}

const validateGlobalCart = (tableNumber) => axios.post(`${urlCart}/${tableNumber}/validateGlobalOrder`);

const getAllUserCarts = (tableNumber) => axios.get(`${urlCart}/${tableNumber}`);



export const DiningService = {
    openGlobalCart,
    validateGlobalCart,
    getAllUserCarts,
}
