import axios from "axios";
import {TableService} from "./TableService";


const createOrder = (tableOrderId, cart) => {

    const newCartBody = [];
    cart.forEach(ct => {
        if (ct.howMany !== 0) {
            newCartBody.push(ct)
        }
    })

    const url = `http://localhost:5301/order/${tableOrderId}/create`
    console.log(url)
    console.log(newCartBody)

    return new Promise((resolve, reject) => {
        axios.post(url, newCartBody).then(tables => {
            TableService.updateTablesObservable(tables.data)
            resolve(tables.data)
        })
    })

}

export const OrderService = {
    createOrder,
};
