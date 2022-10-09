import axios from "axios";

const tableUrl = "http://localhost:5301/table-resume/infos";

const getAllTables = () => axios.get(tableUrl);

export const TableService = {
  getAllTables,
};
