import axios from "axios";

const ordersUrl = "http://localhost:3001/tableOrders"

const getAllTableOrders = () => axios.get(ordersUrl)

const getTableOrdersById = (id) => axios.get(`${ordersUrl}/${id}`)

export const TableOrdersService = {
    getAllTableOrders,
    getTableOrdersById
}