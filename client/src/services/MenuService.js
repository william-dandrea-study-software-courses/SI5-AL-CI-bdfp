import axios from "axios";

const menuUrl = "http://localhost:5301/menu";

const getAllItems = () => axios.get(menuUrl);

export const MenuService = {
  getAllItems,
};
