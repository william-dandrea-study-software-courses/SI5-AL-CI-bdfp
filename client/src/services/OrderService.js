import axios from "axios";


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

    return axios.post(url, newCartBody);
}

export const OrderService = {
    createOrder,
};
