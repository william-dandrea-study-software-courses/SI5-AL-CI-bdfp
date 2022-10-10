import axios from "axios";

const menusUrl="http://localhost:3000/menus"

const getAllMenu = () => axios.get(menusUrl);

export const MenuService = {
    getAllMenu
}
