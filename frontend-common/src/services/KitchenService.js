import axios from 'axios';

const urlPreparations = "https://kitchen.micro-restaurant.cryptoservice.tech/preparations";


const getAllPreparations = async (tableNumber) => {
    let res = [];
    await axios.get(`${urlPreparations}?tableNumber=${tableNumber}&state=readyToBeServed`).then((response) => {
        response.data.forEach((x) => {
            x.preparedItems.forEach((y) => {
                res.push(y);
            });
        });
    });
    await axios.get(`${urlPreparations}?tableNumber=${tableNumber}&state=preparationStarted`).then((response) => {
        response.data.forEach((x) => {
            x.preparedItems.forEach((y) => {
                res.push(y);
            });
        });
    });
    return res;
};

export const KitchenService = {
    getAllPreparations,
}