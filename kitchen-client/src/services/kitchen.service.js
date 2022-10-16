import {BehaviorSubject} from "rxjs";
import axios from "axios";


const preparedItemsBar$ = new BehaviorSubject(null)
const preparedItemsColdDish$ = new BehaviorSubject(null)
const preparedItemsHotDish$ = new BehaviorSubject(null)

const GET_PREPARED_ITEMS_BAR_URL = 'https://kitchen.micro-restaurant.cryptoservice.tech/preparedItems?post=BAR';
const GET_PREPARED_ITEMS_COLD_DISH_URL = 'https://kitchen.micro-restaurant.cryptoservice.tech/preparedItems?post=COLD_DISH';
const GET_PREPARED_ITEMS_HOT_DISH_URL = 'https://kitchen.micro-restaurant.cryptoservice.tech/preparedItems?post=HOT_DISH';

const getPreparedItemsBar = () => {
    return new Promise((resolve, reject) => {
        axios.get(GET_PREPARED_ITEMS_BAR_URL).then(preparedItems => {
            preparedItemsBar$.next(preparedItems.data);
            console.log(preparedItems.data)
            resolve(preparedItems.data);
        }).catch(error => reject(error))
    })
}

const getPreparedItemsColdDish = () => {
    return new Promise((resolve, reject) => {
        axios.get(GET_PREPARED_ITEMS_COLD_DISH_URL).then(preparedItems => {
            preparedItemsColdDish$.next(preparedItems.data);
            resolve(preparedItems.data);
        }).catch(error => reject(error))
    })
}

const getPreparedItemsHotDish = () => {
    return new Promise((resolve, reject) => {
        axios.get(GET_PREPARED_ITEMS_HOT_DISH_URL).then(preparedItems => {
            preparedItemsHotDish$.next(preparedItems.data);
            resolve(preparedItems.data);
        }).catch(error => reject(error))
    })
}

const startPreparation = (preparedItemId) => {
    return axios.post(`https://kitchen.micro-restaurant.cryptoservice.tech/preparedItems/${preparedItemId}/start`)
}

const finishPreparation = (preparedItemId) => {
    return axios.post(`https://kitchen.micro-restaurant.cryptoservice.tech/preparedItems/${preparedItemId}/finish`)
}

export const KitchenService = {
    getPreparedItemsBar,
    getPreparedItemsColdDish,
    getPreparedItemsHotDish,
    preparedItemsBar$,
    preparedItemsColdDish$,
    preparedItemsHotDish$,
    startPreparation,
    finishPreparation
}
