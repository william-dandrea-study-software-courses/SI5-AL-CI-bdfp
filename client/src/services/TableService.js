import axios from "axios";

const tableUrl = "http://localhost:3001/tables";

const getAllTables = () => axios.get(tableUrl);

export const TableService = {
  getAllTables,
};
