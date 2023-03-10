import axios from "axios";

// const menusUrl = "http://localhost:3000/menus"
const menusUrl = "https://menu.micro-restaurant.cryptoservice.tech/menus"

const getAllMenu = () => axios.get(menusUrl);

const getMenuById = async (id) => await axios.get(menusUrl + "/" + id);

export const MenuService = {
    getAllMenu,
    getMenuById
}