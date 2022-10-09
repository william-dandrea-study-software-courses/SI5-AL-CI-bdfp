import axios from "axios";

const tableUrl = "http://localhost:5301/tables";

const getAllTables = () => axios.get(tableUrl);

export const TableService = {
  getAllTables,
};
