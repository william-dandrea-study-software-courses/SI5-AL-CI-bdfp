import axios from "axios";

const tablesUrl = "http://localhost:3001/tables"
const tableOrdersUrl = "http://localhost:3001/tableOrders"

const getAllTables = () => axios.get(tablesUrl);

const openTable = (startOrderingDto) => axios.post(tableOrdersUrl, startOrderingDto);

const addMenuItemToTableOrder = (menuItemDto, tableId) => axios.post(tableOrdersUrl + "/" + tableId, menuItemDto);

const getTableOrdersById = (id) => axios.get(tableOrdersUrl + "/" + id);

const prepareTable = (tableOrderId) => axios.post(tableOrdersUrl + "/" + tableOrderId + "/prepare");

const closeTable = (id) => axios.post(tableOrdersUrl + "/" + id + "/bill");

export const DiningService = {
    getAllTables,
    openTable,
    addMenuItemToTableOrder,
    getTableOrdersById,
    closeTable,
    prepareTable
}