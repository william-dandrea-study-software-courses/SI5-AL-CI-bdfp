import axios from 'axios';

const url = "https://menu.micro-restaurant.cryptoservice.tech/menus";


const getMenuById = (menuId) => axios.get(`${url}/${menuId}`);

export const MenuService = {
    getMenuById,
}