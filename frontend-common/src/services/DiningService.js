import axios from 'axios';

const urlCart = "https://dining.micro-restaurant.cryptoservice.tech/cart";
const urlBilling = "https://dining.micro-restaurant.cryptoservice.tech/billing";
const urlTableOrder = "https://dining.micro-restaurant.cryptoservice.tech/tableOrders";


const openGlobalCart = (tableNumber, customersCount) => {
    return axios.post(`${urlCart}/${tableNumber}/openGlobalCart`, { "customersCount": customersCount });
}

const validateGlobalCart = (tableNumber) => axios.post(`${urlCart}/${tableNumber}/validateGlobalOrder`);

const getAllUserCarts = (tableNumber) => axios.get(`${urlCart}/${tableNumber}`);

const getGlobalCart = (tableNumber) => {
    return axios.get(`${urlCart}/${tableNumber}`)
}


const finishTable = (tableNumber, tableOrderId) => {

    return new Promise(resolve => {
        axios.post(`${urlTableOrder}/${tableOrderId}/bill`).then(r => {
            axios.post(`${urlCart}/${tableNumber}/deleteGlobalCart`).then(r2 => {
                resolve(r2)
            })
        })
    })

}

const getTableBill = (tableBillId) => {
    return axios.get(`${urlBilling}/${tableBillId}`)
}

const payBillForEveryone = (tableBillId) => {
    return axios.post(`${urlBilling}/${tableBillId}/pay-for-all`, {})
}
const payBillForMe = (tableBillId, idUser) => {
    console.log(`${urlBilling}/${tableBillId}/${idUser}/pay-for-one`)
    return axios.post(`${urlBilling}/${tableBillId}/${idUser}/pay-for-one`, {})
}




export const DiningService = {
    openGlobalCart,
    validateGlobalCart,
    getAllUserCarts,
    getGlobalCart,
    getTableBill,
    payBillForEveryone,
    payBillForMe,
    finishTable
}
