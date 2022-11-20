import axios from "axios";

// const tablesUrl = "http://localhost:3001/tables"

const cartUrl = "https://dining.micro-restaurant.cryptoservice.tech/cart"
// const tableOrdersUrl = "http://localhost:3001/tableOrders"
const tableOrdersUrl = "https://dining.micro-restaurant.cryptoservice.tech/tableOrders"

const billingUrl = "https://dining.micro-restaurant.cryptoservice.tech/billing"

let userId = null;

let tableNumber = null;

const createUserCart = (tableNumberParam) => {
    tableNumber=tableNumberParam;
    axios.put(cartUrl + "/" + tableNumberParam + "/createUserCart").then(resp => userId = resp.data.id_user)
}
const getUserId = () => userId;

const getTableNumber = () => tableNumber;

const getTableBillId = () => {
    return axios.get(cartUrl + "/" + tableNumber).then(resp => {
        return resp.data.table_bill_id
    })
};

const pay = (tableBillId) => axios.post(billingUrl + "/" + tableBillId + "/" + userId + "/pay-for-one");

const addItemToUserCart = (id_item) => axios.put(cartUrl + "/" + tableNumber + "/addItemToUserCart/" + userId, id_item)

const addMenuItemToTableOrder = (menuItemDto, tableId) => axios.post(tableOrdersUrl + "/" + tableId, menuItemDto);

const getTableOrdersById = (id) => axios.get(tableOrdersUrl + "/" + id);

const prepareTable = (tableOrderId) => axios.post(tableOrdersUrl + "/" + tableOrderId + "/prepare");

const closeTable = (id) => axios.post(tableOrdersUrl + "/" + id + "/bill");

export const DiningService = {
    addMenuItemToTableOrder,
    getTableOrdersById,
    closeTable,
    prepareTable,
    createUserCart,
    addItemToUserCart,
    getUserId,
    getTableNumber,
    pay,
    getTableBillId,
}